const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  //필드 작성
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //공백 없애주는 역할
    unique: 1, //중복금지
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    //0 일반유저, 1 관리자
    type: Number,
    default: 0,
  },

  image: String,

  token: {
    type: String,
  },
  tokenExp: {
    //토큰 유효기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema); //모델은 스키마를 감싸줌

module.exports = { User }; //다른 파일에서도 사용 가능하게 해줌
