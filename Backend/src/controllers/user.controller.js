const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

//Funciones Crud

const getUser = async (req, res, next) => {
    try {
        //Obtiene el usuario con el mail
        const mail = req.params.mail
        const user = await User.findOne({username: mail})
        if (user) {
            res.status(201).json({
                status: 201,
                message: HTTPSTATUSCODE[201],
                user: user
            })
        }

    }
    catch (error) {
        next(error)
    }

}

const createUser = async (req, res, next) => {
    try {
        //Obtengo el mail y password del body.
        const {mail, password} = req.body
        //Compruebo que no hayan usuarios con es mail.
        const existingUser = new User.findOne({ username: mail})

        if(existingUser){
            return res.status(400).json({
                status:400,
                message:"Mail already registered" 
            })
        }
        //Creo el user con los datos introducidos y lo guardo.
        const user = new User({
            username: mail,
            password : password,
            rol:[],
            meetings:[]
        })
        await user.save()
        //Devuelvo el user creado
        res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            user: user
        })

    }
    catch (error) {
        next(error)
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}



const logUser = async (req, res, next) => {
    try {
        //Obtengo Mail y Password 
        const mail = req.params.mail
        const password = req.params.password
        //Busco user en BD 
        const user = await User.findOne({ username: mail })

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "User not found"
            })
        }
        //Comparo la password con la de la BD
        const passwordMatch = bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            console.log('Mail o password incorrecta.')
        }
        //Genero el token y lo devuelvo en el json al forntend.
        const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });

        //Devulevo el user.
        res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            user: user,
            token: token
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

module.exports = { getUser, createUser, logUser }