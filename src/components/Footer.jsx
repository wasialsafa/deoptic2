import { motion } from 'framer-motion'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const CONTACT_EMAIL = 'hello@info.com'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Projects', href: '/projects' },
      { name: 'Careers', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' }
    ],
    social: [
      { name: 'Facebook', icon: FaFacebookF, href: '#' },
      { name: 'Twitter', icon: FaTwitter, href: '#' },
      { name: 'Instagram', icon: FaInstagram, href: '#' },
      { name: 'LinkedIn', icon: FaLinkedinIn, href: '#' }
    ]
  }

  return (
    <footer className="bg-primary-orange text-white overflow-hidden">
      {/* CTA Section */}
      <div className="container mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            GOT AN IDEA?
          </h2>
          <h3 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic mb-8">
            LET'S TALK
          </h3>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            We create design experiences that transform businesses and delight users. 
            Let's build something extraordinary together.
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <a 
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity inline-block"
            data-cursor-text="Click to Email"
          >
            {CONTACT_EMAIL}
          </a>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-4xl mx-auto"
        >
          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    data-cursor-text="View"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    data-cursor-text="View"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4">Social</h4>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white text-primary-orange rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label={social.name}
                  data-cursor-text={social.name}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-2xl md:text-3xl font-bold">Doptic</div>
          <div className="opacity-80">
            © {new Date().getFullYear()} Doptic. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
