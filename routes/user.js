const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { z, email } = require("zod");

const Router = express.Router();

//const {Router} = require("express") 

const userRouter = Router;




userRouter.post("/signup", async (req, res) => {

    try {
        
        const requiredBody = z.object({
            email: z.email().min(8).max(100),
            password: z.string().min(6).max(100),
            firstName: z.string().min(2).max(100),
            lastName: z.string().min(2).max(100)
        })  

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if(!parsedDataWithSuccess.success){
            res.status(400).json({
                msg: "Incorrect format",
                error: parsedDataWithSuccess.error
            })
            return;
        }

        const {email, password, firstName, lastName} = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 7); 

        
        
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.json({
            msg: "You have successfully created an account"
        });

    } catch(e) {
        res.status(502).json({
            msg: "There is some error in creating account"
        })
        console.log(e);
    }

    
});

userRouter.post("/signin", async (req, res) => {
    const {emain, password} = req.body;
    
    

});

userRouter.get("/purchases", (req, res) => {
    res.json({
        msg: "You are in user puchases"
    });
});


module.exports = {
    userRouter: userRouter
}