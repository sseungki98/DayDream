const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "이메일을 입력해주세요."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "유효한 이메일을 입력해주세요."],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해주세요."],
    minLength: 8,
    maxLength: 16,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "비밀번호를 한번 더 입력해주세요."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "동일한 비밀번호를 입력해주세요.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: Date,
  name: {
    type: String,
    required: [true, "닉네임을 입력해주세요."],
    minLength: [1, "닉네임은 1글자 이상이여야 합니다."],
    maxLength: [8, "닉네임은 8글자 이하여야 합니다."],
  },
  introduce: {
    type: String,
    default: "",
    maxLength: [100, "자기소개는 100글자 이하여야 합니다."],
  },
  img: [String],
  age: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  socket: String,
});

// PASSWORD HASHING
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// JWT 토큰을 발행한 뒤 비밀번호를 바꾼지 아닌지 체크. 바꿨다면 true, 아니라면 false return
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return changedTimestamp > JWTTimestamp;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
