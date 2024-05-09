const express = require('express')
const authRouter = express.Router()
const {getUser, createUser, logUser} = require('../controllers/user.controller')

//Obtener Usuarios.
authRouter.post("/login")
authRouter.post("/register")

module.exports = authRouter