# 1203新增，用來宣告SQLite資料庫表格每一個欄位變數名稱與資料型態
# 1217更動，引入JOSNB的處理
from .database import Base
from sqlalchemy import Column, JSON, Integer, String
from sqlalchemy.dialects.postgresql import JSONB

class DbWorklist(Base):
    __tablename__ = 'worklist'
    # 整數類型（Int），id擔任主鍵，可以做索引
    id = Column(Integer, primary_key=True, index=True)
    school = Column(String)
    semester = Column(String)
    workName = Column(String)
    githubUrl = Column(String)
    websiteUrl = Column(String)
    pptUrl = Column(String)
    imgUrl = Column(String)
    clkcnt = Column(Integer)
    # 單表型態下，skill以及name變成一個Jsonb格式
    skill = Column(JSONB)
    name = Column(JSONB)
