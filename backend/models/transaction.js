const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// transactions to rent hotels
const transactionSchema = new Schema({
  // User id của người đặt phòng
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // _id của khách sạn đã đặt
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  // Danh sách các phòng đã đặt
  room: [
    {
      roomId: {
        type: String,
        ref: "Room",
        required: true,
      },
      roomNums: [
        {
          type: Number,
          required: true,
        },
      ],
    },
  ],
  // Ngày nhận phòng
  dateStart: {
    type: String,
    required: true,
  },
  // Ngày trả phòng
  dateEnd: {
    type: String,
    required: true,
  },
  // Chi phí
  price: {
    type: Number,
    required: true,
  },
  // Hình thức thanh toán ("Credit Card", "Cash")
  payment: {
    type: String,
    required: true,
  },
  // Tình trạng ("Booked", "Checkin", "Checkout")
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
