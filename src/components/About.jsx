import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  const statementRef = useRef(null)
  const imageRef = useRef(null)
  const marquee1Ref = useRef(null)
  const marquee2Ref = useRef(null)
  const marquee1InnerRef = useRef(null)
  const marquee2InnerRef = useRef(null)

  useEffect(() => {
    const statement = statementRef.current
    const image = imageRef.current
    const marquee1 = marquee1Ref.current
    const marquee2 = marquee2Ref.current
    const marquee1Inner = marquee1InnerRef.current
    const marquee2Inner = marquee2InnerRef.current

    // Statement reveal animation
    gsap.fromTo(
      statement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statement,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Image parallax
    gsap.to(image, {
      y: -50,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    // CONSTANT SPEED AUTO-SCROLL (always running, independent of scroll)
    // Marquee 1 - moves left continuously
    const autoScroll1 = gsap.to(marquee1Inner, {
      xPercent: -50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Marquee 2 - moves right continuously
    const autoScroll2 = gsap.to(marquee2Inner, {
      xPercent: -50,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Track scroll position for marquee movement
    let marquee1Pos = 0
    let marquee2Pos = 0

    // PIN the section and control marquees with scroll
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top top', // Pin when section top hits viewport top
      end: '+=2000', // Pin for 2000px of scroll
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        const direction = velocity > 0 ? 1 : -1 // 1 = scrolling down, -1 = scrolling up
        const speed = Math.min(Math.abs(velocity) * 0.02, 50) // Cap the speed

        // Move marquees based on scroll direction
        // Marquee 1: scroll down = move left (negative), scroll up = move right (positive)
        marquee1Pos -= direction * speed * 0.1
        // Marquee 2: scroll down = move right (positive), scroll up = move left (negative)
        marquee2Pos += direction * speed * 0.1

        gsap.set(marquee1, { x: marquee1Pos })
        gsap.set(marquee2, { x: marquee2Pos })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      autoScroll1.kill()
      autoScroll2.kill()
    }
  }, [])

  return (
    <section
      ref={aboutRef}
      className="min-h-screen bg-black py-20 px-6 md:px-12 relative overflow-hidden"
      id="about"
    >
      {/* CRITICAL: Diagonal Marquee 1 with WHITE BACKGROUND - starts offscreen */}
      <div className="absolute top-1/4 left-0 right-0 transform -rotate-[5deg] overflow-visible pointer-events-none will-change-transform">
        <div
          ref={marquee1Ref}
          className="will-change-transform"
          style={{ width: '200%', transform: 'translateX(100vw)' }}
        >
          <div
            ref={marquee1InnerRef}
            className="flex whitespace-nowrap bg-white py-4"
            style={{ width: '200%' }}
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-black mx-8"
              >
                About us •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CRITICAL: Diagonal Marquee 2 with WHITE BACKGROUND - starts offscreen opposite side */}
      <div className="absolute bottom-1/4 left-0 right-0 transform rotate-[5deg] overflow-visible pointer-events-none will-change-transform">
        <div
          ref={marquee2Ref}
          className="will-change-transform"
          style={{ width: '200%', transform: 'translateX(-100vw)' }}
        >
          <div
            ref={marquee2InnerRef}
            className="flex whitespace-nowrap bg-white py-4"
            style={{ width: '200%' }}
          >
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-black mx-8"
              >
                About us •
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Main headline - ABOVE the image with transparent effect */}
        <div className="max-w-4xl text-center relative z-20 mix-blend-difference">
          <p
            ref={statementRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6 drop-shadow-lg"
          >
            Igniting creativity through futuristic design,{' '}
            <span className="text-lime-400 italic font-serif">glowing</span>{' '}
            energy, and the pulse of innovation.
          </p>
        </div>

        {/* Centered Image */}
      <div ref={imageRef} className="relative mt-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:w-[410px] h-auto aspect-[410/520]">
            <img
              src="/images/aboutusimage1.svg"
              alt="VR Person"
              className="w-full h-full object-cover"
            />
            {/* Glowing halo effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-lime-500/20" />
            </div>
          </div>

        {/* Description text - BELOW the image */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-center mt-8 drop-shadow-md">
          Where imagination and technology collide in a bold, futuristic aesthetic. Our work blends neon glow, experimental design, and sharp creative strategy.
        </p>
      </div>
    </section>
  )
}

export default About
