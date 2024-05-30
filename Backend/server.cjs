const express = require('express');
const mongoose = require('mongoose');
const fileRouter = require('./src/routes/file.router')
const authRouter = require('./src/routes/user.router')
const meetingRouter = require('./src/routes/meeting.router')
const cloudinary  = require('cloudinary').v2
const {connect} = require('./src/utils/db')

require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });


const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/user', authRouter);
app.use('/file', fileRouter);
app.use('/meeting', meetingRouter)

app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to my server',
        app: 'My App'
    });
});
connect();
// Start server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));