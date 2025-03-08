import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
const Stats = () => {

    const stats = [
        { value: "50ms", label: "Average Execution Time" },
        { value: "99.9%", label: "System Uptime" },
        { value: "100+", label: "Pre-built Strategies" },
      ]
  return (
    <section className="py-16 sm:py-20  border-y border-border/40 relative">
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"></div>
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
            <div className="text-3xl sm:text-7xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-lg sm:text-xl text-muted-foreground font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Stats
