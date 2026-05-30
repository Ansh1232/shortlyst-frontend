import{motion}from'framer-motion';

export default function AnalyzingView(){
 return(
  <motion.div initial={{opacity:0}}animate={{opacity:1}}exit={{opacity:0}}className="flex flex-col items-center justify-center min-h-[40vh]">
   <h3 className="text-2xl font-bold text-gray-900 animate-pulse">Running Candidate Screens...</h3>
  </motion.div>
 );
}