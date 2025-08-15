const mongoose = require("mongoose");



const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const AdminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});

const CourseSchema = new Schema({
    email: {type: String, unique: true},
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {type: ObjectId, ref: "admin"}
});

const PurchasesSchema = new Schema({
    courseId: [{type: ObjectId, ref: "course"}],
    userId: [{type: ObjectId, ref: "user"}]
});


const userModel = mongoose.model("user", UserSchema);
const adminModel = mongoose.model("admin", AdminSchema);
const coursesModel = mongoose.model("course", CourseSchema);
const purchasesModel = mongoose.model("purchases", PurchasesSchema);

module.exports = {
    userModel,
    adminModel,
    coursesModel,
    purchasesModel
}