require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./db/conn");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

//routes
app.use("/api/v1/user", require("./routes/user"));



//db
connectDB();

app.listen(process.env.PORT, () => console.log(`Server is running at ${process.env.PORT}`));
