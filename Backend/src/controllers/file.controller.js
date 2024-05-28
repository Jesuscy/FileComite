const File = require("../models/file.model");
const HTTPSTATUSCODE = require('../utils/httpStatusCode');
const mongoose = require("mongoose");

//Grid herramienta utilizada para descargar los ficheros guardados en la base de datos.
const Grid = require("gridfs-stream");
//Obtengo la conexión con la base de datos.
const conn = mongoose.connection;

const getFiles = async (req,res,next)=>{
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