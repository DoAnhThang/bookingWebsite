const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/login", adminController.postLogin);

router.get("/dashboard", adminController.getDashboard);

router.get("/hotels-list", adminController.getHotelsList);

router.post("/delete-hotel", adminController.postDeleteHotel);

router.post("/add-hotel", adminController.postAddHotel);

router.get("/edit-hotel/:hotelId", adminController.getEditHotel);

router.post("/edit-hotel", adminController.postEditHotel);

router.get("/rooms-list", adminController.getRoomsList);

router.post("/delete-room", adminController.postDeleteRoom);

router.post("/add-room", adminController.postAddRoom);

router.get("/edit-room/:roomId", adminController.getEditRoom);

router.post("/edit-room", adminController.postEditRoom);

router.get("/transactions-list", adminController.getTransactionsList);

router.get("/users-list", adminController.getUsersList);

module.exports = router;
