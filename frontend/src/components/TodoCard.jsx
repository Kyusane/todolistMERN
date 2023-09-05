import { useTodosContext } from "../hooks/useTodoContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"


const TodoCard = ({ todo }) => {

     const { dispatch } = useTodosContext()
     const { user } = useAuthContext()
     let newData

     const navigate = useNavigate()
     
     const todoUpdate = async (e) => {
          if (!todo.done) {
               newData = { done: true };
          } else {
               newData = { done: false }
          }

          const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/${todo._id}`, {
               method: 'PATCH',
               body: JSON.stringify(newData),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
               }
          })
          const json = await response.json()

          if (response.ok) {
               dispatch({ type: "UPDATE_TODO", payload: json })
          }
     }

     const todoDelete = async () => {
          const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist/${todo._id}`, {
               method: 'DELETE',
               headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
               }
          })
          const json = await response.json()

          if (response.ok) {
               dispatch({ type: 'DELETE_TODO', payload: json })
          }
     }

     const todoDetailHandler = (e) => {
          console.log(e.target.localName)
          if (!(e.target.localName == "button")) {
               sessionStorage.setItem("click_todo_id", todo._id)
               let todoClick = { title: todo.title, todo_id: todo._id }
               navigate('/details')
               dispatch({ type: "CLICK_TODO", payload: todoClick })
          }

     }

     return (
          <>
               <div className={todo.done ? "todo done" : "todo"} onClick={todoDetailHandler}>
                    <h2>{todo.title}</h2>
                    <p><strong>Date : </strong>{todo.date}</p>
                    <p><strong>Time : </strong> {todo.time}</p>
                    <span>
                         <button className ="btn-card"onClick={todoDelete} id={todo._id}>Delete</button>
                         {/* <button className ="btn-card" onClick={todoUpdate} id={todo._id}>Done</button> */}
                    </span>
               </div>
          </>
     )
}

export default TodoCard