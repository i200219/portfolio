// import React from 'react';
// import { motion } from 'framer-motion';

// const stairAnimation = {
//     initial: { top: 0 },
//     animate: { top: '100%' },
//     exit: { top: '0%' } // Ensure the exit animation makes sense
// };

// const Stairs = () => {
//     const totalSteps = 6;

//     const reverseIndex = (index) => totalSteps - index - 1;

//     return (
//         <div className="relative w-full h-full">
//             {[...Array(totalSteps)].map((_, index) => (
//                 <motion.div 
//                     key={index}
//                     variants={stairAnimation}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{
//                         duration: 0.5,
                        
//                         repeatType: 'reverse',
//                         ease: 'easeInOut',
//                         delay: reverseIndex(index) * 0.1
//                     }}
//                     className="absolute left-0 right-0 h-2 bg-white w-full"
//                     style={{ top: `${index * 20}px`, zIndex: reverseIndex(index) }} // Adjust spacing dynamically
//                 />
//             ))}
//         </div>
//     );
// };

// export default Stairs;
