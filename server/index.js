require("dotenv").config();
const path = require('path');
const express = require("express");
const sequelize = require("./db");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const models = require('./models/index');
const router = require('./routers/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler)

app.get("/", (req, res) => {
    res.status(200).json({message: 'ok'});
})

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log("server on port - " + PORT));
    } catch (e) {
        console.log(e);
    }
}

start();

