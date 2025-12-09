import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const cursorTextRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const [cursorText, setCursorText] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorTextElement = cursorTextRef.current

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const updateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x
      const dy = mousePos.current.y - cursorPos.current.y

      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15

      if (cursor) {
        cursor.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`
      }

      requestAnimationFrame(updateCursor)
    }

    const handleMouseEnter = (e) => {
      setIsHovering(true)
      const target = e.target
      
      // Check for data-cursor-text attribute
      const customText = target.getAttribute('data-cursor-text')
      if (customText) {
        setCursorText(customText)
      }

      gsap.to(cursor.querySelector('.cursor-svg'), {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText('')
      
      gsap.to(cursor.querySelector('.cursor-svg'), {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Detect scroll context
    const handleScroll = () => {
      if (!isHovering) {
        const scrollHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY
        const clientHeight = window.innerHeight
        
        // Check if there's vertical scroll available
        if (scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 100) {
          setCursorText('Scroll Down')
        } else if (scrollTop > 100) {
          setCursorText('')
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', handleScroll)
    updateCursor()

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Add scroll context detection for horizontal scroll sections
    const horizontalSections = document.querySelectorAll('[data-horizontal-scroll]')
    horizontalSections.forEach((section) => {
      section.addEventListener('mouseenter', () => {
        if (!isHovering) {
          setCursorText('Scroll Sideways')
        }
      })
      section.addEventListener('mouseleave', () => {
        if (!isHovering) {
          setCursorText('')
        }
      })
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', handleScroll)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isHovering])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <svg className="cursor-svg" width="32" height="32" viewBox="0 0 32 32">
          <circle 
            cx="16" 
            cy="16" 
            r="14" 
            fill="none" 
            stroke="#FF6B4A" 
            strokeWidth="1"
            className="transition-all duration-300"
          />
          <circle 
            cx="16" 
            cy="16" 
            r="4" 
            fill="#FF6B4A"
            className="transition-all duration-300"
          />
        </svg>
      </div>
      
      {cursorText && (
        <div
          ref={cursorTextRef}
          className="fixed pointer-events-none z-[9998] bg-primary-orange text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-opacity duration-300"
          style={{
            left: `${mousePos.current.x}px`,
            top: `${mousePos.current.y - 40}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  )
}

export default CustomCursor
