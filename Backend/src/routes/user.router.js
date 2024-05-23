const express = require('express')
const authRouter = express.Router()
const {getUser, createUser, logUser,getUsers} = require('../controllers/user.controller')

//Obtener Usuarios.
authRouter.get("/get", getUser)
authRouter.get("/getUsers", getUsers)
authRouter.post("/log", logUser)
authRouter.post("/register", createUser)
authRouter.post("/create", createUser)

module.exports = authRouter