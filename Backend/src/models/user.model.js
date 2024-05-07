const mongoose = require('mongoose')

const userSchema = new moongose.Schema(
    {
        
        username: {
         type : String, 
         unique: true,
         required: true
        },
        password:{
            type:String,
            required:true
        },
        rol: String

    })
    module.exports = {userSchema}