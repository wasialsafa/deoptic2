import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const slidesRef = useRef([])
  const itemsRef = useRef([])

  const services = [
    {
      title: "UI/UX Design",
      description: "Creating intuitive interfaces that blend aesthetics with functionality. We design digital experiences that users love and remember.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
      tags: ["Design", "Interface", "UX"]
    },
    {
      title: "Development",
      description: "Building fast, reliable, and scalable digital products with cutting-edge technologies and best practices.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
      tags: ["Developer", "Code", "Web"]
    },
    {
      title: "Branding & Strategy",
      description: "Crafting strong visual identities and strategic positioning that make your brand stand out in the digital landscape.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      tags: ["Brand", "Strategy", "Identity"]
    },
    {
      title: "Copywriting",
      description: "Words that convert. Crafting compelling copy that speaks to your audience and drives action.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
      tags: ["Content", "Copy", "Writing"]
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const listItems = itemsRef.current
      const slides = slidesRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + listItems.length * 60 + "%",
          pin: true,
          scrub: 0.5,
        },
      })

      // Fill bar animation - starts with 1/length height
      gsap.set(fillRef.current, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top",
      })

      // Set initial states for all items
      listItems.forEach((item, i) => {
        if (i === 0) {
          // First item starts active and popped out
          gsap.set(item, { 
            color: "#0ae448", 
            filter: "blur(0px)", 
            opacity: 1,
            scale: 1.1,
            x: 20,
            zIndex: 10
          })
          gsap.set(slides[i], { autoAlpha: 1 })
        } else {
          // Other items start inactive and pushed back
          gsap.set(item, { 
            color: "rgba(255,255,255,0.3)", 
            filter: "blur(3px)", 
            opacity: 0.3,
            scale: 0.9,
            x: 0,
            zIndex: 1
          })
          gsap.set(slides[i], { autoAlpha: 0 })
        }
      })

      listItems.forEach((item, i) => {
        const prevItem = listItems[i - 1]

        if (prevItem) {
          // Activate current item with pop-out effect
          tl.to(item, { 
            color: "#0ae448", 
            filter: "blur(0px)", 
            opacity: 1,
            scale: 1.1,
            x: 20,
            zIndex: 10,
            duration: 0.3,
            ease: "power2.out"
          }, 0.5 * i)
            .to(slides[i], { autoAlpha: 1, duration: 0.3 }, "<")
            // Deactivate previous item - push it back
            .to(prevItem, { 
              color: "rgba(255,255,255,0.3)", 
              filter: "blur(3px)", 
              opacity: 0.3,
              scale: 0.9,
              x: 0,
              zIndex: 1,
              duration: 0.3,
              ease: "power2.out"
            }, "<")
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.3 }, "<")
        }
      })

      // Animate progress bar fill
      tl.to(fillRef.current, {
        scaleY: 1,
        ease: "none",
        duration: tl.duration(),
      }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="h-screen bg-bg-dark dark:bg-black flex items-center transition-colors duration-300"
      id="services"
    >
      <div className="w-full h-full flex">
        {/* LEFT - Service List */}
        <div className="w-1/2 h-full flex flex-col justify-center pl-12 md:pl-20 lg:pl-28 pr-8">
          <h2 className="text-sm uppercase tracking-widest text-green-500 mb-8">Our Services</h2>
          <ul className="space-y-4">
            {services.map((service, i) => (
              <li 
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="text-4xl md:text-5xl lg:text-6xl font-bold cursor-pointer transition-transform origin-left"
                style={{ willChange: 'transform, filter, opacity' }}
              >
                <span className="text-green-500 text-lg md:text-xl mr-4 font-normal">[{String(i + 1).padStart(2, '0')}]</span>
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Line */}
        <div className="w-1 bg-white/10 relative self-center h-[60%]">
          <div 
            ref={fillRef} 
            className="absolute w-full bg-green-500 top-0"
            style={{ height: '100%' }}
          />
        </div>

        {/* RIGHT - Images with Description and Tags */}
        <div className="w-1/2 h-full flex items-center justify-center px-8 md:px-12 lg:px-16">
          <div className="relative w-full max-w-2xl h-[80%]">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => (slidesRef.current[i] = el)}
                className="absolute inset-0 opacity-0 invisible flex flex-col justify-center"
              >
                <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl shadow-green-500/10">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover" 
                  />
                </div>
                <p className="text-white/70 text-lg md:text-xl mb-6 leading-relaxed">{service.description}</p>
                <div className="flex gap-3 flex-wrap">
                  {service.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="border border-green-500/50 text-green-500 px-4 py-2 text-sm rounded-full hover:bg-green-500/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
