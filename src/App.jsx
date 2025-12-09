import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import NavMenu from './components/NavMenu'
import Hero from './pages/Hero'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Blog from './pages/Blog'

// Home page with all sections
const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Blog />
    </>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <CustomCursor />
      {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      <div className={`main-content ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar onMenuClick={() => setIsMenuOpen(true)} />
        <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </>
  )
}

export default App