const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const userRoute  = require('./routes/user.route')
const newsRoute = require('./routes/news.route')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/auth',userRoute)
app.use('/news',newsRoute)


const {PORT,SERVER}= process.env

const server = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://gaunt0066:Panzerkampf06@cluster0.6m4r7dq.mongodb.net/authorization?retryWrites=true&w=majority')

        app.listen(3001,()=>{console.log('server has been started')})
    } catch (error) {
       console.log(`error: ${error.toString()}`);
    }
}
server()