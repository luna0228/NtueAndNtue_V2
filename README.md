## NtueAndNtue_V2
本版應用docker，為本地運轉的網頁（要怎麼線上得問老師）# NtueAndNtue_V2

## docker hub網址
https://hub.docker.com/repository/docker/popo47112/ntue_and_ntue_v2_frontend/general
https://hub.docker.com/repository/docker/popo47112/ntue_and_ntue_v2_backend/general

## 如何運轉環境與程式
1. `git clone`本資料夾
2. `docker compse up`，這將統一透過docker來部署虛擬環境
3. 終端機裡仔細看前端與後端的相關端口網址，打開便是本地的應用程式（封閉環境）
4. `docker compse down`或者`docker stop <前端container id> <後端container id> <資料庫container id>`，關閉這些運轉的東西