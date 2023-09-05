import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "../src/pages/Home"
import Navbar from "../src/components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import TodoDetails from "./components/TodoDetails"
import Calender from "./pages/Calender"
import Loading from "./pages/Loading"

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/details' element={<TodoDetails />} />
              <Route path='/calender' element={<Calender />} />
              <Route path='/loading' element={<Loading />} />
            </Routes>
          </div>
        </Router>

      </div>

    </>
  )
}

export default App
