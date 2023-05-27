require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/index");

const app = express();
const mongoURI = process.env.mongoURI;
const PORT = process.env.PORT || 2000;

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

    app.get("/", (req, res) => {
      res.send("API is running");
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

connectMongoDB();
