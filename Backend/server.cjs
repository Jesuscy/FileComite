const express = require('express');
const mongoose = require('mongoose');
const fileRouter = require('./src/routes/file.router')
const authRouter = require('./src/routes/auth.router')
const meetingRouter = require('./src/routes/meeting.router')
const {connect} = require('./src/utils/db')

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/auth', authRouter);
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