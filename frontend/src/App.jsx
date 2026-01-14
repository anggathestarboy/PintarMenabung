import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLogin from './components/ProtectedLogin'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/login' element={ <ProtectedLogin> <Login/></ProtectedLogin> } />
        <Route path='/' element={<ProtectedRoute> <Overview/></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedLogin> <Register/></ProtectedLogin> } />
      </Routes>
    </BrowserRouter>
    
      
       
    </>
  )
}

export default App
