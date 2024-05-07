const express = require('express')
const fileRouter = express.Router

fileRouter.get("/download")
fileRouter.post("/upload")

module.exports = fileRouter