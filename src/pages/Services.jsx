import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const [activeService, setActiveService] = useState(0)

  const services = [
    "UI/UX Design",
    "Custom Web Development",
    "Motion Graphic Design",
    "Mobile App Design",
    "Ecommerce Store Design",
    "Digital Growth Strategy",
    "Landing Design"
  ]

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
      <div className="container mx-auto max-w-6xl">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark dark:text-text-light leading-tight">
            We make your <span className="font-serif italic">complex ideas</span> simple and beautiful.
          </h2>
        </motion.div>

        {/* Services List */}
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
                  {service}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Services
