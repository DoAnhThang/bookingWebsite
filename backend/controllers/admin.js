const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Transaction = require("../models/transaction");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, isAdmin: true })
    .then((admin) => {
      if (!admin) {
        const newUser = new User({
          email: email,
          password: password,
          username: email
            .split("@")[0]
            .replace(/./, (str) => str.toUpperCase()),
          fullName: email
            .split("@")[0]
            .replace(/./, (str) => str.toUpperCase()),
          phoneNumber: String(Math.random()).replace(".", "").slice(0, 10),
          isAdmin: true,
        });
        newUser.save();
        return res.json({ isAuthenticated: true });
      }
      if (admin && admin.password !== password) {
        return res.json({ isAuthenticated: false });
      }
      res.json({ isAuthenticated: true });
    })
    .catch((err) => console.log(err));
};

exports.getDashboard = async (req, res, next) => {
  const users = await User.find({ isAdmin: false });
  const orders = await Transaction.find();
  const earnings = await Transaction.find({
    status: {
      $in: ["Checkin", "Checkout"],
    },
  });

  const transactions = await Transaction.find()
    .populate("userId", "username")
    .populate("hotel", "name");
  const lastestTransactions = transactions
    .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
    .slice(0, 8);

  res.json({
    infoBoard: {
      users: users.length,
      orders: orders.length,
      earnings: earnings.reduce((acc, tran) => acc + tran.price, 0),
    },
    lastestTransactions: lastestTransactions,
  });
};

exports.getHotelsList = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.json(hotels.sort((a, b) => (a.city > b.city ? 1 : -1)));
    })
    .catch((err) => console.log(err));
};

exports.postDeleteHotel = async (req, res, next) => {
  const hotelId = req.body.hotelId;

  const transactionsOfHotel = await Transaction.find({ hotel: hotelId });

  if (transactionsOfHotel.length === 0) {
    await Hotel.findByIdAndRemove(hotelId);
    res.status(200).json({ message: "ok" });
  } else
    res.json({
      message: `Could not delete.\nThis hotel is having ${
        transactionsOfHotel.length
      } transaction${transactionsOfHotel.length > 1 ? "s" : ""}.`,
    });
};

exports.postAddHotel = (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const city = req.body.city;
  const address = req.body.address;
  const distance = req.body.distance;
  const title = req.body.title;
  const desc = req.body.desc;
  const cheapestPrice = parseInt(req.body.cheapestPrice);
  const photos = req.body.photos.split(",");
  const featured = req.body.featured;
  const rooms = req.body.rooms;

  const newHotel = new Hotel({
    name: name,
    type: type,
    city: city,
    address: address,
    distance: distance,
    title: title,
    desc: desc,
    cheapestPrice: cheapestPrice,
    photos: photos,
    featured: featured,
    rooms: rooms,
    rating: 5,
  });
  newHotel
    .save()
    .then(() => res.end())
    .catch((err) => console.log(err));
};

exports.getEditHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel) {
        return res.json(null);
      }
      res.json(hotel);
    })
    .catch((err) => console.log(err));
};

exports.postEditHotel = (req, res, next) => {
  const hotelId = req.body.hotelId;
  const updatedName = req.body.name;
  const updatedType = req.body.type;
  const updatedCity = req.body.city;
  const updatedAddress = req.body.address;
  const updatedDistance = req.body.distance;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.desc;
  const updatedCheapestPrice = parseInt(req.body.cheapestPrice);
  const updatedPhotos = req.body.photos.split(",");
  const updatedFeatured = req.body.featured;
  const updatedRooms = req.body.rooms;

  Hotel.findByIdAndUpdate(
    hotelId,
    {
      name: updatedName,
      type: updatedType,
      city: updatedCity,
      address: updatedAddress,
      distance: updatedDistance,
      title: updatedTitle,
      desc: updatedDesc,
      cheapestPrice: updatedCheapestPrice,
      photos: updatedPhotos,
      featured: updatedFeatured,
      rooms: updatedRooms,
    },
    { new: true }
  )
    .then((hotel) => res.end())
    .catch((err) => console.log(err));
};

exports.getRoomsList = (req, res, next) => {
  Room.find()
    .then((rooms) => {
      res.json(rooms.sort((a, b) => (a.title > b.title ? 1 : -1)));
    })
    .catch((err) => console.log(err));
};

exports.postDeleteRoom = async (req, res, next) => {
  const roomId = req.body.roomId;

  const transactionsIncludeRoom = await Transaction.find({
    "room.roomId": roomId,
  });

  if (transactionsIncludeRoom.length === 0) {
    await Room.findByIdAndRemove(roomId);
    await Hotel.updateMany(
      {
        rooms: roomId,
      },
      { $pull: { rooms: roomId } }
    );
    res.status(200).json({ message: "ok" });
  } else
    res.json({
      message: `Could not delete.\nThis room type is being in ${
        transactionsIncludeRoom.length
      } transaction${transactionsIncludeRoom.length > 1 ? "s" : ""}.`,
    });
};

exports.postAddRoom = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const price = parseInt(req.body.price);
  const maxPeople = parseInt(req.body.maxPeople);
  const roomNumbers = req.body.roomNumbers.split(",").map((r) => parseInt(r));
  const hotelIds = req.body.roomOfWhichHotel;

  const newRoom = new Room({
    title: title,
    desc: desc,
    price: price,
    maxPeople: maxPeople,
    roomNumbers: roomNumbers,
  });
  newRoom
    .save()
    .then((room) => {
      hotelIds.forEach((hotelId) => {
        Hotel.findById(hotelId).then((hotel) => {
          hotel.rooms.push(room._id);
          hotel.save();
        });
      });
      res.end();
    })
    .catch((err) => console.log(err));
};

exports.getEditRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Room.findById(roomId)
    .then((room) => {
      if (!room) {
        return res.json(null);
      }
      Hotel.find({ rooms: roomId }, "_id").then((hotels) => {
        res.json({
          ...room._doc,
          hotelIds: hotels.map((hotel) => hotel._id.toString()),
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditRoom = async (req, res, next) => {
  const roomId = req.body.roomId;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.desc;
  const updatedPrice = parseInt(req.body.price);
  const updatedMaxPeople = parseInt(req.body.maxPeople);
  const updatedRoomNumbers = req.body.roomNumbers
    .split(",")
    .map((r) => parseInt(r));
  const updatedHotelIds = req.body.roomOfWhichHotel;

  // update information of room type
  await Room.findByIdAndUpdate(
    roomId,
    {
      title: updatedTitle,
      desc: updatedDesc,
      price: updatedPrice,
      maxPeople: updatedMaxPeople,
      roomNumbers: updatedRoomNumbers,
    },
    { new: true }
  );

  // remove room type from all hotels
  await Hotel.updateMany(
    {
      rooms: roomId,
    },
    { $pull: { rooms: roomId } }
  );

  // update room type to selected hotels
  for (let hotelId of updatedHotelIds) {
    let hotel = await Hotel.findById(hotelId);
    hotel.rooms.push(roomId);
    await hotel.save();
  }
  res.end();
};

exports.getTransactionsList = (req, res, next) => {
  Transaction.find()
    .populate("userId", "username")
    .populate("hotel", "name")
    .then((transactions) => {
      res.json(
        transactions.sort(
          (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
        )
      );
    })
    .catch((err) => console.log(err));
};

exports.getUsersList = async (req, res, next) => {
  const users = await User.find().select("-password");

  // add amountOfTransactions property to each user
  let updatedUsers = await Promise.all(
    users.map(async (user) => {
      const transactions = await Transaction.find({ userId: user._id });
      return { ...user._doc, amountOfTransactions: transactions.length };
    })
  );

  res.json(updatedUsers);
};
