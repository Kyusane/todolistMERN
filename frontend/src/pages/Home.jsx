import {useEffect, useState } from 'react'
import {useTodosContext} from "../hooks/useTodoContext"
import {useNavigate} from "react-router-dom"


import TodoCard from '../components/TodoCard'
import TodoForm from '../components/TodoForm'
import Loading from '../pages/Loading'

const Home = () =>{
     const{todos,dispatch} = useTodosContext()
     const navigate = useNavigate()
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const fetchTodos = async () =>{
               const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/todolist`,{
                    method : "GET",
                    headers : {
                         "Content-Type" : "application/json",
                         "authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
               })
               const json = await response.json()

               if(response.ok){
                    dispatch({type : 'SET_TODOS' , payload : json})
                    setLoading(false)
               }

          }

          if(!localStorage.getItem("token")){
               navigate('/login')
          }else{
               fetchTodos()
          }
             
     },[])

     return(
          <>
               {
                    loading?<Loading/> :
                    (
                         <div className = "home">
                              <div className="todos">
                                   {todos && todos.map((todo) =>(
                                   <TodoCard key={todo._id} todo={todo}/>
                                   ))}
                              </div>
                              <TodoForm/>
                         </div>
                    )
               }
               
               
          </>
     )
}

export default Home