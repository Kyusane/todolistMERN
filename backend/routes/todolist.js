const express = require ('express')
const requireAuth  = require('../middleware/requireAuth')

const {
     getToDos,
     getToDo,
     createToDo,
     deleteToDo,
     updateToDo,
     getTodoDetails,
     postTodoDetails,
     updateTodoDetails
} = require('../contollers/todoController')

const router = express.Router()

//REQ AUTH
router.use(requireAuth)

//GET all todo
router.get('/' ,getToDos)

//GET a single todo 
router.get('/:id',getToDo)

//POST a new todo
router.post('/', createToDo)

//DELETED a todo
router.delete('/:id', deleteToDo)
//UPDATE a todo
router.patch('/:id', updateToDo)

//GET a todo details 
router.get('/details/:todo_id', getTodoDetails)

//POST a todo details
router.post('/details', postTodoDetails)

//UPDATE a todo details
router.patch('/details/:todo_id', updateTodoDetails)

module.exports = router