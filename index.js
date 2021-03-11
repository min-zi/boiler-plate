const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 하이");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body); //인스턴스를 만들어서 ﻿req.body안에 body-parser로 받은 모델을 넣어준다

  user.save((err, userInfo) => {
    //save는 몽고디비 메소드, user 인스턴스에 모델을 저장
    if (err) return res.json({ success: false, err }); //에러가 있다면~ json형식의 에러와 에러메세지를 전달
    return res.status(200).json({
      //status(200)=성공했다, 성공했다면~ json형식의 true를 띄움
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
