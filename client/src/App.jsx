import './App.css'
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom'
import Login from './layouts/loginPage/Login'
import HomePage from './layouts/homePage/HomePage'
import Signup from './layouts/signupPage/Signup'

import ForgotPw from './layouts/forgotpwPage/ForgotPw'
import ResetPw from './layouts/resetPwPage/ResetPw'
import Admin from './layouts/adminPage/Admin'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpw' element={<ForgotPw/>} />
        <Route path="/reset-password/:token" element={<ResetPw />} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/admin' element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
