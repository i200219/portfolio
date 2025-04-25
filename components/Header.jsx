'use client';

import { Button } from './ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`py-6 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1c1c1c]/90 backdrop-blur-sm shadow-lg py-4' 
          : 'bg-transparent py-8 xl:py-12'
      }`}
    >
      <div className='container mx-auto flex justify-between items-center px-4'>
        {/* logo */}
        <Link href="/" className='text-2xl md:text-3xl font-bold relative z-50'>
          
            <Image 
              src="/assets/mylogo.png"
              width={80}
              height={80}
              alt="logo"
              className='inline-block'
            />
            
  
         
        </Link>

        {/* desktop nav */}
        <div className='hidden xl:flex items-center gap-x-12'>
          <Nav />
          <Link href="/contact">
            <Button className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 transition-all">
              Hire me
            </Button>
          </Link>
        </div>

        {/* mobile nav - fixed the issue with duplicate navigation */}
        <div className='xl:hidden'>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  )
}

export default Header
