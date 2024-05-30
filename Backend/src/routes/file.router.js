const express = require('express')
const fileRouter = express.Router()
const {getFiles, createFile} = require('../controllers/file.controller')
const {upload} = require('../middlewares/upload.file')

fileRouter.post("/upload",upload.single("filecontent"), createFile)

module.exports = fileRouter