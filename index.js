const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./Routes/User.Routes");
const { DoctorRouter } = require("./Routes/Doctor.Routes");
const { auth } = require("./Middleware.js/auth");

const app = express();

require("dotenv").config;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(auth);
app.use("/doctor", DoctorRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.log("Cannot Connect to Datatbase");
  }
});
