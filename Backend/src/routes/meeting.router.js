const express = require("express")
const meetingRouter = express.Router()
const {getMeeting, getMeetings, createMeeting, deleteMeeting, getUserMeetings, editMeeting, delUserMeeting } = require('../controllers/meeting.controller')

meetingRouter.get('/meeting',getMeeting)
meetingRouter.get('/meetings',getMeetings)
meetingRouter.get('/meetings/userId', getUserMeetings)
meetingRouter.post('/create', createMeeting)
meetingRouter.post('/delete/:id', deleteMeeting)
meetingRouter.post('/delete/user/:userId',delUserMeeting)
meetingRouter.put('/edit/:id',editMeeting)




module.exports = meetingRouter