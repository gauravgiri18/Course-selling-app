const { Router } = require("express");
const { adminModel } = require("./../db");

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {

});


adminRouter.post("/signin", (req, res) => {
    
});


adminRouter.post("/", (req, res) => {

});


adminRouter.put("/", (req, res) => {

});


adminRouter.get("/bulk", (req, res) => {

});

module.exports = {
    adminRouter: adminRouter
}