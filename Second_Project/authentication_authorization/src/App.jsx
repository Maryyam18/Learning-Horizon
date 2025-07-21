import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import UserContext from './context/UserContext.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
