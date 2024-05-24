const Meeting = require('../models/meeting.model')
const bcrypt = require('bcrypt');
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

//Obtener Meeting
const getMeeting = async (req, res, next) => {
    try {
        const meetingName = req.body
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
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

    //Obtener todos los meetings
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
            next(error)
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }

    }


    //Crear Meeting
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
                message: "Meeting successfully created",
                meeting: meeting
            })
        }
        catch (error) {
            next(error)
            res.status(500).json({
                status: 500,
                message: "Internal server error"
            })
        }
    }


    //Borrar meeting
    const deleteMeeting = async (req, res, next) => {
        try {
            const meetingId = req.body

            const deletedMeeting = await Meeting.findByIdAndDelete(meetingId);

            if (deletedMeeting) {
                res.status(200).json({
                    status: 200,
                    message: "Meeting successfully deleted"
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Meeting not found"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    //Editar Meeting
    const editMeeting = async (req, res, next) => {
        try {
            const id = req.params.id
            const editMeeting = new Meeting(req.body)
            editMeeting._id = id
            const updatedMeeting = await Meeting.findByIdAndUpdate(id, editMeeting)
            if (!updatedMeeting) {
                return res.status(404).json({ message: 'Meeting id not found' })
            }
            return res.status(200).json({ updatedMeeting })
        }
        catch (error) {
            return res.status(500).json(error);

        }
    }

    //Obtener meetings del user
    const getUserMeetings = async (req, res, next) => {
        try {
            const userId = req.body
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
            next(error)
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: error.message
            })
        }
    }

    //Añadir user al meeting.
    const addUserMeeting = async (req, res, next) => {
        try {
            const { meetingId, userId } = req.body;
    
            const meetingToMod = await Meeting.findById(meetingId);
            if (!meetingToMod) {
                return res.status(404).json({ message: 'Meeting id not found' });
            }
    
            
            if (!meetingToMod.meetingUsers.includes(userId)) {
                meetingToMod.meetingUsers.push(userId);
            }
    
            await meetingToMod.save();
    
            return res.status(200).json({ meetingToMod });
        } catch (error) {
            return res.status(500).json({ message: 'Error adding user to meeting', error });
        }
    }

    //Eliminar user de meeting.
    const delUserMeeting = async (req, res, next) => {
        try {
            const { meetingId, userId } = req.body;
    
            const meetingToMod = await Meeting.findById(meetingId);
            if (!meetingToMod) {
                return res.status(404).json({ message: 'Meeting id not found' });
            }
    
            meetingToMod.meetingUsers = meetingToMod.meetingUsers.filter(user =>{user != userId})
    
            await meetingToMod.save();
    
            return res.status(200).json({ meetingToMod });
        } catch (error) {
            return res.status(500).json({ message: 'Error deleting user from meeting', error });
        }
    }


module.exports = {getMeeting, getMeetings, createMeeting, addUserMeeting ,deleteMeeting, getUserMeetings, editMeeting, delUserMeeting }
