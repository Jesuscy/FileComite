const mongoose = require('mongoose')
const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    catch(error){
        next(error)
    }
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

const login = async(req,res,next) =>{
    const mail = req.params.mail
    const password = req.params.password
    const user = await User.findOne({username: mail})

    const passwordMatch =  bcrypt.compare(password, user.password)
    if(!passwordMatch){
        console.log('Mail o password incorrecta.')
    }
}

