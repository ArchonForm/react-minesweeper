import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Leaders } from './pages/Leaders/Leaders'
import { Navbar } from './components/Navbar/Navbar'

function App() {
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
