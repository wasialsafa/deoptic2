import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowDown } from 'react-icons/fi'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const desktopImageRef = useRef(null)
  const badgeRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'An agency defining style and digital culture.'

  useEffect(() => {
    // Typewriter effect
    let currentIndex = 0
    const typewriterDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
      return () => clearInterval(typeInterval)
    }, 3000)

    const headline = headlineRef.current
    const subtext = subtextRef.current
    const cta = ctaRef.current
    const image = imageRef.current
    const desktopImage = desktopImageRef.current
    const badge = badgeRef.current

    // Subtext animation
    gsap.fromTo(
      subtext,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 3.5,
        ease: 'power3.out',
      }
    )

    // CTA animation
    gsap.fromTo(
      cta,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 3.8,
        ease: 'back.out(1.7)',
      }
    )

    // Hero image animation - centered scale effect on load
    // Mobile image
    gsap.fromTo(
      image,
      { scale: 0.9, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 3.3,
        ease: 'power3.out',
      }
    )

    // Desktop image
    if (desktopImage) {
      gsap.fromTo(
        desktopImage,
        { scale: 0.9, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 3.3,
          ease: 'power3.out',
        }
      )
    }

    // Badge rotation
    if (badge) {
      gsap.to(badge, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-bg-light dark:bg-bg-dark pt-32 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.h1
              ref={headlineRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-text-dark dark:text-text-light min-h-[200px]"
            >
              {displayedText.split(' ').map((word, index) => (
                <span 
                  key={index} 
                  className={word === 'culture.' ? 'font-serif italic' : ''}
                >
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            
            {/* Mobile: Image appears here between headline and subtext */}
            <motion.div 
              ref={imageRef} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.3 }}
              className="lg:hidden relative my-8"
            >
              <div className="image-container rounded-3xl overflow-hidden shadow-2xl will-change-transform">
                <img
                  src="/images/homepageImage.svg"
                  alt="Conference Room"
                  className="w-full h-[300px] sm:h-[400px] object-cover"
                />
              </div>
              {/* Rotating Badge */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24">
                <div
                  ref={badgeRef}
                  className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fill="#1a1a1a" fontSize="8" fontWeight="600">
                      <textPath href="#circlePath">
                        SCROLL DOWN • DIGITAL CONFERENCE • 2024 •
                      </textPath>
                    </text>
                  </svg>
                  <FiArrowDown className="text-text-dark text-xl absolute" />
                </div>
              </div>
            </motion.div>
            
            <motion.p
              ref={subtextRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              className="text-lg md:text-xl text-gray-700 dark:text-text-secondary mb-8 max-w-xl"
            >
              We create clean designs that turn visitors into paying clients. You
              get a professional look that makes selling your services very easy.
            </motion.p>
            <motion.div 
              ref={ctaRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <MagneticButton className="bg-primary-orange text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all">
                View Our Work
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Content - Image with Badge (Desktop only) */}
          <motion.div 
            ref={desktopImageRef} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 3.3 }}
            className="hidden lg:block w-full lg:w-1/2 lg:ml-auto"
          >
            <div className="relative flex justify-center">
              <div className="image-container rounded-3xl overflow-hidden shadow-2xl will-change-transform relative">
                <img
                  src="/images/homepageImage.svg"
                  alt="Conference Room"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Rotating Badge - 160x160px */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40">
                <div
                  className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full"
                  >
                    <defs>
                      <path
                        id="circlePathDesktop"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fill="#1a1a1a" fontSize="8" fontWeight="600">
                      <textPath href="#circlePathDesktop">
                        SCROLL DOWN • DIGITAL CONFERENCE • 2024 •
                      </textPath>
                    </text>
                  </svg>
                  <FiArrowDown className="text-text-dark text-2xl absolute" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
