# expense-tracker<img width="1440" alt="家庭記帳本" src="https://user-images.githubusercontent.com/98327436/175813070-1787576b-2d13-4ddd-a08b-186e4ea73721.png">

# 關於 家庭記帳本
1. 使用email註冊帳號
2. 可以自己新增消費紀錄
3. 可以刪除消費紀錄
4. 可以修改消費紀錄
5. 查看所有消費紀錄
6. 可以知道目前消費總額
7. 可以搜尋特定消費類型的紀錄
8. 可以知道特定類型消費的總額


# 環境建置與需求
1. Node.js 16.14.0
2. Express: 4.18.1
3. Express-handlebars: 3.0.0
4. Mongoose: 5.9.7
5. Method-override: 3.0.0
6. bcryptjs: 2.4.3
7. connect-flash: 0.1.1
8. dotenv: 8.2.0
9. express-session: 1.17.1
10. passport: 0.4.1
11. passport-local: 1.0.0
12. body-parser: 1.20.0

# 安裝步驟
1. 安裝node.js 與 npm
2. 下載本專案
3. 透過終端機進入資料夾，輸入：npm install
4. 將.env.example檔修改為.env檔，並更改成適當的環境參數
5. 輸入：npm run seed 來建立種子資料
6. 輸入：npm run start 啟動伺服器
7. 若看見 Express is listening on http://localhost:3000 訊息則代表順利運行，打開瀏覽器進入到以下網址 http://localhost:3000
8. 可使用種子資料的帳密進行登入(帳：use1@test  密：123)
9. 若欲暫停使用 ctrl + c
