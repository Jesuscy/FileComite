const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema(
    {
        filename:{
            type: String,
            required: true
        },
        path:{
            type: String,
            required: true,
            unique: true
        },
        rol:{ 
            type: String,
            required: true,
            unique: false


        }

    }
)