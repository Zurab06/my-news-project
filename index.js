const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const userRoute  = require('./routes/user.route')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/auth',userRoute)


const {PORT,SERVER}= process.env

const server = async ()=>{
    try {
        await mongoose.connect(SERVER)

        app.listen(PORT,()=>{console.log('server has been started')})
    } catch (error) {
       console.log(`error: ${error.toString()}`);
    }
}
server()