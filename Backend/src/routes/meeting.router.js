const express = require("express")
const meetingRouter = express.Router()
const {getMeeting, getMeetings, createMeeting, addUserMeeting, deleteMeeting, getUserMeetings, editMeeting, delUserMeeting } = require('../controllers/meeting.controller')

meetingRouter.get('/meeting',getMeeting)
meetingRouter.get('/meetings',getMeetings)
meetingRouter.get('/meetings/userId', getUserMeetings)
meetingRouter.post('/create', createMeeting)
meetingRouter.post('/add/user', addUserMeeting)
meetingRouter.post('/delete/user',delUserMeeting)
meetingRouter.post('/delete', deleteMeeting)
meetingRouter.put('/edit',editMeeting)




module.exports = meetingRouter