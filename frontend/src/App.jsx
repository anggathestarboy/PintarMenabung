import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Overview/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
    
      
       
    </>
  )
}

export default App
