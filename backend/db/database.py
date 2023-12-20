# 1203新增，導入sqlalchemy後，直接複製講義的代碼，用來宣告SQLite資料庫形式
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# SQLALCHEMY_DATABASE_URL = "sqlite:///./worklistdatabase.db"

# 這個要用相對路徑，因為engine在app.py內被實作，所以資料庫檔案會建立在與app.py同⼀層的專案根⽬錄位置
# SQLALCHEMY_DATABASE_URL = "postgresql://default:wDt8BaKp1fWm@ep-blue-union-72271377.us-east-1.postgres.vercel-storage.com:5432/verceldb"

#  有docker幫忙命名後，URL規則是://${{USER}}:${{PASSWORD}}@${{HOST}}:${{PORT}/${{database}}
SQLALCHEMY_DATABASE_URL = "postgresql://worklistbe:givemebe@postgre:5432/worklist"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
