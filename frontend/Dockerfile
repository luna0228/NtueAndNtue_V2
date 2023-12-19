# 測試運行的docker指令：docker run -p 5173:5173 映像檔名稱
# 安裝node版本，指定20瘦身版
FROM node:20.10-slim as build-stage

# 設置工作目錄
WORKDIR /frontend

# 複製 package.json 和 yarn.lock 文件
COPY package.json ./
COPY yarn.lock ./
COPY vite.config.js ./

# 複製本地目錄到container裡
COPY . .

# 安裝依賴
RUN yarn

# 導入YML後註解掉
# EXPOSE 5173
# CMD ["yarn","dev"]