***************************************************************วิธีการติดตั้ง ********************************************************
1)ทำการติดตั้ง Node.js และ npm เวอร์ชั่นล่าสุด
2)Clone Project จาก https://github.com/mnkych/Buzsim

== FrontEnd ==
1) เข้าไปที่ Buzsim/fronend/ 
2) ใช้คำสั่ง npm install 
3) ออกไปที่ Buzsim/
4) คัดลอก Folder bootstrap ไปไว้ยัง Buzsim/fronend/node_modules/ พร้อมยืนยันการ Replace ทุกไฟล์
5) เข้าไปที่ Buzsim/fronend/ 
6) สร้างไฟล์ .env
	- ภายในไฟล์กำหนด Parameter สำหรับเข้าถึง API โดยใช้ชื่อ 
		REACT_APP_DB_SERVICE=XX___URL for API___XX
	ดังตัวอย่างในไฟล์ .env.example
7) ใช้คำสั่ง npm run build
8) คัดลอกไฟล์ทั้งหมดภายใน Folder Buzsim/frontend/build/ ไปไว้ยัง Web Server Directory
=========================================================================================

== BackEnd ==
1) เข้าไปที่ Buzsim/backend/Configs
2) สร้างไฟล์ .env
	- ภายในไฟล์กำหนด Parameter 3 ตัว สำหรับเข้าถึง Databaseโดยใช้ชื่อ 
		DB_HOST=XX___DB server host___XX
		DB_USERNAME=XX___ Username for connect DB___XX
		DB_PASSWORD=XX___Password for connect DB___XX
		DB_DBNAME=XX___Database name___XX
	ดังตัวอย่างในไฟล์ .env.example
3) ออกไปที่ Buzsim/backend/
4) รันไฟล์ Server.js ด้วย Node.js โดยใช้คำสั่ง node server.js (หรือคำสั่งทำงานเบื้องหลังอื่นๆ เช่น PM2)
=========================================================================================

*************************************************************************************************************************************

