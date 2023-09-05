import { useState, useEffect } from "react"
import { useNavigate, useNavigationType } from "react-router-dom"
import { useTodosContext } from "../hooks/useTodoContext"


const TodoDetails = () => {

     const { todo_click } = useTodosContext()

     const token = localStorage.getItem("token")

     const [detailsDefault, setDetailsDefault] = useState()
     const [newDetails, setNewDetails] = useState()
     const [edit, setEdit] = useState(false)
     const [loading, setLoading] = useState(true)

     const navigate = useNavigate()

     useEffect(() => {

          if (!localStorage.getItem("token")) {
               navigate('/login')
          }
          if (!todo_click) {
               navigate('/')
          }

          const getTodoDetails = async () => {
               const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/details/${todo_click.todo_id}`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                         "authorization": `Bearer ${token}`
                    }
               })

               const json = await response.json()
               setDetailsDefault(json.details)
               setNewDetails(json.details)
          }

          getTodoDetails()
          setLoading(false)
     }, [])

     const addTodoDetails = async () => {

          let details = { todo_id: todo_click.todo_id, details: newDetails }

          const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/details`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
               },
               body: JSON.stringify(details)
          })

          const json = response.json()
          console.log(json)
     }

     const updateTodoDetails = async () => {

          let newDetail = { todo_id: todo_click.todo_id, details: newDetails }

          const response = fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/details/${todo_click.todo_id}`, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
               },
               body: JSON.stringify(newDetail)
          })

     }

     const click = () => {
          edit ? setEdit(false) : setEdit(true)
     }

     const detailsChangeHandler = (e) => {
          setNewDetails(e.target.value)

     }

     const doneHandler = async (e) => {
          e.preventDefault()

          const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/details/${todo_click.todo_id}`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
               }
          })

          !response.ok ? addTodoDetails() : updateTodoDetails()

          setEdit(false)

     }

     return (
          <>
               {
                    !loading ?

                         (<div className="todoDetails">
                              <span>
                                   <h3>{todo_click.title}</h3>
                                   {!edit ? (
                                        <div className="detailsButton">
                                             <button onClick={click} >Edit</button>
                                        </div>
                                   )
                                        : (
                                             <div className="detailsButton"><button onClick={doneHandler}>Done</button></div>
                                        )}

                              </span>
                              {
                                   !edit ?
                                        (
                                             <div className="todo">
                                                  <pre>{newDetails}</pre>
                                             </div>
                                        )
                                        :
                                        (
                                             <form>
                                                  <textarea
                                                       defaultValue={newDetails}
                                                       onChange={detailsChangeHandler}
                                                  >
                                                  </textarea>
                                             </form>
                                        )
                              }
                    
                         </div>)
                         : null
               }


          </>
     )
}

export default TodoDetails
