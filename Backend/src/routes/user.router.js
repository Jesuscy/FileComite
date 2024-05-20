const express = require('express')
const authRouter = express.Router()
const {getUser, createUser, logUser} = require('../controllers/user.controller')

//Obtener Usuarios.
authRouter.get("/get", getUser)
authRouter.post("/log", logUser)
authRouter.post("/register", createUser)

module.exports = authRouter