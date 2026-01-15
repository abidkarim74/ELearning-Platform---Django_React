import './App.css'

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import TopHeader from './components/TopHeaderBar';
import ProtectedRoutes from './middleware/protectRoutes';
import GuestRoute from './middleware/guestRoutes';
import Profile from './pages/Profile';


function App() {
  return (
    <>
      <TopHeader></TopHeader>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home></Home></ProtectedRoutes>}></Route>

        <Route path='/profile' element={<ProtectedRoutes><Profile></Profile></ProtectedRoutes>}></Route>
        <Route path='/login' element={<GuestRoute><Login></Login></GuestRoute>}></Route>
        <Route path='/signup' element={<GuestRoute><Signup></Signup></GuestRoute>}></Route>
      </Routes>

      
    </>
  )
}

export default App
