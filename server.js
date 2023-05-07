const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const errorHandler = require("./middleware/error");

//route paths
const wildlifeObservationRoute = require("./routes/wildlifeObservationRoute");
const bannerRoute = require("./routes/bannerRoute");
const userRoute = require("./routes/userRoute");

// Call the connectDB function to connect to the database
connectDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  })
);
app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded());

app.get("/get", (req, res) => {
  res.send("Safe Pass");
});

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

//Routes middleware
app.use("/wildlife-observations", wildlifeObservationRoute);
app.use("/banners", bannerRoute);
app.use("/user", userRoute);

//Error Middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
