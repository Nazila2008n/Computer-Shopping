
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/shop"  element={<Shop/>}/>
        <Route path="/log-in"  element={<Login/>}/>
        <Route path="/registration"  element={<Registration/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/*"  element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App
