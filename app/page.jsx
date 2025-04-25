
'use client';

import { useState, useEffect } from "react";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { FileDownIcon } from "lucide-react";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { motion } from "framer-motion";

export default function Home() {
  const [cvInfo, setCvInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch CV information
  useEffect(() => {
    async function fetchCvInfo() {
      try {
        const response = await fetch('/api/cv');
        if (response.ok) {
          const data = await response.json();
          if (data.filename) {
            setCvInfo(data);
          }
        }
      } catch (error) {
        console.error('Error fetching CV info:', error);
      }
    }
    
    fetchCvInfo();
  }, []);

  const handleDownloadCV = () => {
    if (cvInfo?.path) {
      setIsLoading(true);
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = cvInfo.path;
      link.setAttribute('download', cvInfo.originalName || 'Innocent_Ndayizeye_CV.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    }
  };

  return (
    <section className="h-full py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between
        xl:pt-8 xl:pb-24 gap-10">
          {/*text*/}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center xl:text-left order-2 xl:order-none"
          >
            <div className="inline-block px-4 py-1 bg-[#3ba8ae]/10 rounded-full mb-4">
              <span className="text-[#3ba8ae] font-medium">Software Developer</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hello, I'm <br/>
              <span className="text-[#3ba8ae] relative">
                Innocent Ndayizeye
                <span className="absolute bottom-2 left-0 w-full h-2 bg-[#3ba8ae]/20 -z-10"></span>
              </span>
            </h1>
            
            <p className="max-w-[500px] mb-9 text-white/80 text-lg">
              I specialize in building robust web applications with modern technologies like 
              React, Next.js, and Node.js. With a passion for clean code and user-centric design, 
              I transform complex problems into elegant solutions.
            </p>
            
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDownloadCV}
                disabled={!cvInfo?.path || isLoading}
                className="uppercase flex items-center gap-2 hover:bg-[#3ba8ae]/10 transition-all"
              >
                <span className="text-[#4493a3]">
                  {isLoading ? "Downloading..." : "Download CV"}
                </span>
                <FileDownIcon className="text-[#4493a3]"/>
              </Button>
              
              <div className="mb-8 xl:mb-0">
                <Socials/>
              </div>
            </div>
          </motion.div>
          
          {/*image*/}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 xl:order-none mb-8 xl:mb-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#3ba8ae]/10 rounded-full blur-xl"></div>
              <Photo/>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Stats/>
      </motion.div>
    </section>
  );
}