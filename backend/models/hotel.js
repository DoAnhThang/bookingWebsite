const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// contains information about the hotel
const hotelSchema = new Schema({
  // Tên của khách sạn
  name: {
    type: String,
    required: true,
  },
  // Loại khách sạn ("hotel", "apartments", "resorts", "villas", "cabins")
  type: {
    type: String,
    required: true,
  },
  // Thành phố của khách sạn đó
  city: {
    type: String,
    required: true,
  },
  // Địa chỉ cụ thể của khách sạn
  address: {
    type: String,
    required: true,
  },
  // Khoảng cách từ khách sạn đến trung tâm thành phố
  distance: {
    type: String,
    required: true,
  },
  // Khẩu hiệu của khách sạn
  title: {
    type: String,
    required: true,
  },
  // Giới thiệu về khách sạn
  desc: {
    type: String,
    required: true,
  },
  // Mức giá của loại phòng rẻ nhất của khách sạn
  cheapestPrice: {
    type: Number,
    required: true,
  },
  // Danh sách các link ảnh của khách sạn đó
  photos: [
    {
      type: String,
      required: true,
    },
  ],
  // Khách sạn có hỗ trợ các tiện ích khác không
  featured: {
    type: Boolean,
    required: true,
  },
  // Danh sách các loại phòng thuộc khách sạn này theo _id
  rooms: [
    {
      type: String,
      ref: "Room",
      required: true,
    },
  ],
  // Đánh giá về khách sạn đó (trong khoảng 0 -> 10 điểm)
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
