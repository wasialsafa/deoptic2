import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import NavMenu from './components/NavMenu'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Blog from './components/Blog'

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
        <Hero />
        <About />
        <Projects />
        <Services />
        <Blog />
      </div>
    </>
  )
}

export default App
