const express = require("express");

const Router = express.Router();

//const {Router} = require("express") 

const userRouter = Router;

userRouter.post("/signup", (req, res) => {
    res.json({
        msg: "You are in user signup"
    });
});

userRouter.post("/signin", (req, res) => {
    res.json({
        msg: "You are in user signin"
    });
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        msg: "You are in user puchases"
    });
});


module.exports = {
    userRouter: userRouter
}