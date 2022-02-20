const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
// const Router = require('./routes/itemRouter');
const router = require("./routes/index");


const app = express();
const mongoURI = config.get('mongoURI');
const PORT = process.env.PORT || 2000;

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('ui_reactjs/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "ui_reactjs", "build", "index.html"));
    });
}

app.use("/api", router.itemRouter);
app.use("/api", router.cartRouter);
app.use("/api", router.orderRouter);
app.use("/api", router.userRouter);

async function connectMongoDB() {
    try {
        const { connections } = await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(`Server listening @ PORT ${PORT} && MongoDB running @ PORT ${connections[0].port}`)
        })
    }
    catch (error) {
        console.log(error);
    }
}

connectMongoDB();



