const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connection =  require("./connection");
const itemRouter = require("./Routers/itemRouter");
const userRouter =  require("./Routers/userRouter");
const stripeRouter = require("./Routers/stripeRouter");
const orderRouter = require("./Routers/orderRouter");


app.use(cors());
app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));
app.use("/",itemRouter);
app.use("/",userRouter);
app.use("/",stripeRouter);
app.use("/", orderRouter);


app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});