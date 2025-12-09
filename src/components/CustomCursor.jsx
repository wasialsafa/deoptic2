import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current

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

    const handleMouseEnter = () => {
      gsap.to(cursor.querySelector('.cursor-svg'), {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursor.querySelector('.cursor-svg'), {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    updateCursor()

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <svg className="cursor-svg" width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#FF4920" strokeWidth="1" />
        <circle cx="16" cy="16" r="4" fill="#FF4920" />
      </svg>
    </div>
  )
}

export default CustomCursor
