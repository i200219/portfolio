"use client";
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
    {
        num: 4,
        text: "Years of experience",
        icon: "📅"
    },
    {
        num: 5,
        text: "Projects completed",
        icon: "🚀"
    },
    {
        num: 5,
        text: "Programming languages",
        icon: "💻"
    },
    {
        num: 100,
        text: "GitHub commits",
        icon: "📊"
    },
];

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className='pt-8 pb-16 xl:pt-4 xl:pb-8' ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className='flex flex-wrap gap-8 justify-center xl:justify-between'
        >
          {stats.map((stat, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='flex flex-col items-center xl:items-start bg-[#1c1c1c]/40 p-6 rounded-xl backdrop-blur-sm border border-[#3ba8ae]/10 hover:border-[#3ba8ae]/30 transition-all'
                style={{ flex: '1 1 200px', maxWidth: '280px' }}
              >
                <div className="text-[#3ba8ae] text-2xl mb-2">{stat.icon}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <CountUp 
                    start={0} 
                    end={inView ? stat.num : 0} 
                    duration={2.5} 
                    delay={0.5}
                    className='text-4xl xl:text-5xl font-bold text-white'
                  />
                  <span className="text-[#3ba8ae] text-xl font-bold">+</span>
                </div>
                <p className="text-white/70 text-center xl:text-left">
                  {stat.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
