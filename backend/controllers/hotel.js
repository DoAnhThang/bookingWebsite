const Hotel = require("../models/hotel");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Room = require("../models/room");
const filtering = require("../utils/filtering");

exports.getHotels = (req, res, next) => {
  Hotel.find({
    city: {
      $in: ["Ha Noi", "Ho Chi Minh", "Da Nang"],
    },
  })
    .then((hotels) => {
      if (hotels) {
        const hotelByCity = filtering.hotelByCity(hotels);
        const propertyByType = filtering.propertyByType(hotels);
        const hotelByRating = filtering.hotelByRating(hotels);
        return res.json({
          hotelByCity: hotelByCity,
          propertyByType: propertyByType,
          hotelByRating: hotelByRating,
        });
      } else {
        res.statusMessage = "Not found information";
        res.status(404).json({});
      }
    })
    .catch((err) => console.log(err));
};

exports.getSearchHotels = async (req, res, next) => {
  const reqCity = req.query.city;
  const reqStartDate = req.query.startDate;
  const reqEndDate = req.query.endDate;
  const reqRoom = parseInt(req.query.roomQty);
  const reqPerson = req.query.personQty;
  console.log("req: ", reqCity, reqStartDate, reqEndDate, reqRoom, reqPerson);

  // find hotels by city
  const hotels = await Hotel.find({ city: reqCity }).populate(
    "rooms",
    "roomNumbers maxPeople desc title price"
  );

  if (hotels.length === 0) {
    return res.json([]);
  }

  // filter the rooms have been booked or checked-in
  let hotelsFilterRooms = await Promise.all(
    hotels.map(async (hotel) => {
      // create a clone hotel object without affecting the original hotel
      const hotelClone = JSON.parse(JSON.stringify(hotel));
      // find booked rooms by hotel
      const hotelFiltered = await filtering.roomByHotel(
        hotelClone,
        reqStartDate,
        reqEndDate,
        reqRoom,
        reqPerson
      );
      return hotelFiltered;
    })
  );

  hotelsFilterRooms = hotelsFilterRooms.filter(Boolean);
  if (hotelsFilterRooms.length > 0) {
    hotelsFilterRooms.sort((a, b) => b.rating - a.rating);
    res.json(hotelsFilterRooms);
  } else {
    res.statusMessage = "Not found hotel";
    res.status(404).json([]);
  }
};

exports.getHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;

  Hotel.findById(hotelId)
    .then((hotel) => res.json(hotel))
    .catch((err) => console.log(err));
};

exports.getAvailableRooms = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const reqStartDate = req.query.startDate;
  const reqEndDate = req.query.endDate;
  console.log("req: ", hotelId, reqStartDate, reqEndDate);

  const hotel = await Hotel.findById(hotelId).populate(
    "rooms",
    "roomNumbers maxPeople desc title price"
  );

  const hotelFiltered = await filtering.roomByHotel(
    hotel,
    reqStartDate,
    reqEndDate,
    0,
    0
  );
  res.json(hotelFiltered);
};
