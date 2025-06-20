'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { BsArrowUpRight, BsGithub, BsCode } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
// Remove tooltip imports and use simple buttons instead
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
import Link from 'next/link';
import Image from 'next/image';

// Projects data - replace with your actual projects
const projects = [
  {
    name: "Portfolio Website",
    image: "/images/project1.png",
    github: "https://github.com/i200219/change-impact-nexus",
    demo: "https://github.com/i200219/change-impact-nexus",
    description: "A modern portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    category: "Web Development"
  },
  {
    name: "E-commerce Platform",
    image: "/images/project2.png",
    github: "https://github.com/your-repo/ecommerce",
    demo: "https://your-ecommerce.com",
    description: "A full-featured e-commerce platform with product listings, cart functionality, and secure checkout process.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    category: "Full Stack"
  },
  {
    name: "AI Image Generator",
    image: "/images/project3.png",
    github: "https://github.com/your-repo/ai-image",
    demo: "https://your-ai-app.com",
    description: "An application that uses AI to generate unique images based on text prompts provided by users.",
    technologies: ["Python", "TensorFlow", "React", "Flask", "OpenAI API"],
    category: "AI/ML"
  },
];

// Filter categories
const categories = ["All", ...new Set(projects.map(project => project.category))];

const Work = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
    
    // Reset active project when filter changes
    if (filteredProjects.length > 0) {
      setActiveProject(filteredProjects[0]);
      setActiveIndex(0);
      if (swiperInstance) {
        swiperInstance.slideTo(0);
      }
    }
  }, [selectedCategory, swiperInstance]);

  const handleProjectChange = (index) => {
    setActiveProject(filteredProjects[index]);
    setActiveIndex(index);
  };

  return (
    <section className='py-16 min-h-screen flex items-center'>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className='mb-16 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl md:text-5xl xl:text-6xl font-extrabold mb-4'>
            My <span className="text-[#3ba8ae]">Projects</span>
          </h2>
          <p className='text-white/70 max-w-2xl mx-auto'>
            Here are some of my recent projects that showcase my skills and experience.
            Feel free to explore and check out the code or live demos.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className='flex flex-wrap justify-center gap-3 mb-12'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-[#3ba8ae] text-white' 
                  : 'bg-[#1c1c1c] text-white/70 hover:bg-[#3ba8ae]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Project Viewer */}
        <div className='flex flex-col xl:flex-row items-center gap-12'>
          {/* Swiper Section */}
          <motion.div 
            className='w-full xl:w-3/5'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={(swiper) => handleProjectChange(swiper.realIndex)}
              onSwiper={setSwiperInstance}
              className='project-swiper rounded-xl overflow-hidden'
            >
              {filteredProjects.map((proj, index) => (
                <SwiperSlide key={index}>
                  <div className="relative group overflow-hidden rounded-xl">
                    <Image
                      src={proj.image}
                      alt={proj.name}
                      width={800}
                      height={500}
                      className='w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{proj.name}</h3>
                      <p className="text-[#3ba8ae]">{proj.category}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Project Details */}
          <motion.div 
            className='w-full xl:w-2/5 flex flex-col items-start gap-6 bg-[#1c1c1c] p-8 rounded-xl border border-[#3ba8ae]/10'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h3 className='text-3xl font-bold text-white mb-4'>{activeProject.name}</h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <FaTags className="text-[#3ba8ae]" />
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <div 
                        key={index} 
                        className="bg-[#3ba8ae]/10 text-[#3ba8ae] border border-[#3ba8ae]/20 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                <p className='text-white/70 mb-8'>{activeProject.description}</p>

                <div className='flex gap-4 mt-auto'>
                  {/* GitHub Button - simplified without tooltip */}
                  <Link 
                    href={activeProject.github} 
                    target="_blank"
                    className="flex items-center gap-2 bg-[#1c1c1c] hover:bg-[#3ba8ae]/20 border border-[#3ba8ae]/30 text-white px-4 py-2 rounded-lg transition-all duration-300"
                    title="View Source Code"
                  >
                    <BsGithub className='text-xl' />
                    <span>Code</span>
                  </Link>

                  {/* Demo Button - simplified without tooltip */}
                  <Link 
                    href={activeProject.demo} 
                    target="_blank"
                    className="flex items-center gap-2 bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white px-4 py-2 rounded-lg transition-all duration-300"
                    title="View Live Demo"
                  >
                    <BsArrowUpRight className='text-xl' />
                    <span>Live Demo</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Navigation Thumbnails */}
        <motion.div 
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredProjects.map((proj, index) => (
            <button
              key={index}
              onClick={() => {
                handleProjectChange(index);
                swiperInstance?.slideTo(index);
              }}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === index ? 'border-[#3ba8ae] scale-110' : 'border-transparent opacity-60'
              }`}
            >
              <Image
                src={proj.image}
                alt={proj.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
