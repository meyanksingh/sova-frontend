"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Zap,
  BarChart2,
  Shield,
  Clock,
  Target,
  Cpu,
  PlayCircle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { VideoModal } from "@/components/video-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function LandingPage() {
  const router = useRouter()
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Refs for scrolling to sections
  const featuresRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    setIsMenuOpen(false)
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    {
      icon: Cpu,
      title: "Automated Execution",
      description: "Lightning-fast execution engine that handles your trading strategies with precision",
    },
    {
      icon: Target,
      title: "Pre-built Strategies",
      description: "Access a library of battle-tested trading strategies ready for deployment",
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Execute trades with minimal latency and maximum efficiency",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Built-in risk controls and position management features",
    },
    {
      icon: BarChart2,
      title: "Performance Analytics",
      description: "Track and analyze your strategy performance in real-time",
    },
    {
      icon: Zap,
      title: "High Throughput",
      description: "Handle multiple strategies and high-frequency trades simultaneously",
    },
  ]

  const stats = [
    { value: "50ms", label: "Average Execution Time" },
    { value: "99.9%", label: "System Uptime" },
    { value: "100+", label: "Pre-built Strategies" },
  ]

  const testimonials = [
    {
      quote: "Sova's execution engine has transformed our trading operations. The speed and reliability are unmatched.",
      author: "Sarah Johnson",
      role: "Hedge Fund Manager",
    },
    {
      quote:
        "We've seen a 40% improvement in execution efficiency since switching to Sova. The pre-built strategies saved us months of development time.",
      author: "Michael Chen",
      role: "Quantitative Analyst",
    },
    {
      quote:
        "The risk management features alone are worth the investment. Sova has become an essential part of our trading infrastructure.",
      author: "David Rodriguez",
      role: "Trading Desk Lead",
    },
  ]

  const pricingTiers = [
    {
      name: "Starter",
      price: "$10",
      period: "/month",
      description: "Perfect for individual traders and small teams",
      features: [
        "Up to 5 concurrent strategies",
        "100ms execution time",
        "Basic risk management",
        "Email support",
        "Performance analytics",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$199",
      period: "/month",
      description: "Ideal for professional traders and growing firms",
      features: [
        "Up to 20 concurrent strategies",
        "50ms execution time",
        "Advanced risk management",
        "Priority support",
        "Real-time analytics dashboard",
        "Strategy backtesting",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For institutional traders with high-volume needs",
      features: [
        "Unlimited concurrent strategies",
        "Sub-20ms execution time",
        "Custom risk parameters",
        "Dedicated account manager",
        "Advanced API access",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 border-b border-border/40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="text-lg sm:text-xl font-bold text-primary">Sova</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-sm font-medium" onClick={() => scrollToSection(featuresRef)}>
              Features
            </Button>
            <Button variant="ghost" className="text-sm font-medium" onClick={() => scrollToSection(pricingRef)}>
              Pricing
            </Button>
            <Button variant="ghost" className="text-sm font-medium" onClick={() => scrollToSection(testimonialsRef)}>
              Testimonials
            </Button>
            <Button variant="ghost" className="text-sm font-medium" onClick={() => scrollToSection(faqRef)}>
              FAQ
            </Button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
                className="text-sm sm:text-base font-medium px-2 sm:px-4"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="bg-primary hover:bg-primary/90 text-sm sm:text-base font-medium px-3 sm:px-6 rounded-full"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-foreground transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[400px] border-b border-border/40" : "max-h-0"}`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(featuresRef)}>
              Features
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(pricingRef)}>
              Pricing
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(testimonialsRef)}>
              Testimonials
            </Button>
            <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(faqRef)}>
              FAQ
            </Button>
            <div className="pt-2 flex flex-col gap-3 border-t border-border/40">
              <Button variant="outline" onClick={() => router.push("/login")} className="w-full justify-center">
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="w-full justify-center bg-primary hover:bg-primary/90 rounded-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -translate-y-1/2 right-0 w-80 h-80 bg-chart-2/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium"
            >
              Launching Soon 🚀
            </motion.div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
              Advanced Trading
              <span className="text-primary"> Execution Engine</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
              Deploy and execute sophisticated trading strategies with our high-performance engine. Experience
              millisecond-level execution and professional-grade reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                size="lg"
                className="text-base sm:text-lg bg-primary hover:bg-primary/90 px-6 sm:px-8 w-full sm:w-auto rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                onClick={() => router.push("/register")}
              >
                Start Trading Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsVideoModalOpen(true)}
                className="text-base sm:text-lg border-primary/20 hover:bg-primary/10 w-full sm:w-auto rounded-full"
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 sm:mt-20 max-w-5xl mx-auto relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-border/40 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-chart-2/5"></div>
              <Image
                src="https://images.unsplash.com/photo-1642790551116-18e150f248e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Trading Dashboard"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 border border-border/40"
            onClick={() => scrollToSection(featuresRef)}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border/40 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 sm:py-20 lg:py-24 relative scroll-mt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Powerful Execution Features</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Our execution engine is built with performance and reliability at its core, providing you with the tools
              you need to succeed in today's markets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-300 border border-border/40 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              How It Works
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Simple Integration, Powerful Results</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Get up and running in minutes with our streamlined onboarding process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Your Account",
                description: "Link your brokerage account through our secure API integration",
              },
              {
                step: "02",
                title: "Select Your Strategy",
                description: "Choose from our library of pre-built strategies or upload your own",
              },
              {
                step: "03",
                title: "Monitor Performance",
                description: "Track execution and performance in real-time through our dashboard",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-5xl font-bold text-primary/10">{item.step}</div>
                <h3 className="text-xl font-semibold mt-2 mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-6 right-0 transform translate-x-1/2">
                    <ChevronRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-16 sm:py-20 lg:py-24 bg-muted/30 border-y border-border/40 relative scroll-mt-20"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Trusted by Trading Professionals</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              See what our customers have to say about their experience with Sova
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block mr-1">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-base italic mb-6 text-foreground/90">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-16 sm:py-20 lg:py-24 relative scroll-mt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Pricing
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Transparent Pricing for Every Need</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Choose the plan that's right for your trading volume and strategy complexity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 sm:p-8 rounded-2xl border ${
                  tier.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/40 bg-card/50"
                } transition-all duration-300 relative`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl sm:text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground ml-1">{tier.period}</span>}
                </div>
                <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full ${
                    tier.highlighted
                      ? "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                      : "bg-primary/10 hover:bg-primary/20 text-primary"
                  }`}
                >
                  {tier.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-16 sm:py-20 lg:py-24 bg-muted/30 border-y border-border/40 relative scroll-mt-20"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Find answers to common questions about our execution engine
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How does the execution engine work?",
                answer:
                  "Our execution engine connects to your brokerage account through secure APIs. When your strategy generates a signal, our engine executes the trade with minimal latency, optimizing for best execution price and speed.",
              },
              {
                question: "Which brokerages are supported?",
                answer:
                  "We currently support major brokerages including Interactive Brokers, TD Ameritrade, E*TRADE, and more. We're constantly adding new integrations based on customer demand.",
              },
              {
                question: "Can I use my own trading strategies?",
                answer:
                  "While we offer pre-built strategies, you can easily upload and deploy your own custom strategies through our platform. We support various formats and programming languages.",
              },
              {
                question: "What kind of performance can I expect?",
                answer:
                  "Our execution engine achieves an average execution time of 50ms, with 99.9% uptime. Performance may vary based on market conditions, strategy complexity, and your chosen plan.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a 14-day free trial on all our plans. You can test the full functionality of our platform with no commitment required.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6 border-b border-border/40 pb-6 last:border-0"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-64 h-64 bg-chart-2/10 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Automate Your Trading?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10">
              Join thousands of traders who have already discovered the power of our execution engine. Start deploying
              your strategies in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="text-base sm:text-lg bg-primary hover:bg-primary/90 px-6 sm:px-8 rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsVideoModalOpen(true)}
                className="text-base sm:text-lg border-primary/20 hover:bg-primary/10 rounded-full"
              >
                <PlayCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-muted/30 border-t border-border/40 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold text-primary">Sova</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced trading execution engine for professional traders and institutions.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social) => (
                  <Button key={social} variant="ghost" size="sm" className="p-0 h-auto">
                    <span className="text-xs text-muted-foreground hover:text-primary">{social}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Integrations", "API", "Documentation"].map((item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Contact"].map((item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-muted-foreground hover:text-primary"
                    onClick={() => router.push("/terms")}
                  >
                    Terms & Privacy
                  </Button>
                </li>
                {["Cookies", "Licenses", "Settings"].map((item) => (
                  <li key={item}>
                    <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                      {item}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center md:text-left">
              © 2024 Sova. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground"
                onClick={() => router.push("/terms")}
              >
                Terms & Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                Cookies
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  )
}

