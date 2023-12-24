from fastapi import APIRouter , Depends
# from db.WorkListJson import WorkList 1202改路徑
# from db.OneTableWorkList import WorkList 1203再改路徑，應用database
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_worklist
from router.schemas import WorkListResponseSchema,WorkListRequestSchema
from typing import List, Optional
import logging

router = APIRouter (
    prefix='/worklist',
    tags=['worklist']
)

# 設置日誌處理器，使用StreamHandler 而不是 RotatingFileHandler。
# 主要用途是可以在控制台看到應用程序的日誌輸出，以利於開發者。
#logger = logging.getLogger("myapp") #這行代碼創建名為myapp的日誌處理器
#logger.setLevel(logging.INFO) #這邊只說只有info類型的資料（如ERROR.WAARING）會被處理與紀錄
#stream_handler = logging.StreamHandler() #創建一個流處理器，將日誌訊息輸出到控制台（指終端機或開發者介面）。
#logger.addHandler(stream_handler) #確保所有訊息都會通過此處理器輸出

#將上面寫法導入schemas後，做一個編修與更動，以下直接替換
@router.put('/update/clkcnt/{id}', response_model=WorkListResponseSchema)
def update_clkcnt(id: int, db: Session = Depends(get_db)):
    return db_worklist.update_clkcnt(id, db)
# 點擊數製作

@router.post('', response_model=WorkListResponseSchema)
def create_work(request: WorkListRequestSchema, db: Session = Depends(get_db)):
    return db_worklist.create(db, request)

@router.get('/feed')
def get_initial_worklist(db: Session = Depends(get_db)):
    return db_worklist.db_feed(db)
# 當端點({prefix}/feed)被訪問時，將會調用db_feed的指令來初始化資料庫。

@router.get('/all', response_model=List[WorkListResponseSchema])
def get_all_worklist(db: Session = Depends(get_db)):
    return db_worklist.get_all(db)
# 當端點({prefix}/all)被訪問時，將會調用get_all的指令來檢索資料庫所有的worklist紀錄，如果沒有找到任何一筆，則回傳404。

@router.get('/semester',response_model=List[WorkListResponseSchema])
def get_worklist_by_semester(semester: str = "", db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_semester(semester, db)
# 當端點({prefix}/semester)被訪問時，將會調用get...ster的指令來檢索資料庫所有的worklist紀錄，如果沒有找到任何一筆，則回傳404。

@router.get('/school',response_model=List[WorkListResponseSchema])
def get_worklist_by_school(school: str = "", db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_school(school, db)
# 當端點({prefix}/school)被訪問時，將會調用get...hool的指令來檢索資料庫所有的worklist紀錄，如果沒有找到任何一筆，則回傳404。

@router.get('/{school}/{semester}',response_model=List[WorkListResponseSchema])
def get_worklist_by_school_and_semester(school: str, semester: str, db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_school_and_semester(school, semester, db)
# 優化UX，製作先選好學校再選學期的端口，然後使用者看到的路徑會如：/ver1203/worklist/ntue/112-2 這類

@router.get('/id', response_model=WorkListResponseSchema)
def get_worklist_by_id(id: int = 1, db: Session = Depends(get_db)): #起始默認id為1。
    return db_worklist.get_worklist_by_id(id, db)
# 當端點({prefix}/id)被訪問時，將會調用get...id的指令來檢索資料庫所有的worklist紀錄，如果沒有找到任何一筆，則回傳404。

@router.get('/filter', response_model=List[WorkListResponseSchema])
def get_worklist_by_filter(filter: str = "", db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_filter(filter, db)
# 1217新增，當端點({prefix}/filter)被訪問時，會根據關鍵字做一個搜尋。可套入於全域資料的搜尋機制。

@router.get('/skill_filter', response_model=List[WorkListResponseSchema])
def get_worklist_by_skill(skill_filter: str = "", db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_skill(skill_filter, db)
# 1217新增，當端點({prefix}/skill_filter)被訪問時，會技能關鍵字篩選做一個條件判斷。可套入前端ANTD之select樣式。
# (後續問老師狀況，目前卡JOSNB的議題，versel伺服器運轉不了，但本地搭建的postgresql可以運轉)

@router.get('/{school}/{semester}/multiple_skill_filter', response_model=List[WorkListResponseSchema])
def get_worklist_by_multiple_skills(school: str, semester: str, skill1: Optional[str] = None, skill2: Optional[str] = None, skill3: Optional[str] = None, db: Session = Depends(get_db)):
    return db_worklist.get_worklist_by_multiple_skills(school, semester, skill1, skill2, skill3, db)
#1222新增，技能篩選，上限為三。搜尋結果是and的邏輯，但使用上輸入不會強迫要輸三次