const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

//Funciones Crud

const getUser = async (req, res, next) => {
    try {
        //Obtiene el usuario con el mail
        const mail = req.params.mail
        const user = await User.findOne({ username: mail })
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

const getUsers = async (req, res, next) => {
    try {
        //Obtengo todos los users
        const users = await User.find()
        if (users) {
            res.status(200).json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                users: users
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


const createUser = async (req, res, next) => {
  
    const mail = req.params.mail
    const password = req.params.password
    console.log(mail,password)
    try {
        //Obtengo el mail y password.
        const {mail, password} = req.body
        //Compruebo que no hayan usuarios con es mail.
        const existingUser = await User.findOne({ username: mail })

        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "Mail already registered"
            })
        }
        const salt = await bcrypt.genSalt(10);
        //Hasheo la password que guardo de BD.
        const hassedPassword = await bcrypt.hash(password, salt)

        //Pass the salt value as an argument to bcrypt.hash()
        const user = new User({
            username: mail,
            password: hassedPassword, // Store the hashed password
            salt: salt, // Store the salt value
            rol: [],
            meetings: []
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
        res.status(500).json({ message: 'Iternal server error.' });
    }
}
const deleteUser = async (req, res, next) => {
    const userId = req.params.userId
    const password = req.params.password
    //Obtengo user por id
    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({ message: "User not found." })
    }
    const isPassworValid = bcrypt.compare(password, user.password)

    if (!isPassworValid) {
        return res.status(401).json({ message: "Incorrect password" })
    }
    await User.findByIdAndDelete(userId)
    res.status(200).json({ message: "User succesfully deleted" })
}



module.exports = { getUser, getUsers, createUser, logUser }