const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use(express.json());

dotenv.config({
  path: "./config.env",
});

require("./config/conndb");
require("./config/reggdb");
require("./socket");

app.use(cors());


app.use("/api/auth", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`THE SERVER OF GURUCOOL RUNNING AT : ${PORT} port!`.gray.bold);
});
