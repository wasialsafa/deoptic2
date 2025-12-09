import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const [activeService, setActiveService] = useState(0)

  const services = [
    { name: "UI/UX Design", image: "/images/servicesimage1.svg" },
    { name: "Custom Web Development", image: "/images/servicesimage2.svg" },
    { name: "Motion Graphic Design", image: "/images/servicesimage3.svg" },
    { name: "Mobile App Design", image: "/images/servicesimage4.svg" },
    { name: "Ecommerce Store Design", image: "/images/servicesimage1.svg" },
    { name: "Digital Growth Strategy", image: "/images/servicesimage2.svg" },
    { name: "Landing Design", image: "/images/servicesimage3.svg" }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    // Sunrise animation for the image container
    const imageContainer = sectionRef.current.querySelector('.image-container')
    if (!imageContainer) return

    gsap.fromTo(imageContainer,
      {
        y: '30%',
        opacity: 0
      },
      {
        y: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center py-20 px-6 md:px-12 transition-colors duration-300"
      id="services"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-primary-orange mb-6 font-semibold">
            SERVICE
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark dark:text-text-light leading-tight max-w-4xl">
            We make your <span className="font-serif italic">complex ideas</span> simple and beautiful.
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Services List */}
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-1"
          >
            {services.map((service, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="group relative"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`
                  flex items-center py-6 border-b border-gray-300 dark:border-gray-700
                  cursor-pointer transition-all duration-300
                  ${activeService === index ? 'pl-6' : 'pl-0'}
                `}>
                  {/* Active indicator line */}
                  <div className={`
                    absolute left-0 top-0 bottom-0 w-1 bg-primary-orange transition-opacity duration-300
                    ${activeService === index ? 'opacity-100' : 'opacity-0'}
                  `} />
                  
                  <span className={`
                    text-2xl md:text-3xl lg:text-4xl transition-all duration-300
                    ${activeService === index 
                      ? 'font-bold text-text-dark dark:text-text-light' 
                      : 'font-normal text-gray-600 dark:text-gray-500'
                    }
                  `}>
                    {service.name}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right Column: Image Display */}
          <div className="relative h-[600px] lg:sticky lg:top-20">
            <div className="image-container relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
              <motion.img
                src={services[activeService].image}
                alt={services[activeService].name}
                className="w-full h-full object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={activeService}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
