"use client"
import AdminModal from "@/components/AdminModal";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion"
import { PhoneCall, Calendar, Clock, MapPin } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

const Index = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const carX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const [parallaxStyle, setParallaxStyle] = useState({})


  const calculateParallax = useCallback((strength = 1) => {
    if (typeof window === "undefined") return "translate(0px, 0px)";
    const x = (mousePosition.x - window.innerWidth / 2) * strength
    const y = (mousePosition.y - window.innerHeight / 2) * strength
    return `translate(${x}px, ${y}px)`
  }, [mousePosition])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }


    const updateParallax = () => {
      setParallaxStyle({
        transform: calculateParallax(0.02),
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", updateParallax)

    updateParallax()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateParallax)
    }
  }, [calculateParallax, mousePosition])



  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    debugger;
    if (event.key === '`') {
      setIsAdminModalOpen((p) => !p)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div className="min-h-screen bg-black text-white" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-[url('../public/cover.jpg')] bg-cover bg-center"
            style={{ filter: "blur(5px)", transform: calculateParallax(0.02) }}
          />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 border border-luxury-gold rounded-full"
          style={{ transform: calculateParallax(0.05) }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 border border-luxury-gold rounded-full"
          style={{ transform: calculateParallax(0.03) }}
        />

        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-8xl font-playfair mb-6 text-white drop-shadow-lg"
          >
            Best Limo & Party Bus
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl md:text-3xl font-raleway mb-10 text-luxury-gold"
          >
            Experience the epitome of sophistication
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-luxury-gold text-black hover:bg-luxury-gold/90 text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reserve Your Experience
            </Button>
          </motion.div>
        </div>

        {/* Animated car silhouette */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-luxury-gold opacity-20"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* Animated Car Section */}
      <div className="relative h-32 overflow-hidden bg-luxury-gray-900">
        <motion.div
          style={{ x: carX }}
          className="absolute top-1/2 -translate-y-1/2 left-0"
        >
          <img
            src="https://images.unsplash.com/photo-1632245889029-e406faaa34cd"
            alt="Luxury Car"
            className="w-32 h-auto transform -scale-x-100"
          />
        </motion.div>
      </div>

      {/* Gallery Section */}
      <section className="py-20 bg-luxury-gray-900">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center font-playfair mb-16">
            Our <span className="text-luxury-gold">Fleet</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-video overflow-hidden rounded-lg hover-lift"
              >
                <img
                  src={image}
                  alt={`Luxury Vehicle ${index + 1}`}
                  className="w-full h-full object-cover"
                  sizes="100vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-luxury-gray-900">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center font-playfair mb-16">
            <span className="text-luxury-gold">Premium</span> Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-luxury-gray-800 rounded-lg hover-lift"
              >
                <service.icon className="w-12 h-12 text-luxury-gold mb-4" />
                <h3 className="text-xl font-playfair mb-2">{service.title}</h3>
                <p className="text-luxury-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-luxury-gray-800">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center font-playfair mb-16">
            Book Your <span className="text-luxury-gold">Experience</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </div>
  );
};

const services = [
  {
    title: "Corporate Travel",
    description: "Executive transportation for business professionals",
    icon: PhoneCall,
  },
  {
    title: "Special Events",
    description: "Make your celebration truly memorable",
    icon: Calendar,
  },
  {
    title: "Airport Transfers",
    description: "Punctual and comfortable airport service",
    icon: Clock,
  },
  {
    title: "City Tours",
    description: "Explore the city in ultimate luxury",
    icon: MapPin,
  },
];

const fleetImages = [
  "/car.jpg",
  "/car1.jpg",
  "/car2.jpg",
  "/car.jpg",
  "/car2.jpg",
  "/car1.jpg",
];

export default Index;