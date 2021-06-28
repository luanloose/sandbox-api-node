const express = require("express");
const app = express();

const sodium = require("./modules/sodium");

app.use("/sodium", sodium);

module.exports = app;
