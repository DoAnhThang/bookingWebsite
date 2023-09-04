const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// different room types
const roomSchema = new Schema({
  // Tên loại phòng
  title: {
    type: String,
    required: true,
  },
  // Mô tả về loại phòng
  desc: {
    type: String,
    required: true,
  },
  // Mức giá của loại phòng đó (tính theo ngày)
  price: {
    type: Number,
    required: true,
  },
  // Số người tối đa
  maxPeople: {
    type: Number,
    required: true,
  },
  // Danh sách số phòng của loại phòng này
  roomNumbers: [
    {
      type: Number,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);
