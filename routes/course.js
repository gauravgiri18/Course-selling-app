const { Router } = require("express");


const courseRouter = Router();


courseRouter.get("/preview", (req, res) => {
    res.json({
        msg: "You are in course preview"
    });
});

courseRouter.post("/purchase", (req, res) => {
    res.json({
        msg: "You are in course purchase"
    });
});

module.exports = {
    courseRouter : courseRouter
}