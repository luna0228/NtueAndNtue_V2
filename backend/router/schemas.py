# 1203新增，處理ORM以及Json格式之間的轉換。
from pydantic import BaseModel
from typing import List

# 定義一個Pydantic模型，用於處理WorkList的請求數據。
class WorkListRequestSchema(BaseModel):
    school: str
    semester: str
    workName: str
    githubUrl: str
    websiteUrl: str
    pptUrl: str
    imgUrl: str
    skill: List[str]
    name: List[str]
    # 補充，原本skill是一個大大的Json，這邊應用套件轉換成字符串列的形式

# 定義一個Pydantic模型，用於處理WorkList的響應數據。
class WorkListResponseSchema(WorkListRequestSchema):
    id: int #整數且唯一標識用途

#模型的配置
    class Config:
        from_attributes = True # 允許從ORM模型的屬性自動創建Pydantic模型。

