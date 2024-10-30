import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import urlRoutes from './routes/urlsRoutes'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())

app.use('/shorten', urlRoutes)

const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(()=> console.log('Connected To DB'))
.catch((e)=> console.log('Mongo db connection error: ', e))


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}: http://localhost:3000`)
})

