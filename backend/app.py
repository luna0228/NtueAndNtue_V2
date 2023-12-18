import uvicorn
from fastapi import FastAPI
# 1202更動 把舊的db載入改成router在跑
# from db.WorkListJson import WorkList
# 1203更動 再把db改成database再跑
from router import WorkListRouter
from db import models
from db.database import engine
from fastapi.middleware.cors import CORSMiddleware


# 創建 FastAPI 應用實例
app = FastAPI(
    title = "Student WorkList API",
    description = "處理大二學生的網頁作品資料，會包含如校名、學期、技能等等",
    version="1218.Ver3版",
    terms_of_service="http://localhost:5000",
)
# 用router的呼叫，使雲端上吃得到資料
app.include_router(WorkListRouter.router)
# 這行代碼將 WorkListRouter 路由器添加到的 FastAPI 應用中。這意味着 WorkList 中定義的所有路徑（或端點）現在都是 FastAPI 應用的一部分。


# 定義允許訪問您應用的來源列表，有本地測試用的網址，以及來自所有來源的請求
origins = [
    'http://localhost:3000',
    "*"
]


# 應用FastApi的套件，處理CORS議題的運轉機制；先放這，目前進入Ver3版後，重新啟動使用
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # 允許來源列表中的來源
    allow_credentials=True,
    allow_methods=["*"], # 允許所有常用的 HTTP 方法
    allow_headers=['*'] # 允許所有標準的 HTTP 頭部
)

@app.get("/")
def read_root():
    return {"message": "Welcome to student WorkList API! 請在本網址後輸入/docs查閱API資料"}

# 運行伺服器，舊版Ver2
# if __name__ == "__main__":
#     uvicorn.run("app:app", port=5000, reload=True)

# 運行伺服器，新版Ver3
if __name__ == "__main__":
    uvicorn.run("app:app",host="0.0.0.0", port=5001, reload=True)
# 指定host為0.0.0.0，這會讓Uvicorn監聽所有公開IP位置，而在docker環境下，這將允許從容器（Container）外部訪問應用
# 改成8000，因為卡一些不知名議題

models.Base.metadata.create_all(engine)
# 在資料庫中創建所有由 SQLAlchemy ORM 模型定義的表格。
# 'Base' 包含了所有模型類的元數據，'create_all' 函數使用這些元數據來創建表格。
# 如果表格已經存在於資料庫中，則不會重複創建。