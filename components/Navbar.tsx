"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Zap } from "lucide-react"

interface NavbarProps {
  isScrolled?: boolean;
  onScrollToSection?: (ref: React.RefObject<HTMLElement>) => void;
  featuresRef?: React.RefObject<HTMLElement>;
  pricingRef?: React.RefObject<HTMLElement>;
  testimonialsRef?: React.RefObject<HTMLElement>;
  faqRef?: React.RefObject<HTMLElement>;
  showAuthButtons?: boolean;
}

const Navbar = ({ 
  isScrolled = false, 
  onScrollToSection, 
  featuresRef, 
  pricingRef, 
  testimonialsRef, 
  faqRef,
  showAuthButtons = true
}: NavbarProps) => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [localIsScrolled, setLocalIsScrolled] = useState(isScrolled)

  // Handle scroll event to change navbar appearance if not controlled externally
  useEffect(() => {
    if (isScrolled !== undefined) {
      setLocalIsScrolled(isScrolled)
      return
    }
    
    const handleScroll = () => {
      setLocalIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled])

  // Local scroll function if not provided
  const scrollToSection = (ref: React.RefObject<HTMLElement> | undefined) => {
    if (!ref) return
    
    setIsMenuOpen(false)
    if (onScrollToSection) {
      onScrollToSection(ref)
    } else if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-border/40 transition-all duration-300 ${
        localIsScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center w-[20%] space-x-2">
          <span className="text-3xl sm:text-xl font-bold text-white">Sova</span>
        </div>
        
        {/* Desktop Navigation - Centered */}
        <div className="hidden w-[60%] md:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-8">
            {featuresRef && (
              <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(featuresRef)}>
                Features
              </Button>
            )}
            {pricingRef && (
              <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(pricingRef)}>
                Pricing
              </Button>
            )}
            {testimonialsRef && (
              <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(testimonialsRef)}>
                Testimonials
              </Button>
            )}
            {faqRef && (
              <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(faqRef)}>
                FAQ
              </Button>
            )}
          </div>
        </div>

        {/* Right side - Theme toggle and auth buttons */}
        <div className="flex justify-end w-[20%]  items-center gap-2 sm:gap-1">
          <ThemeToggle />

          {/* Desktop CTA */}
          {showAuthButtons && (
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
                className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base font-medium px-3  sm:px-5 rounded-full"
              >
                Get Started
              </Button>
            </div>
          )}

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
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-col space-y-2">
            {featuresRef && (
              <Button variant="ghost" className="justify-center text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(featuresRef)}>
                Features
              </Button>
            )}
            {pricingRef && (
              <Button variant="ghost" className="justify-center text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(pricingRef)}>
                Pricing
              </Button>
            )}
            {testimonialsRef && (
              <Button variant="ghost" className="justify-center text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(testimonialsRef)}>
                Testimonials
              </Button>
            )}
            {faqRef && (
              <Button variant="ghost" className="justify-center text-sm font-medium hover:bg-transparent hover:text-primary" onClick={() => scrollToSection(faqRef)}>
                FAQ
              </Button>
            )}
          </div>
          {showAuthButtons && (
            <div className="pt-4 flex flex-col gap-1 border-t border-border/40">
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
          )}
        </div>
    </div>
    </nav>
  )
}

export default Navbar
