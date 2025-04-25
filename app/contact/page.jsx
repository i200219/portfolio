'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";

const contactInfo = [
  {
    icon: <FaPhoneAlt className="text-xl text-[#3ba8ae]" />,
    title: "Phone",
    description: "+245 745416927",
  },
  {
    icon: <FaEnvelope className="text-xl text-[#3ba8ae]" />,
    title: "Email",
    description: "ndayizeyeinnocent173@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt className="text-xl text-[#3ba8ae]" />,
    title: "Location",
    description: "Nairobi, Kenya",
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null

  // Clear form status after 5 seconds
  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      setFormStatus('success');
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In <span className="text-[#3ba8ae]">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </motion.p>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full xl:w-1/3 bg-[#1c1c1c] p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-8 border-b border-[#3ba8ae]/20 pb-4">Contact Information</h3>
            <div className="flex flex-col gap-8">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#3ba8ae]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#3ba8ae]/20">
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://github.com/i200219" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3ba8ae]/10 flex items-center justify-center hover:bg-[#3ba8ae]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#3ba8ae]" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/innocent-ndayizeye-62427a2ab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3ba8ae]/10 flex items-center justify-center hover:bg-[#3ba8ae]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#3ba8ae]" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="https://x.com/innocen65038758" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3ba8ae]/10 flex items-center justify-center hover:bg-[#3ba8ae]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#3ba8ae]" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full xl:w-2/3"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-[#1c1c1c] rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
              <p className="text-white/60 mb-4">I'll get back to you as soon as possible</p>

              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500 text-green-500 p-4 rounded-md flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-md flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  There was an error sending your message. Please try again.
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm text-white/70">First Name</label>
                  <Input 
                    id="firstName"
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Innocent" 
                    className="bg-[#272727] border-[#3ba8ae]/30 focus:border-[#3ba8ae] text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm text-white/70">Last Name</label>
                  <Input 
                    id="lastName"
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ndayizeye" 
                    className="bg-[#272727] border-[#3ba8ae]/30 focus:border-[#3ba8ae] text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-white/70">Email</label>
                  <Input 
                    id="email"
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Innocent.ndayizeye@example.com" 
                    className="bg-[#272727] border-[#3ba8ae]/30 focus:border-[#3ba8ae] text-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm text-white/70">Subject</label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={handleSelectChange}
                    name="subject"
                  >
                    <SelectTrigger id="subject" className="bg-[#272727] border-[#3ba8ae]/30 focus:border-[#3ba8ae] text-white">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#272727] border-[#3ba8ae]/30 text-white">
                      <SelectGroup>
                        <SelectLabel>Subject</SelectLabel>
                        <SelectSeparator className="bg-[#3ba8ae]/20" />
                        <SelectItem value="general" className="focus:bg-[#3ba8ae]/20 focus:text-white">General Inquiry</SelectItem>
                        <SelectItem value="project" className="focus:bg-[#3ba8ae]/20 focus:text-white">Project Inquiry</SelectItem>
                        <SelectItem value="job" className="focus:bg-[#3ba8ae]/20 focus:text-white">Job Opportunity</SelectItem>
                        <SelectItem value="other" className="focus:bg-[#3ba8ae]/20 focus:text-white">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-white/70">Message</label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..." 
                  className="resize-none h-40 bg-[#272727] border-[#3ba8ae]/30 focus:border-[#3ba8ae] text-white"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="mt-4 w-fit bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
