const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
// app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const hotelRoutes = require("./routes/hotel");
const adminRoutes = require("./routes/admin");

app.use(userRoutes);
app.use(hotelRoutes);
app.use("/admin", adminRoutes);

// handling non matching request from the client
app.use((req, res, next) => {
  res.statusMessage = "Route not found";
  res.status(404).json({ message: "Route not found" });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server on " + process.env.PORT)
    )
  )
  .catch((err) => console.log(err));
