const userModel = require("../model/userSchema");
const cloudinary = require("../multer/cloudinaryConfig");

const fetchUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const gender = req.query.gender || "";
        const status = req.query.status || "";
        const sort = req.query.sort || "";
        const page = req.query.page || 1;
        const ITEM_PAGE = 4;
        let query = {
            fname: { $regex: search, $options: "i" }
        }
        if (gender !== "All") {
            query.gender = gender
        }

        if (status !== "All") {
            query.status = status
        }
        const skip = (page - 1) * ITEM_PAGE;
        const count = await userModel.countDocuments(query);
        const doc = await userModel.find(query)
            .sort({ createdAt: sort === "new" ? -1 : 1 })
            .limit(ITEM_PAGE)
            .skip(skip)

        const pageCount = Math.ceil(count / ITEM_PAGE) // how many page we get
        res.status(201).json({
            success: true,
            pagination: {
                pageCount
            },
            doc
        })

    } catch (e) {
        console.log("Feting-user error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}
const addUser = async (req, res) => {
    try {
        const preuser = await userModel.findOne({ email: req.body.email });
        if (preuser) {
            return res.status(401).json({
                success: false,
                message: "This user already exist !"
            })
        }
        const file = req.file;
        const upload = await cloudinary.uploader.upload(file.path, { folder: "FP" })
        const doc = await userModel.create({ ...req.body, img: { public_id: upload.public_id, url: upload.secure_url } });
        res.status(201).json({
            success: true,
            message: "user added successfully",
            doc
        })

    } catch (e) {
        console.log("user-added error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fname,
            lname,
            email,
            mobile,
            gender,
            location,
            status,
        } = req.body;
        const oldDoc = await userModel.findById(id);
        if (req.file) {
            await cloudinary.uploader.destroy(oldDoc.img.public_id);
            var newUplaod = await cloudinary.uploader.upload(req.file.path, { folder: "FP" });
        }

        if (oldDoc) {
            oldDoc.fname = fname
            oldDoc.lname = lname
            oldDoc.email = email
            oldDoc.mobile = mobile
            oldDoc.gender = gender
            oldDoc.location = location
            oldDoc.status = status
            oldDoc.img = {
                public_id: newUplaod ? newUplaod.public_id : oldDoc.img.public_id,
                url: newUplaod ? newUplaod.secure_url : oldDoc.img.url
            }

            await oldDoc.save();
        }


        res.status(201).json({
            success: true,
            message: "user updated successfully",
            doc: oldDoc
        })

    } catch (e) {
        console.log("user-updated error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id)
        res.status(201).json({
            success: true,
            message: "user deleted successfully",

        })

    } catch (e) {
        console.log("user-deleted error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const doc = await userModel.findByIdAndUpdate(id, { status }, { new: true });

        res.status(201).json({
            success: true,
            message: "user Status Updated successfully",
            doc
        })

    } catch (e) {
        console.log("user-status-updated error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}

const userDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const doc = await userModel.findById(id);

        res.status(201).json({
            success: true,
            message: "user Details successfully",
            doc
        })

    } catch (e) {
        console.log("user-details-updated error: ", e)
        res.status(501).json({
            success: false,
            error: "Internal Server Error",
            e
        })
    }
}

module.exports = {
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    userDetails,
    updateStatus
}
