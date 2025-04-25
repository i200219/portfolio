// "use client";
// import { AnimatePresence } from 'framer-motion'
// import React from 'react'
// import { usePathname } from 'next/navigation';
// import Stairs from './Stairs';
// import Motion from './PageTransition';
// const StairTransition = () => {
//     const pathname = usePathname();
//   return (
//     <>
//       <AnimatePresence mode='wait'>
//           <div key={pathname}>
//             <div className='h-screen w-screen bg-primary top-0 left-0  right-0
//             pointer-events-none z-40 flex '>
//                 <Stairs />
//             </div>
//             {/* <Motion.div className='h-screen w-screen flex
//             bg-primary top-0 left-0  right-0 pointer-events-none' initial={{ opacity: 1}}
//              animate={{ opacity: 0,
//               transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut'}
//               }}/> */}
//             </div>
//        </AnimatePresence>
//     </>
    
//   )
// }

// export default StairTransition
