import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import urlRoutes from './routes/urlsRoutes'

dotenv.config()

const port = parseInt(process.env.PORT || '8080')
const app = express()
app.use(express.json())
app.use(cors())

app.use('/shorten', urlRoutes)

const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(()=> console.log('Connected To DB'))
.catch((e)=> console.log('Mongo db connection error: ', e))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});

