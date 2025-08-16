const express = require("express");
const { userModel } = require("../db");

const Router = express.Router();

//const {Router} = require("express") 

const userRouter = Router;


userRouter.post("/signup", (req, res) => {
    const { email, password , firstName, lastName } = req.body;

    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        msg: "signup successfull"
    })
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