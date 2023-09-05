import { createContext, useReducer } from "react"

export const TodosContext = createContext()

export const todosReducer = (state, action) => {
     switch(action.type){
          case 'SET_TODOS':
               return {
                    todos : action.payload,
                    todo_click : state.todo_click
               }
          case 'CREATE_TODO':
               return{
                    todos : [action.payload,...state.todos],
                    todo_click : null
               }
          case 'DELETE_TODO' :
               return{
                    todos : state.todos.filter((t) => t._id !== action.payload._id),
                    todo_click : null
               } 
          case 'UPDATE_TODO':
               return {
                    todos : [ action.payload ,...state.todos.filter(t => t._id !== action.payload._id)],
                    todo_click : null
               }
          case 'CLICK_TODO':
               return {
                    todos : state.todos,
                    todo_click : action.payload
               }
          case 'RESET_TODO' :
               return {
                    todos : null,
                    todo_click : null
               }
          default:
               return state
     }
}

export const TodosContextProvider = ({children}) => {

     const [state, dispatch] = useReducer(todosReducer,{
          todos : null,
          todo_click : null
     })

     return(
          <TodosContext.Provider value={{ ...state, dispatch }}>
               { children }
          </TodosContext.Provider>
     )
}