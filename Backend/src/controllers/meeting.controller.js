const Meeting = require('../models/meeting.model')
const HTTPSTATUSCODE = require('../utils/httpStatusCode')
const mongoose = require('mongoose')

// Obtener Meeting
const getMeeting = async (req, res, next) => {
    try {
        const { meetingId } = req.body
        const meeting = await Meeting.findById(meetingId)
        if (meeting) {
            return res.status(200).json(meeting)
        } else {
            return res.status(404).json({
                status: 404,
                message: "Meeting not found"
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Obtener todos los meetings
const getMeetings = async (req, res, next) => {
    try {
        const meetings = await Meeting.find()
        res.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            meetings: meetings
        })
    } catch (error) {
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Crear Meeting
const createMeeting = async (req, res, next) => {
    try {
        const { name, path, roles, users } = req.body
        const existingMeeting = await Meeting.findOne({ meetingName: name })
        if (existingMeeting) {
            return res.status(400).json({
                status: 400,
                message: "Meeting name already registered"
            })
        }
        const meeting = new Meeting({
            meetingName: name,
            meetingPath: path,
            meetingRoles: roles,
            meetingUsers: users
        })
        await meeting.save()
        res.status(201).json({
            status: 201,
            message: "Meeting successfully created",
            meeting: meeting
        })
    } catch (error) {
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Borrar meeting
const deleteMeeting = async (req, res, next) => {
    try {
        const { meetingId } = req.body
        const deletedMeeting = await Meeting.findByIdAndDelete(meetingId)
        if (deletedMeeting) {
            res.status(200).json({
                status: 200,
                message: "Meeting successfully deleted"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Meeting not found"
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Editar Meeting
const editMeeting = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedMeeting) {
            return res.status(404).json({ message: 'Meeting id not found' })
        }
        return res.status(200).json({ updatedMeeting })
    } catch (error) {
        next(error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Obtener meetings del user
const getUserMeetings = async (req, res, next) => {
    try {
        const { userId } = req.body
        const meetings = await Meeting.find({ 'meetingUsers.userId': userId })
        if (meetings.length > 0) {
            res.status(200).json({
                status: 200,
                message: "User Meetings",
                meetings: meetings
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "No meetings found for user"
            })
        }
    } catch (error) {
        next(error)
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Añadir user al meeting.
const addUserMeeting = async (req, res, next) => {
    try {
        const { meetingId, userId, roles } = req.body
        const meetingToMod = await Meeting.findById(meetingId)
        if (!meetingToMod) {
            return res.status(404).json({ message: 'Meeting id not found' })
        }
        const userExists = meetingToMod.meetingUsers.some(user => user.userId.toString() === userId)
        if (!userExists) {
            meetingToMod.meetingUsers.push({ userId, roles })
            await meetingToMod.save()
        }
        return res.status(200).json({ meeting: meetingToMod })
    } catch (error) {
        next(error)
        return res.status(500).json({ message: 'Error adding user to meeting', error })
    }
}

// Eliminar user de meeting.
const delUserMeeting = async (req, res, next) => {
    try {
        const { meetingId, userId } = req.body
        const meetingToMod = await Meeting.findById(meetingId)
        if (!meetingToMod) {
            return res.status(404).json({ message: 'Meeting id not found' })
        }
        meetingToMod.meetingUsers = meetingToMod.meetingUsers.filter(user => user.userId.toString() !== userId)
        await meetingToMod.save()
        return res.status(200).json({ meeting: meetingToMod })
    } catch (error) {
        next(error)
        return res.status(500).json({ message: 'Error deleting user from meeting', error })
    }
}

// Añadir un rol a usuario.
const addRoleToMeetingUser = async (req, res) => {
    try {
        const { meetingId, userId, rol } = req.body
        const meeting = await Meeting.findById(meetingId)
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' })
        }
        const user = meeting.meetingUsers.find(user => user.userId.toString() === userId)
        if (user) {
            user.roles.push(rol)
            await meeting.save()
            return res.status(200).json({ message: 'Role successfully added.' })
        } else {
            return res.status(404).json({ message: 'User not found in meeting' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error adding role', error })
    }
}

// Eliminar un rol de usuario.
const delRoleFromMeetingUser = async (req, res) => {
    try {
        const { meetingId, userId, rol } = req.body
        const meeting = await Meeting.findById(meetingId)
        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' })
        }
        const user = meeting.meetingUsers.find(user => user.userId.toString() === userId)
        if (user) {
            user.roles = user.roles.filter(role => role !== rol)
            await meeting.save()
            return res.status(200).json({ message: 'Role successfully deleted.' })
        } else {
            return res.status(404).json({ message: 'User not found in meeting' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting role', error })
    }
}

module.exports = { getMeeting, getMeetings, createMeeting, addUserMeeting, deleteMeeting, getUserMeetings, editMeeting, delUserMeeting, addRoleToMeetingUser, delRoleFromMeetingUser }