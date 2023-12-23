FROM python:3.8.1-slim

# 設置工作目錄
WORKDIR /code

# 複製本地目錄到container裡
COPY . .

# 安裝依賴
RUN pip install -r requirements.txt

# 終端機指令。
# 導入YML後註解掉
# EXPOSE 8000
# CMD [ "python", "app.py"]