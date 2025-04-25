"use client";
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Page transition overlay */}
        <motion.div
          initial={{ scaleY: 0, opacity: 1 }}
          animate={{ scaleY: 0, opacity: 1 }}
          exit={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 origin-bottom bg-[#3ba8ae] z-[60]"
        />
        
        <motion.div
          initial={{ scaleY: 0, opacity: 1 }}
          animate={{ scaleY: 0, opacity: 1 }}
          exit={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 origin-bottom bg-[#15122c] z-[50]"
        />
        
        {/* Page content */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
