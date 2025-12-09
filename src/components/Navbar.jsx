import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import ThemeToggle from './ThemeToggle'

gsap.registerPlugin(ScrollTrigger)

const Navbar = ({ onMenuClick }) => {
  const navRef = useRef(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)

  useEffect(() => {
    const nav = navRef.current
    
    // Initial animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 2.5,
        ease: 'power3.out',
      }
    )

    // Scroll-based show/hide
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight // Height of hero section
      
      // Only apply hide/show behavior after scrolling past hero
      if (currentScrollY > heroHeight * 0.5) {
        if (currentScrollY > lastScrollY.current && !isHidden.current) {
          // Scrolling down - hide navbar
          gsap.to(nav, {
            y: -100,
            duration: 0.3,
            ease: 'power2.out',
          })
          isHidden.current = true
        } else if (currentScrollY < lastScrollY.current && isHidden.current) {
          // Scrolling up - show navbar
          gsap.to(nav, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
          isHidden.current = false
        }
      } else {
        // In hero section - always show navbar
        if (isHidden.current) {
          gsap.to(nav, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
          isHidden.current = false
        }
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 flex items-center justify-between bg-transparent backdrop-blur-sm"
    >
      <div className="text-xl md:text-2xl font-bold text-text-dark dark:text-text-light">
        Doptic
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <MagneticButton
          onClick={onMenuClick}
          className="bg-primary-orange text-white px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-opacity-90 transition-all"
        >
          <span>Menu</span>
          <div className="flex flex-col gap-[3px]">
            <span className="w-4 h-0.5 bg-white"></span>
            <span className="w-4 h-0.5 bg-white"></span>
            <span className="w-4 h-0.5 bg-white"></span>
          </div>
        </MagneticButton>
      </div>
    </nav>
  )
}

export default Navbar
