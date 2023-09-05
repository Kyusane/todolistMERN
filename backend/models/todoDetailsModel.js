const mongoose = require("mongoose")

const Schema = mongoose.Schema

const todoDetailsSchema = new Schema ({
     todo_id : {
          type : String,
          required : true
     },
     details : {
          type : String
     }
})

module.exports = mongoose.model ("TodoDetails" , todoDetailsSchema)