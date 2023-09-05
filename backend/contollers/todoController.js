const Todo = require('../models/toDoModel')
const TodoDetails = require('../models/todoDetailsModel')
const mongoose = require('mongoose')

//GET all todo
const getToDos = async (req,res) =>{
     const user_id = req.user._id
     const todos = await Todo.find({user_id}).sort({createdAt:-1})
     res.status(200).json(todos)
}
//GET a todo
const getToDo = async (req,res) =>{
     const {id} = req.params

     if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error : 'No such todo'})
     }

     const todo = await Todo.findById(id)
     if(!todo){
          return res.status(400).json({error : 'No such todo'})
     }
     res.status(200).json(todo)
}
//POST a new todo
const createToDo = async (req,res) =>{
     const {title,date,time,done} = req.body

     try{
          const user_id = req.user._id
          const todo = await Todo.create({title,date,time,done, user_id})
          res.status(200).json(todo)
     }catch(error){
          res.status(400).json({error : error.message})
     }
}

//DELETE a todo
const deleteToDo = async (req,res) =>{
     const {id} =req.params

     if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error : 'No such todo'})
     }

     const todo = await Todo.findOneAndDelete({_id: id })

     if(!todo){
          return res.status(400).json({error : 'No such todo'})
     }

     res.status(200).json(todo)

}

//UPDATE a todo
const updateToDo = async (req,res) =>{
     const {id} = req.params

     if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error : 'No such todo'})
     }

     const todo = await Todo.findOneAndUpdate({_id : id},{
          ...req.body
     })

     if(!todo){
          return res.status(400).json({error : 'No such todo'})
     }

     res.status(200).json(todo)

}


// GET todo details
const getTodoDetails = async (req,res) =>{
     const {todo_id} = req.params

     if(!mongoose.Types.ObjectId.isValid(todo_id)){
          return res.status(400).json({error : 'No such todo details'})
     }

     const todoDetails = await TodoDetails.findOne({todo_id : todo_id})

     if(!todoDetails){
          return res.status(400).json({error : 'No such todo details'})
     }
     res.status(200).json(todoDetails)
}

//POST todo details

const postTodoDetails  = async (req,res) =>{

     const {todo_id, details} = req.body

     if(!mongoose.Types.ObjectId.isValid(todo_id)){
          return res.status(400).json({error : 'No valid id'})
     }
     const todoDetails = await TodoDetails.create({todo_id : todo_id , details : details})

     if(!todoDetails){
          return res.status(400).json({error : "Failed add todo details"})
     }

     res.status(200).json(todoDetails)

}

//UPDATE todo details
const updateTodoDetails = async (req,res) =>{
     const {todo_id} = req.params


     if(!mongoose.Types.ObjectId.isValid(todo_id)){
          return res.status(400).json({error : 'No such todo'})
     }

     const todo = await TodoDetails.findOneAndUpdate({todo_id : todo_id},{
          ...req.body
     })

     if(!todo){
          return res.status(400).json({error : 'No such todo'})
     }

     res.status(200).json(todo)

}


module.exports = {
     getToDos,
     getToDo,
     createToDo,
     deleteToDo,
     updateToDo,
     getTodoDetails,
     postTodoDetails,
     updateTodoDetails
}