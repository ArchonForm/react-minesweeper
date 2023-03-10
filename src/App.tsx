import './App.scss'
import { useState } from 'react'
import { Home } from './pages/Home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Leaders } from './pages/Leaders/Leaders'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/leaders' element={<Leaders />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App
