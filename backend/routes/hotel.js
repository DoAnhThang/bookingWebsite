const express = require("express");

const hotelController = require("../controllers/hotel");

const router = express.Router();

router.get("/hotels", hotelController.getHotels);

router.get("/search", hotelController.getSearchHotels);

router.get("/detail/:hotelId", hotelController.getHotel);

router.get("/available-rooms/:hotelId", hotelController.getAvailableRooms);

module.exports = router;
