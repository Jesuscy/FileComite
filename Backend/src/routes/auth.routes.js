const express = require('express')
const authRouter = express.Router

//Obtener Usuarios.
authRouter.post("/login")
authRouter.post("/register")

module.exports = authRouter