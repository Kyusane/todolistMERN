import { useState } from "react"
import { useTodosContext } from "../hooks/useTodoContext"
import { useAuthContext } from "../hooks/useAuthContext"

import Loader from "./Loader"


const TodoForm = () => {
     const { dispatch } = useTodosContext()
     const { user } = useAuthContext()

     const [title, setTitle] = useState("");
     const [date, setDate] = useState("")
     const [time, setTime] = useState("")
     const [error, setError] = useState(null)

     const [loading, setLoading] = useState(false)


     const submitHandler = async (e) => {

          setLoading(true)
          e.preventDefault();
          let todoInput = { title: title, date: date, time: time, done: false }

          const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist`, {
               method: 'POST',
               body: JSON.stringify(todoInput),
               headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("token")}`
               }
          })

          const json = await response.json()

          if (!response.ok) {
               setError(json.error)
          }
          if (response.ok) {
               setTitle('')
               setDate('')
               setTime('')
               setError(null)
               console.log('new todo added', json)
               dispatch({ type: 'CREATE_TODO', payload: json })
               setLoading(false)
          }

          console.log(todoInput)
     }

     return (
          <>
               <div className="form" >
                    {
                         loading ? <Loader /> :
                              (
                                   <form onSubmit={submitHandler}>
                                        <input type="text" className="formInput" value={title} required placeholder="Title" onChange={(e) => { setTitle(e.target.value) }}></input>
                                        <input type="date" className="formInput" value={date} required placeholder="Date" onChange={(e) => { setDate(e.target.value) }}></input>
                                        <input type="time" className="formInput" value={time} required placeholder="Time" onChange={(e) => { setTime(e.target.value) }}></input>
                                        <button type="submit" className="addtodo">Add Todo</button>
                                   </form>
                              )
                    }

               </div>



          </>
     )
}

export default TodoForm