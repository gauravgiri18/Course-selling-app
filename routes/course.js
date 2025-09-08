const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchasesModel, coursesModel } = require("../db");


const courseRouter = Router();


courseRouter.get("/preview",  async(req, res) => {
    try {
        const courses = await coursesModel.find({});

        res.json({
            courses
        })
    } catch(err){
        console.log(err);
        res.status(403). json ({
            error: "There is some error in previewing the course"
        })
    }
    
});

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.userId;

        if (!courseId) {
            return res.status(400).json({ error: "courseId is required" });
        }

        // Ensure the course exists
        const course = await coursesModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Prevent duplicate purchase by same user
        const existing = await purchasesModel.findOne({ courseId: courseId, userId: userId });
        if (existing) {
            return res.status(409).json({ error: "Course already purchased" });
        }

        await purchasesModel.create({
            courseId: [courseId],
            userId: [userId]
        });

        res.status(200).json({ msg: "The course is successfully bought" });
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: "There is some error in buying the course" });
    }
});

module.exports = {
    courseRouter : courseRouter
}