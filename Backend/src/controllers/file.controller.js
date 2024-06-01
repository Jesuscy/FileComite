const File = require("../models/file.model");
const HTTPSTATUSCODE = require('../utils/httpStatusCode');
const mongoose = require("mongoose");


const getFilesByMeeting = async (req,res) =>{
    try{
        const meetingId = req.body
        const files = await File.find({'meetingData.meetingId': meetingId})

        if (files.length === 0) {
            return res.status(404).json({ message: 'No files found for this meeting' });
        }

        return res.status(200).json({ files });

    }
    catch(error){
        res.status(500).json({message: 'Error retrieving files'})
    }
}

const createFile = async (req,res,next) =>{
    try{
        const file = new File(req.body)
        if(req.file){
            file.filepath = req.file.path
        }
        file.save()
        return res.status(201).json(file)
    }
    catch(error){
        return res.status(500).json({message: 'Error creating file'})

    }
}


module.exports = {getFilesByMeeting, createFile}