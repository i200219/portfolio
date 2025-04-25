"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Photo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  return (
    <div className='w-full h-full relative'>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="relative"
      >
        {/* Glow effect behind the image */}
        <div className="absolute inset-0 bg-[#3ba8ae]/20 rounded-full blur-xl transform scale-110 z-0"></div>
        
        {/* Image container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-[280px] h-[280px] md:w-[320px] md:h-[320px] xl:w-[400px] xl:h-[400px] rounded-full overflow-hidden border-4 border-[#3ba8ae]/30"
        >
          <Image 
            src="/assets/myfoto.jpg" 
            alt="Innocent Ndayizeye" 
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1200px) 320px, 400px"
            priority 
            className="object-cover"
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
        
        {/* Animated circle around the image */}
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute inset-0 z-20"
          >
            <svg 
              className="w-full h-full" 
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="50" 
                cy="50" 
                r="49" 
                fill="none" 
                stroke="rgba(59, 168, 174, 0.5)" 
                strokeWidth="0.5"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#3ba8ae"
                strokeWidth="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ 
                  pathLength: 1, 
                  rotate: 360,
                  transition: { 
                    pathLength: { duration: 3, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }
                }}
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Photo;
