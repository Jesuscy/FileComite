const mongoose = require('mongoose')
const User = require('../models/user.model')
const Metting = require('../models/meeting.model')
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

//Funciones Crud



const createUser = async (req,res,next)=>{
    try{
        
        const user = new User(req.body)
        await user.save()

        res.status(201).json({
            status:201,
            message: HTTPSTATUSCODE[201],
            data: user
        })

    }
    catch(error){}
}

const getUser = async (req, res, next)=>{
    try{
        const mail = req.params.mail
        const user = await User.findOne({username: mail})
        if(user){
            res.status(201).json({
                status:201,
                message: HTTPSTATUSCODE[201],
                data: user
            })
        }

    }
    catch(error){
        next(error)
    }

}
