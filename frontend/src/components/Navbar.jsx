import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useTodosContext } from '../hooks/useTodoContext'

const Navbar = () => {

     const navigate = useNavigate()
     const { dispatchAuth } = useAuthContext()
     const user = localStorage.getItem("token")
     const { dispatch } = useTodosContext()

     const userLogout = () => {

          dispatchAuth({ type: 'LOGOUT' })
          dispatch({ type: 'RESET_TODO' })
          localStorage.removeItem("token")
          localStorage.removeItem("email")
          navigate('/login')
     }

     return (
          <header>
               <div className="container">
                    <nav>
                         <Link to={user ? '/' : '#'}> <h1>ToDoList</h1></Link>
                         {user ?
                              <>
                                   <div>
                                        <h3>{localStorage.getItem("email")}</h3>
                                        <button onClick={userLogout}>Logout</button>
                                   </div>

                              </>
                              :
                              <div>
                                   <Link to="/login">Login</Link>
                                   <Link to="/signup">Signup</Link>
                              </div>
                         }
                    </nav>
               </div>
          </header>
     )
}

export default Navbar

