const { inject ,errorHandler } = require("express-custom-error");
inject();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ origin: true }));

app.use("*", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

const { validateOrigin } = require("./middlewares");
app.use(validateOrigin);

const bodyParse = require("body-parser");

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use("*", (req, res, next) => {
    if (typeof req.body === "string") {
        req.body = JSON.parse(req.body);
    }
    next();
});

app.use("/", require("./routers"));

app.use(errorHandler());
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "La ruta no existe"
    })
});

module.exports = app;
