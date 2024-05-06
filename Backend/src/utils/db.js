const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.MONGODB_URI

const connect = async () =>{
    try{
        console.log(DB_URL)
        const db = await mongoose.connect(DB_URL)
        const {name, host} = db.connection
        console.log(`Conectado a la base de datos ${name}, host: ${host}`)

        
    }catch(error){
        console.log(`error ${error}`)
    }
}
module.exports = {connect}