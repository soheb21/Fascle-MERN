const express = require("express");
const { fetchUsers, addUser, updateUser, deleteUser, userDetails, updateStatus } = require("../controller/userCtr");
const uploader = require("../multer/multerConfig");
const router = express.Router();

router.get("/", fetchUsers)
    .post("/add-user", uploader.single('img'), addUser)
    .put("/update/:id", uploader.single('img'), updateUser)
    .delete('/delete/:id', deleteUser)
    .get("/user-detail/:id", userDetails)
    .put("/status/:id", updateStatus)


module.exports = router;