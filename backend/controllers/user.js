const mongoose = require("mongoose");
const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res.json({
          isExisted: true,
        });
      }
      const newUser = new User({
        email: email,
        password: password,
        username: email.split("@")[0].replace(/./, (str) => str.toUpperCase()),
        fullName: email.split("@")[0].replace(/./, (str) => str.toUpperCase()),
        phoneNumber: String(Math.random()).replace(".", "").slice(0, 10),
        isAdmin: false,
      });
      newUser.save();
      res.json({ isExisted: false });
    })
    .catch((err) => console.log(err));
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: password })
    .select("-password")
    .then((user) => {
      if (!user) {
        return res.json({ isAuthenticated: false });
      }
      res.json({ isAuthenticated: true, user: user });
    })
    .catch((err) => console.log(err));
};

exports.postTransaction = (req, res, next) => {
  const userId = req.body.userId;
  const hotel = req.body.hotel;
  const room = req.body.room;
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const price = req.body.price;
  const payment = req.body.payment;
  console.log(userId, hotel, dateStart, dateEnd, price, payment);
  const transaction = new Transaction({
    userId: new mongoose.Types.ObjectId(userId),
    hotel: new mongoose.Types.ObjectId(hotel),
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: "Booked",
  });
  transaction
    .save()
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => console.log(err));
};

exports.getTransactions = (req, res, next) => {
  const userId = req.query.userId;

  Transaction.find({ userId: userId })
    .populate("hotel", "name")
    .then((transactions) => {
      transactions.sort(
        (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
      );
      res.json(transactions);
    })
    .catch((err) => console.log(err));
};
