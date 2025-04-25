'use client';
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaGithub, FaNodeJs, FaGraduationCap, FaBriefcase, FaUser, FaCode, FaCertificate, FaLanguage, FaLightbulb, FaHeart } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiNextdotjs, SiTypescript } from 'react-icons/si';

const ResumePage = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [resumeData, setResumeData] = useState({
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    languages: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch resume data from API
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume');
        if (response.ok) {
          const data = await response.json();
          
          // Organize entries by section
          const organizedData = {
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            languages: []
          };
          
          data.entries.forEach(entry => {
            if (organizedData[entry.section]) {
              organizedData[entry.section].push(entry);
            }
          });
          
          setResumeData(organizedData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setLoading(false);
      }
    };
    
    fetchResumeData();
  }, []);

  const tabs = [
    { value: 'experience', label: 'Experience', icon: <FaBriefcase className="mr-2" /> },
    { value: 'education', label: 'Education', icon: <FaGraduationCap className="mr-2" /> },
    { value: 'skills', label: 'Skills', icon: <FaCode className="mr-2" /> },
    { value: 'about', label: 'About Me', icon: <FaUser className="mr-2" /> },
    { value: 'projects', label: 'Projects', icon: <FaCode className="mr-2" /> },
    { value: 'certifications', label: 'Certifications', icon: <FaCertificate className="mr-2" /> },
    { value: 'languages', label: 'Languages', icon: <FaLanguage className="mr-2" /> },
    { value: 'interests', label: 'Interests', icon: <FaLightbulb className="mr-2" /> },
  ];

  const experience = [
    { title: 'Frontend Developer', company: 'Tech Company', date: '2022 - Present', description: 'Developed and maintained web applications using React.js and Tailwind CSS.' },
    { title: 'Backend Developer', company: 'Tech Company', date: '2022 - Present', description: 'Developed and maintained backend services using Node.js and Express.js.' },
    { title: 'Intern', company: 'Tech Company', date: '2021 - 2022', description: 'Assisted in developing web applications and learned about various technologies.' },
    { title: 'Freelancer', company: 'Self-employed', date: '2020 - 2021', description: 'Worked on various freelance projects, enhancing my skills in web development.' },
  ];

  const education = [
    { degree: 'Bachelor of Science in Applied Computer Technology', institution: 'United States International University-Africa, Kenya', date: '2023 - 2027' },
    { degree: 'High School level', institution: 'Petit Seminaire de Kanyosha', date: '2018 - 2021' },
    { degree: 'High School level', institution: 'Ecole Fondamental de Bupfunda', date: '2007 - 2017' },
  ];

  const skills = [
    { name: 'React', icon: <FaReact className="text-[#61DAFB]" />, level: 90 },
    { name: 'HTML', icon: <FaHtml5 className="text-[#E34F26]" />, level: 95 },
    { name: 'CSS', icon: <FaCss3Alt className="text-[#1572B6]" />, level: 90 },
    { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" />, level: 85 },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#38B2AC]" />, level: 90 },
    { name: 'Node.js', icon: <FaNodeJs className="text-[#339933]" />, level: 80 },
    { name: 'Express', icon: <SiExpress className="text-white" />, level: 80 },
    { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" />, level: 75 },
    { name: 'Next.js', icon: <SiNextdotjs className="text-white" />, level: 85 },
    { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" />, level: 70 },
    { name: 'GitHub', icon: <FaGithub className="text-white" />, level: 85 },
  ];

  const about = {
    description: "I'm a passionate web developer with a knack for building responsive and user-friendly web applications. I'm particularly interested in AI and Machine Learning, as well as Networking. With a strong foundation in both frontend and backend technologies, I strive to create seamless digital experiences that solve real-world problems.",
    info: [
      { fieldName: 'Name', fieldValue: 'Innocent Ndayizeye' },
      { fieldName: 'Email', fieldValue: 'ndayizeyeinnocent173@gmail.com' },
      { fieldName: 'Location', fieldValue: 'Bujumbura, Burundi' },
      { fieldName: 'Hobbies', fieldValue: 'Reading, Traveling, Coding' },
    ],
  };

  const projects = [
    { 
      title: 'Portfolio Website', 
      description: 'A personal portfolio website built with React and Tailwind CSS.', 
      technologies: ['React', 'Tailwind CSS', 'Next.js'],
      link: '#'
    },
    { 
      title: 'Blog Website', 
      description: 'A blog website built with Next.js and Tailwind CSS.', 
      technologies: ['Next.js', 'Tailwind CSS', 'MongoDB'],
      link: '#'
    },
    { 
      title: 'E-commerce Website', 
      description: 'An e-commerce website built with React and Tailwind CSS.', 
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
      link: '#'
    },
  ];

  const certifications = [
    { title: 'Frontend Developer Certification', issuer: 'FreeCodeCamp', date: '2023' },
  ];

  const languages = [
    { name: 'English', level: 'Fluent', percentage: 90 },
    { name: 'French', level: 'Intermediate', percentage: 70 },
    { name: 'Kirundi', level: 'Native', percentage: 100 },
    { name: 'Swahili', level: 'Intermediate', percentage: 80 },
    { name: 'Kinyarwanda', level: 'Fluent', percentage: 90 },
    { name: 'Spanish', level: 'Basic', percentage: 30 },
  ];

  const interests = [
    { name: 'Open Source Contribution', icon: <FaGithub /> },
    { name: 'Tech Blogging', icon: <FaCode /> },
    { name: 'AI and Machine Learning', icon: <FaLightbulb /> },
    { name: 'Networking', icon: <FaCode /> },
    { name: 'Traveling', icon: <FaHeart /> },
    { name: 'Reading', icon: <FaHeart /> },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='p-6 lg:p-12 max-w-7xl mx-auto'
    >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-[#3ba8ae]"
      >
        My Resume
      </motion.h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={(value) => setActiveTab(value)}
          orientation="vertical"
          className="flex flex-col md:flex-row w-full"
        >
          <TabsList className='flex md:flex-col space-y-1 bg-[#1c1c1c] p-4 rounded-lg mb-8 md:mb-0 md:w-64 md:h-fit overflow-x-auto md:overflow-x-visible'>
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="flex items-center justify-start px-4 py-3 w-full data-[state=active]:bg-[#3ba8ae] data-[state=active]:text-white"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content Area */}
          <div className="flex-1 md:ml-8">
            {/* Experience Tab */}
            <TabsContent value='experience'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Work Experience</h2>
                <div className='space-y-6'>
                  {experience.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all'
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className='text-xl font-bold text-white'>{item.title}</h3>
                          <p className='text-[#3ba8ae]'>{item.company}</p>
                        </div>
                        <span className='text-white/70 bg-[#3ba8ae]/10 px-3 py-1 rounded-full text-sm'>{item.date}</span>
                      </div>
                      <p className='mt-4 text-white/80'>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Other tab contents remain the same */}
            <TabsContent value='education'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Education</h2>
                <div className='space-y-6'>
                  {education.map((item, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all'
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className='text-xl font-bold text-white'>{item.degree}</h3>
                          <p className='text-[#3ba8ae]'>{item.institution}</p>
                        </div>
                        <span className='text-white/70 bg-[#3ba8ae]/10 px-3 py-1 rounded-full text-sm'>{item.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='skills'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Technical Skills</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {skills.map((skill, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all'
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-3xl">{skill.icon}</div>
                        <h3 className='text-xl font-bold text-white'>{skill.name}</h3>
                      </div>
                      <div className="w-full bg-[#272727] rounded-full h-2.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-[#3ba8ae] h-2.5 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='about'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-8"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">About Me</h2>
                <div className="bg-[#1c1c1c] rounded-xl p-8 border border-[#3ba8ae]/20">
                  <p className='text-white/80 text-lg leading-relaxed mb-8'>{about.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {about.info.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className='flex flex-col gap-2'
                      >
                        <h3 className='text-lg font-semibold text-[#3ba8ae]'>{item.fieldName}</h3>
                        <p className='text-white text-xl'>{item.fieldValue}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='projects'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Projects</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {projects.map((project, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all flex flex-col h-full'
                    >
                      <h3 className='text-xl font-bold text-white mb-3'>{project.title}</h3>
                      <p className='text-white/80 mb-4 flex-grow'>{project.description}</p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-[#3ba8ae]/10 text-[#3ba8ae] px-2 py-1 rounded-md text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a href={project.link} className="text-[#3ba8ae] hover:underline text-sm inline-flex items-center">
                          View Project <span className="ml-1">→</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='certifications'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Certifications</h2>
                <div className='space-y-6'>
                  {certifications.map((cert, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all'
                    >
                      <div className="flex items-center gap-4">
                        <FaCertificate className="text-[#3ba8ae] text-3xl" />
                        <div>
                          <h3 className='text-xl font-bold text-white'>{cert.title}</h3>
                          <p className='text-white/70'>{cert.issuer} | {cert.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='languages'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Languages</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {languages.map((language, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all'
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className='text-xl font-bold text-white'>{language.name}</h3>
                        <span className="text-[#3ba8ae]">{language.level}</span>
                      </div>
                      <div className="w-full bg-[#272727] rounded-full h-2.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${language.percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-[#3ba8ae] h-2.5 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value='interests'>
              <motion.div 
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#3ba8ae] mb-6">Interests</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                  {interests.map((interest, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className='bg-[#1c1c1c] rounded-xl p-6 shadow-lg border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/50 transition-all flex items-center gap-4'
                    >
                      <div className="text-[#3ba8ae] text-2xl">{interest.icon}</div>
                      <h3 className='text-xl font-bold text-white'>{interest.name}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </div> {/* Added missing closing div for content area */}
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResumePage;
