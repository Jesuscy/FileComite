const express = require("express")
const meetingRouter = express.Router()

meetingRouter.get('/')
meetingRouter.post('/new')

module.exports = meetingRouter