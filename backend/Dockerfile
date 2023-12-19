# 測試運行的docker指令：docker run -p 5001:5001 映像檔名稱
FROM python:3.12.1-slim

# 設置工作目錄
WORKDIR /backend

# 複製本地目錄到container裡
COPY . .

# 安裝依賴
RUN pip install -r requirements.txt

# 終端機指令。
# 導入YML後註解掉
# EXPOSE 5001
# CMD [ "python", "app.py"]