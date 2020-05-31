const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../../config/jwt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: String,
    role: {
      type: String,
      default: "user",
    },
    recovery: {
      type: {
        token: String,
        date: Date,
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJson = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
  };
};

//gera token
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this.id,
      expiresIn,
    },
    secret
  );
};

UserSchema.methods.getJwt = function () {
  return {
    _id: this.id,
    name: this.name,
    email: this.email,
    role: this.role,
    token: this.generateToken(),
  };
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};
//antes de salvar
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
});

module.exports = mongoose.model("User", UserSchema);
