const Transaction = require("../models/transaction");

// filter hotel by city
exports.hotelByCity = (hotels) => {
  const featured = [
    {
      city: "Ha Noi",
      imageUrl:
        "https://bcp.cdnchinhphu.vn/Uploaded/nguyenthikimlien/2018_01_23/cam-nang-du-lich-ha-noi-mytour-1.jpg",
      hotelQty: 0,
    },
    {
      city: "Ho Chi Minh",
      imageUrl:
        "https://imageio.forbes.com/specials-images/imageserve/1095880968/Traffic-on-the-road-at-front-of-Ho-Chi-Minh-City-Hall-in-Ho-Chi-Minh-City-Capital-of/960x0.jpg?format=jpg&width=960",
      hotelQty: 0,
    },
    {
      city: "Da Nang",
      imageUrl:
        "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/shutterstock419351539-1-1641320446823.png",
      hotelQty: 0,
    },
  ];

  hotels.forEach((hotel) => {
    featured.forEach((item) => {
      if (item.city === hotel.city) item.hotelQty++;
    });
  });

  return featured;
};

// filter property by type
exports.propertyByType = (hotels) => {
  const propertyType = [
    {
      type: "hotel",
      imageUrl:
        "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
      hotelQtyByType: 0,
    },
    {
      type: "apartments",
      imageUrl:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
      hotelQtyByType: 0,
    },
    {
      type: "resorts",
      imageUrl:
        "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
      hotelQtyByType: 0,
    },
    {
      type: "villas",
      imageUrl:
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=",
      hotelQtyByType: 0,
    },
    {
      type: "cabins",
      imageUrl:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o=",
      hotelQtyByType: 0,
    },
  ];

  hotels.forEach((hotel) => {
    propertyType.forEach((item) => {
      if (item.type === hotel.type) item.hotelQtyByType++;
    });
  });

  return propertyType;
};

// filter 3 hotels have highest rating
exports.hotelByRating = (hotels) => {
  const propertyList = hotels.sort((a, b) => b.rating - a.rating).slice(0, 3);
  return propertyList;
};

// filter rooms by hotel and time of stay
exports.roomByHotel = async (
  hotel,
  reqStartDate,
  reqEndDate,
  reqRoom,
  reqPerson
) => {
  const transactions = await Transaction.find({
    hotel: hotel._id,
    status: {
      $in: ["Booked", "Checkin"],
    },
    $or: [
      {
        dateStart: {
          $gte: reqStartDate,
          $lte: reqEndDate,
        },
      },
      {
        dateEnd: {
          $gte: reqStartDate,
          $lte: reqEndDate,
        },
      },
      {
        $and: [
          {
            dateStart: { $lte: reqStartDate },
          },
          {
            dateEnd: { $gte: reqEndDate },
          },
        ],
      },
    ],
  });

  // filter the rooms have been booked or checked-in by room type
  transactions.forEach((transaction) => {
    const bookedRooms = transaction.room;
    bookedRooms.forEach((bookedRoom) => {
      const roomIndex = hotel.rooms.findIndex(
        (room) => room._id.toString() === bookedRoom.roomId
      );
      if (roomIndex >= 0) {
        hotel.rooms[roomIndex].roomNumbers = hotel.rooms[
          roomIndex
        ].roomNumbers.filter(
          (roomNum) => !bookedRoom.roomNums.includes(roomNum)
        );
        if (hotel.rooms[roomIndex].roomNumbers.length === 0) {
          hotel.rooms.splice(roomIndex, 1);
        }
      }
    });
  });

  // remove room types that have no rooms at all
  let availableRooms = 0,
    availablePerson = 0;
  hotel.rooms = hotel.rooms.map((room) => {
    availableRooms += room.roomNumbers.length;
    availablePerson += room.roomNumbers.length * room.maxPeople;
    return room;
  });

  if (availableRooms >= reqRoom && availablePerson >= reqPerson) {
    return hotel;
  } else return null;
};
