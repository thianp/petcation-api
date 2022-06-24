require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authenticate = require("./middlewares/authenticate");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const petRoute = require("./routes/petRoute");
const houseRoute = require("./routes/houseRoute");
const bookingRoute = require("./routes/bookingRoute");
const addressRoute = require("./routes/addressRoute");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);
app.use("/address", addressRoute);
app.use("/users", authenticate, userRoute);
app.use("/pets", authenticate, petRoute);
app.use("/houses", authenticate, houseRoute);
app.use("/bookings", authenticate, bookingRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8006;
app.listen(port, () => console.log("server is running on port: " + port));
