const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const { userRouter } = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);
/*
    in industry they to this as
    app.use("/api/v1/user", userRouter); or app.use("/api/v2/course", courseRouter);

    cause if they want to change some login they can just create another file and change the v1 to v2 it is far more easier and efficient then making a lot of confusing routes and if there is any update a new engineer is confused
*/


async function main(){
    //we should not put the mongoose url in the code like that we should use dotenv
    await mongoose.connect(process.env.mongoose_url);

    app.listen(3000, () => {
    console.log("listening at port 3000");
    });
}

main();




//I should put this mongoose.connect line before the app.listen because if we didn't start our db the backend will never start