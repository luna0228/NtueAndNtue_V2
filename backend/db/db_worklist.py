# 1203新增 用來宣告如何讀寫表格資料的文件
from fastapi import HTTPException, status, Depends
import ast
from router.schemas import WorkListResponseSchema, WorkListRequestSchema
#Session是ORM映射的關鍵。透過它我們才有機會繞過SQL語法，應用python指令做數據的調閱、修改、刪除。
from sqlalchemy.orm.session import Session
from .models import DbWorklist 
from .OneTableWorkList import WorkList
#引入老師的建議，透過模塊來允許py執行原始SQL語法，拿來重置id
from sqlalchemy.sql import text
#引入選取模塊，處理特定名詞或多條件的篩選。select用來創建SQL查詢，or_是創建邏輯「或」
from sqlalchemy import select, or_, and_
from typing import List, Optional
from db.database import get_db


# 1216引入，先處理技能命名格式化的議題
def normalize_skills(skills):
    skill_mapping = {
        'js': 'JavaScript',
        'JS': 'JavaScript',
        'jS': 'JavaScript',
        'Javascript': 'JavaScript',
        'javascript': 'JavaScript',
        'html': 'HTML',
        '(沒有使用bookstrap) html': 'HTML',
        'css': 'CSS',
        'REACT': 'React',
        'bootstrap':'Bootstrap',
        'bootstraps':'Bootstrap',
        'bootstraps5':'Bootstrap',
        'Booststrap':'Bootstrap',
        'Bootstrap4':'Bootstrap',
        'Typescript':'Typescript',
        'rwd':'RWD',
        'Jquery': 'jQuery',
        'jquery': 'jQuery',
        'JQuery': 'jQuery',
        'jquery(masonry,imagesloaded)': 'jQuery',
        'jq':'jQuery',
        'FlexSlider':'jQuery',
        'Flexslider':'jQuery',
        'Git':'Git版控',
        'git':'Git版控',
        'github':'Git版控',
        'firebase':'Firebase',
        'firestore':'Firebase',
        'lottie':'Lottie',
        'gsap':'GASP',
        'animate':'animate.css',
        'wow':'wow.js',
        'WOW':'wow.js',
        'slick':'slick.js',
        'scss':'SCSS',
        'SCSS(Scout-App)':'SCSS',
        'masonry':'masonry.js',
        'aos':'aos.js',
        'MSSQL':'MySQL',
        
        # ... 其他技能映射 ...
    }
    return [skill_mapping.get(skill.lower(), skill) for skill in skills if skill]


# feed的功能是把Dbworklist清空重來，然後檢索Dbworlist後套入schemas做轉換與響應
# def db_feed(db: Session): 
#     new_workList_list = [DbWorklist(
#         school=worklist["school"],
#         semester=worklist["semester"],
#         workName=worklist["workName"],
#         githubUrl=worklist["githubUrl"],
#         websiteUrl=worklist["websiteUrl"],
#         pptUrl=worklist["pptUrl"],
#         imgUrl=worklist["imgUrl"],
#         clkcnt=0, #新增點擊
#         skill=worklist["skill"],
#         name=worklist["name"]
#     ) for worklist in WorkList]
#     db.query(DbWorklist).delete()
#     # db.commit()
#     # db.execute(text("ALTER SEQUENCE worklist_id_seq RESTART WITH 1;"))
#     # db.commit()
#     # db.execute(text("ALTER TABLE worklist ADD COLUMN clkcnt INTEGER DEFAULT 0;"))
#     db.commit()
#     db.add_all(new_workList_list)
#     db.commit()
#     db_items = db.query(DbWorklist).all()
#     return [WorkListResponseSchema.from_orm(item) for item in db_items] 

# 測試中(後續問老師狀況，目前卡JOSNB的議題，versel伺服器運轉不了，但本地搭建的postgresql可以運轉)
def db_feed(db: Session):
    new_workList_list = []
    for worklist in WorkList:
        # 將技能格式化
        formatted_skills = normalize_skills(worklist["skill"])
        new_worklist = DbWorklist(
            school=worklist["school"],
            semester=worklist["semester"],
            workName=worklist["workName"],
            githubUrl=worklist["githubUrl"],
            websiteUrl=worklist["websiteUrl"],
            pptUrl=worklist["pptUrl"],
            imgUrl=worklist["imgUrl"],
            clkcnt=0, #新增點擊
            skill=formatted_skills,  # 使用格式化後的技能
            name=worklist["name"]
        )
        new_workList_list.append(new_worklist)
    db.query(DbWorklist).delete()
    db.commit()
    db.execute(text("ALTER SEQUENCE worklist_id_seq RESTART WITH 1;"))
    db.commit()
    db.add_all(new_workList_list)
    db.commit()
    db_items = db.query(DbWorklist).all()
    return [WorkListResponseSchema.from_orm(item) for item in db_items]

# create功能是請求數據庫創建新的紀錄，用來實現用戶新增單獨作品 的功能。
def create(db: Session, request: WorkListRequestSchema):
    # 測試中(先擱置，後續問老師狀況，目前卡JOSNB的議題)
    formatted_skills = normalize_skills(request.skill)
    new_worklist = DbWorklist(
        school=request.school,
        semester=request.semester,
        workName=request.workName,
        githubUrl=request.githubUrl,
        websiteUrl=request.websiteUrl,
        pptUrl=request.pptUrl,
        imgUrl=request.imgUrl,
        # skill=request.skill, #原本的skill模式（未格式化）
        clkcnt=0,
        skill=formatted_skills,
        name=request.name
    )
    db.add(new_worklist)
    db.commit()
    db.refresh(new_worklist)
    return WorkListResponseSchema.from_orm(new_worklist)

# 從資料庫中檢索所有DbWorklist記錄。如果沒有找到任何記錄，則引發HTTP 404錯誤。
def get_all(db: Session):
    worklist = db.query(DbWorklist).all()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'worklist not found')
    return [WorkListResponseSchema.from_orm(item) for item in worklist]

# 從資料庫中讀取特定學期的worklist記錄。如果沒有找到符合指定學期的紀錄，會引發HTTP 404異常，否則返回這些紀錄。
def get_worklist_by_semester(semester: str, db: Session):
    #從資料庫中查詢所有學期等於（==）指定semester值的worklist記錄。
    worklist = db.query(DbWorklist).filter(DbWorklist.semester == semester).all()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'worklist with semester = {semester} not found')
    return [WorkListResponseSchema.from_orm(item) for item in worklist]

# 從資料庫中讀取特定學校的worklist記錄。如果沒有找到符合指定學校的紀錄，會引發HTTP 404異常，否則返回這些紀錄。
def get_worklist_by_school(school: str, db: Session):
    #從資料庫中查詢所有學校等於（==）指定school值的worklist記錄。
    worklist = db.query(DbWorklist).filter(DbWorklist.school == school).all()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'worklist with school = {school} not found')
    return [WorkListResponseSchema.from_orm(item) for item in worklist]

# 優化UX，製作一個先學校後學期的模式；先保留，自創代碼不確定用不用得上
def get_worklist_by_school_and_semester(school: str, semester: str, db: Session):
   worklist = db.query(DbWorklist).filter(DbWorklist.school == school, DbWorklist.semester == semester).all()
   if not worklist:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                           detail=f'worklist for school {school} and semester {semester} not found')
   return [WorkListResponseSchema.from_orm(item) for item in worklist]


# 優化資料空值的處理，還有將資料轉換成列表；先保留，老師代碼裡刪掉了
def str2List(worklist_records: list):
    for record in worklist_records:
        if record.skill:  
            record.skill = ast.literal_eval(record.skill)
        if record.name:  
            record.name = ast.literal_eval(record.name)
    return worklist_records

# 從資料庫中讀取特定id的worklist記錄。如果沒有找到符合指定id的紀錄，會引發HTTP 404異常，否則返回這些紀錄。 
def get_worklist_by_id(id: int, db: Session):
    # first() 方法則從查詢結果中返回第一個匹配的記錄，或在沒有匹配時返回 None。
    worklist = db.query(DbWorklist).filter(DbWorklist.id == id).first()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'worklist with id = {id} not found')
    return WorkListResponseSchema.from_orm(worklist)

# 第一版，老師給的大禮包。創建特定技能搜尋的代碼。contains主要用於檢查JSON或JSONB是否包含特定數據，屬於精准匹配。
# 但尚未做skill更動的相關套用
def get_worklist_by_filter(filter: str, db: Session):
    # 用於 JSONB 欄位的 contains 條件。
    jsonb_contains_condition = or_(
        DbWorklist.skill.contains([filter]),
        DbWorklist.name.contains([filter])
    )
    # 用於 String 欄位的 like 條件。like用途是實現模糊匹配，只要filter字串裡有部分出現於欄位中，就會回傳相關結果。
    # 應用f"%{filter}%"，可以做到模糊匹配的用途，好比搜尋abc，可能會跑出Aabc或者abc或者abcC這樣。
    string_like_condition = or_(
        DbWorklist.school.ilike(f"%{filter}%"),
        DbWorklist.semester.ilike(f"%{filter}%"),
        DbWorklist.workName.ilike(f"%{filter}%")
    )
    # 組合所有條件。select指令要從哪個表提取，而where指定符合使用者操作的紀錄會被選取。
    stmt = select(DbWorklist).where(
        or_(
            jsonb_contains_condition,
            string_like_condition
        )
    )
    # scalars是一個結果(Result)集合，而all將其傳回列表中。
    worklist = db.execute(stmt).scalars().all()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'worklist with filter = {filter} not found')
    return [WorkListResponseSchema.from_orm(item) for item in worklist]

# 舊版技能篩選，根據前端簡化篩選邏輯，引入技能格式化的處理。(後續問老師狀況，目前卡JOSNB的議題，versel伺服器運轉不了，但本地搭建的postgresql可以運轉)
def get_worklist_by_skill(skill_filter: str, db: Session):
    jsonb_contains_condition = DbWorklist.skill.contains([skill_filter])
    stmt = select(DbWorklist).where(jsonb_contains_condition)
    worklist = db.execute(stmt).scalars().all()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'No worklist found with skill = {skill_filter}')
    # 返回結果
    return [WorkListResponseSchema.from_orm(item) for item in worklist]


def get_worklist_by_multiple_skills(school: str, semester: str, skill1: Optional[str] = None, skill2: Optional[str] = None, skill3: Optional[str] = None,db: Session=Depends(get_db)):
    conditions = [DbWorklist.school == school, DbWorklist.semester == semester]
    skill_conditions = []
    if skill1 is not None:
        skill_conditions.append(DbWorklist.skill.contains([skill1]))
    if skill2 is not None:
        skill_conditions.append(DbWorklist.skill.contains([skill2]))
    if skill3 is not None:
        skill_conditions.append(DbWorklist.skill.contains([skill3]))
    # 至少要輸入一個
    if not skill_conditions:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='At least one skill must be provided')
    conditions.extend(skill_conditions)
    combined_condition = and_(*conditions)
    stmt = select(DbWorklist).where(combined_condition)
    worklist = db.execute(stmt).scalars().all()
    # 如果沒有相對應的結果
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='No worklist found with the provided skills')
    return [WorkListResponseSchema.from_orm(item) for item in worklist]


# 製作點擊數，會根據id做相對應判斷
def update_clkcnt(id: int, db: Session):
    worklist = db.query(DbWorklist).filter(DbWorklist.id == id).first()
    if not worklist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Worklist with id = {id} not found')
    worklist.clkcnt += 1
    db.commit()
    db.refresh(worklist)
    return WorkListResponseSchema.from_orm(worklist)


