const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel, purchasesModel, coursesModel } = require("../db");
const { z, email } = require("zod");
const { userMiddleware } = require("../middleware/user");
require("dotenv").config();

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
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = await userModel.findOne({
            email: email
        })
        if(!user){
            return res.status(403).json({
                error: "This email is not registered please signup"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        
        if(passwordMatch){
            const token = jwt.sign({
                id: user._id
            }, process.env.userSecretKey);

            res.setHeader('authorization', `Bearer ${token}`);

            res.json({
                token
            });
        } else {
            res.status(403).json({
                error: "Incorrect credentials"
            });
        }
    } catch(err) {
        console.log(err);
        res.status(502).json({
            error: "There is some error in signin :( Please try again later"
        });
    }

});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    try {

        const userId = req.userId;

        const purchases = await purchasesModel.find({
            userId
        })

        const courseData = await coursesModel.find({
            _id: { $in: purchases.map(x=> x.courseId)}
        })

        res.status(200).json({
            purchases,
            courseData
        })

    } catch(err){
        console.log(err);
        res.status(403). json ({
            error: "There is some error in to show your purchases the course"
        })
    }
});


module.exports = {
    userRouter: userRouter
}