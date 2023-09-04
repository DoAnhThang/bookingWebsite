const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.post("/login", userController.postLogin);

router.post("/signup", userController.postSignup);

// router.post('/logout', userController.postLogout);

router.post("/create-transaction", userController.postTransaction);

router.get("/transactions", userController.getTransactions);

module.exports = router;
