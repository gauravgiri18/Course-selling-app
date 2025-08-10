const express = require("express");

const app = express();

const { userRouter } = require("./routes/user");
const {courseRouter} = require("./routes/course");


app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
/*
    in industry they to this as
    app.use("/api/v1/user", userRouter); or app.use("/api/v2/course", courseRouter);

    cause if they want to change some login they can just create another file and change the v1 to v2 it is far more easier and efficient then making a lot of confusing routes and if there is any update a new engineer is confused
*/







app.listen(3000, () => {
    console.log("listening at port 3000");
});