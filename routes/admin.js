const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { adminModel, coursesModel } = require("./../db");
require("dotenv").config();

const {adminMiddleware} = require("../middleware/admin");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    try {
        const requiredBody = z.object({
            email: z.string().email().min(8).max(100),
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

        const existingUser = await adminModel.findOne({
            email: email
        })

        if(existingUser){
            return res.status(403).json({
                error: "This email is already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        res.status(200).json({
            msg: "Successfully created an admin account"
        })

    } catch(err){
        res.status(503).json ({
            error: "There is some error in admin signup :("
        })
    }
});


adminRouter.post("/signin", async (req, res) => {

    try {
        const {email, password} = req.body;

        if(!email || !password){
                return res.status(400).json({ error: "Email and password are required." });
            }

        const user = await adminModel.findOne({
            email: email
        })

        if(!user){
            return res.status(404).json({
                error: "User with this email doesn't exist"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            const token = jwt.sign({
                id: user._id
            }, process.env.adminSecretKey);

            res.setHeader('authorization', `Bearer ${token}`);

            res.json({
                token
            })
        } else {
            res.status(404).json({
                error: "Incorrect password"
            })
        }
    } catch(err){
        res.status(502).json({
            error: "There is some error signin :("
        })
    }

    
});


adminRouter.post("/course",adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;

        const { title, description, imageURL, price} = req.body;

        const course = await coursesModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageURL,
            creatorId: adminId

        })

        res.json({
            message: "Course Created",
            courseId: course._id
        })



    } catch(err) {
        console.log(err);
        res.status(502).json ({
            error: "there is some error creating course"
        })
        
    }

});


adminRouter.put("/course", (req, res) => {

});


adminRouter.get("/course/bulk", (req, res) => {

});

module.exports = {
    adminRouter: adminRouter
}