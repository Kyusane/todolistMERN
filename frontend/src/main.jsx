import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodosContextProvider } from './context/todoContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
