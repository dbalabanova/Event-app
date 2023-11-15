import {Route, Routes} from 'react-router-dom'
import Home from 'pages/Home'
import EventDetailsPage from 'pages/EventDetailsPage'
import UserProfile from 'pages/UserProfile'
import Register from 'pages/Register'
import ProtectedRoute from 'routes/ProtectedRoute'
import Login from 'pages/Login'
import CreateEvent from 'pages/CreateEvent'
import PdfPage  from 'pages/PdfPage'
import NotFoundPage from 'pages/NotFoundPage'

const Router = () => {
  return <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>}></Route>
    <Route path="/event/:id" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>}></Route>
    <Route path="/user" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}></Route>
    <Route path="/pdf" element={<PdfPage />}></Route>
    <Route path="*" element={<NotFoundPage/>}></Route>
  </Routes>
}

export default Router