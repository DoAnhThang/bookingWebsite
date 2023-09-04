const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// corresponding to a user in the system
const userSchema = new Schema({
  // Tên đăng nhập
  username: {
    type: String,
    required: false,
  },
  // Mật khẩu người dùng
  password: {
    type: String,
    required: true,
  },
  // Họ và tên của người dùng
  fullName: {
    type: String,
    required: false,
  },
  // Số điện thoại của người dùng
  phoneNumber: {
    type: String,
    required: false,
  },
  // Email của người dùng
  email: {
    type: String,
    required: true,
  },
  // Người dùng này có phải Admin không
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
