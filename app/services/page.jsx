"use client";
import { BsArrowDownRight } from "react-icons/bs";
import Link from 'next/link';
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
    {
        num: 1,
        text: "Web development",
        description: "I have experience in building web applications using React, Next.js, and Node.js. I have also worked on projects using HTML, CSS, and JavaScript.",
        path: "/services/web-development",
        icon: "💻"
    },
    {
        num: 2,
        text: "Project management",
        description: "I have experience in managing projects using Agile methodologies. I have also worked on projects using Scrum and Kanban.",
        path: "/services/project-management",
        icon: "📊"
    },
    {
        num: 3,
        text: "UI/UX Design",
        description: "I have experience in designing user interfaces and user experiences using Figma. I have also worked on projects using Adobe XD.",
        path: "/services/ui-ux-design",
        icon: "🎨"
    },
    {
        num: 4,
        text: "Artificial Intelligence",
        description: "I have experience in building artificial intelligence models using Python. I have also worked on projects using TensorFlow and PyTorch.",
        path: "/services/artificial-intelligence",
        icon: "🤖"
    },
];

const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My <span className="text-[#3ba8ae]">Services</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            I offer a range of services to help businesses and individuals achieve their goals.
            Here are some of the services I provide:
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {services.map((item, index) => {
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col gap-4 p-8 rounded-xl transition-all duration-300
                  ${activeIndex === index ? 'bg-[#1c1c1c] border border-[#3ba8ae]/30' : 'bg-[#1c1c1c]/50 hover:bg-[#1c1c1c] border border-white/5 hover:border-[#3ba8ae]/20'}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="absolute top-6 right-6 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {item.icon}
                </div>
                
                <div className="w-full flex justify-between items-center">
                  <span className="text-5xl font-extrabold text-[#3ba8ae]/20 group-hover:text-[#3ba8ae]/40 transition-all duration-300">
                    {item.num.toString().padStart(2, '0')}
                  </span>
                  <Link 
                    href={item.path}
                    className="w-[60px] h-[60px] rounded-full bg-[#3ba8ae]/10 text-[#3ba8ae] 
                      group-hover:bg-[#3ba8ae] group-hover:text-white
                      transition-all duration-500 flex items-center justify-center 
                      group-hover:rotate-45 group-hover:scale-110"
                  >
                    <BsArrowDownRight className="text-2xl" />
                  </Link>
                </div>

                <h2 className="text-3xl font-bold leading-tight text-white group-hover:text-[#3ba8ae] transition-all duration-300">
                  {item.text}
                </h2>
                
                <p className="text-white/70 group-hover:text-white/90 transition-all duration-300">
                  {item.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-between items-center">
                  <span className="text-sm text-white/50">Learn more</span>
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="text-[#3ba8ae]"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            Get in touch
            <BsArrowDownRight className="text-lg" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPage;
