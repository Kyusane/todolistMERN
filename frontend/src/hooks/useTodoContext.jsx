import { TodosContext } from "../context/todoContext";
import { useContext } from "react";

export const useTodosContext = () => {
     const context = useContext(TodosContext)

     if (!context) {
          throw Error('useTodosContext must be inside an TodoContextProvider')
     }

     return context
}