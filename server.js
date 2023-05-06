require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");

//route paths
const wildlifeObservationRouter = require("./routes/wildlifeObservationRoute");

const port = process.env.PORT || 8000;
const app = express();

// Call the connectDB function to connect to the database
connectDB();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/get", (req, res) => {
  res.send("Safe Pass");
});

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/wildlife-observations", wildlifeObservationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
