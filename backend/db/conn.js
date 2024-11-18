const mongoose = require("mongoose");

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`DB is connected with ${mongoose.connection.host}`)

    } catch (e) {
        console.log("DB error ", e)
    }
}