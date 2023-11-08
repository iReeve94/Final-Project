const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connection =  require("./connection");
const itemRouter = require("./Routers/itemRouter");
const userRouter =  require("./Routers/userRouter");
//const adminRouter = require("./Routers/adminRouter");



app.use(express.json());
app.use(cors());
app.use("/",itemRouter);
app.use("/",userRouter);
//app.use("/admins",adminRouter);

app.listen(port, () => {
    console.log(`app is listening at port ${port}`);
});