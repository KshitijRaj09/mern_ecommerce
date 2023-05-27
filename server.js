require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const cors = require("cors");

const app = express();
const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT || 2000;

const allowedOrigin = process.env.CORS_ORIGIN.split(",").map(
  (origin) => origin
);
app.use(
  cors({
    origin: allowedOrigin,
  })
);

app.use(express.json());

app.use("/api", router.itemRouter);
app.use("/api", router.cartRouter);
app.use("/api", router.orderRouter);
app.use("/api", router.userRouter);

async function connectMongoDB() {
  try {
    const {connections} = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(
        `Server listening @ PORT ${PORT} && MongoDB running @ PORT ${connections[0].port})`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

app.use("/welcome", (req, res) => {
  console.log("allowed origin", allowedOrigin);
  res.send("API is running");
});

connectMongoDB();
