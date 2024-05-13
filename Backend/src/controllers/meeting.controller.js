const Meeting = require('../models/meeting.model')
const bcrypt = require('bcrypt');
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

const getMeeting = async (req, res, next) => {
    try {
        const meetingName = req.params.name
        const meeting = await Meeting.findOne({ meetingName: meetingName })
        if (meeting) {
            res.status(200).json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                meeting: meeting
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }

    const getMeetings = async (req, res, next) => {
        try {
            const meetings = await Meeting.find()
            if (meetings) {
                res.status(200).json({
                    status: 200,
                    message: HTTPSTATUSCODE[200],
                    meeting: meetings
                })
            }
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }

    }

    const createMeeting = async (req, res, next) => {
        try {
            const { name, path, roles, users } = req.body
            const existingMeeting = await Meeting.find({ meetingName: name })
            if (existingMeeting) {
                return res.status(400).json({
                    status: 400,
                    message: "Meeting name already registered"
                })
            }
            const meeting = new Meeting({
                meetingName: name,
                //meetingPath:
                meetingRoles: roles,
                meetingUser: users
            })
            meeting.save()
            res.status(201).json({
                status: 201,
                message: "Meeting sucessfully created",
                meeting: meeting
            })
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal server error"
            })
        }
    }


    const getUserMeetings = async (req, res, next) => {
        try {
            const userId = req.params.userId
            const meetings = await Meeting.find({ meetingUsers: userId })
            if (meetings) {
                res.status(200).json({
                    status: 200,
                    message: "User Meetings",
                    meetings: meetings
                })
            }
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }
    }
}
