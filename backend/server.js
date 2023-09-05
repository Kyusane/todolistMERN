require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todolist')
const userRoutes = require('./routes/user')

const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req,res,next)=>{
     console.log(req.path,req.method)
     next()
})

app.use('/api/todolist', todoRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
     app.listen(process.env.PORT,()=>{
          console.log("Server is running on port", process.env.PORT)
     })
})
.catch((error)=>{
     console.log(error)
})

