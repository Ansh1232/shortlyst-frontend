import{motion}from'framer-motion';
import{ArrowRight,Check}from'lucide-react';
import Navbar from'./Navbar';

export default function LandingPage({onStart}){
 return(
  <div className="flex flex-col min-h-screen relative overflow-hidden animate-[fadeIn_0.4s_ease-out]">
   <Navbar/>
    <main className="flex-grow flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 pt-32 pb-12 md:py-24 gap-12">
     
     <div className="w-full md:w-1/2 flex flex-col items-start gap-6 z-10">
      <motion.h1 
       initial={{opacity:0,x:-30}}animate={{opacity:1,x:0}}transition={{duration:0.6}}
       className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
       Screen Resume <br/>with <span className="text-primary">Precision.</span>
      </motion.h1>
      
      <motion.div initial={{opacity:0,x:-30}}animate={{opacity:1,x:0}}transition={{duration:0.6,delay:0.2}}className="mt-2">
       <button onClick={onStart}className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-xl shadow-orange-500/20 transition-transform hover:-translate-y-1 group">
        Start Screening Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
       </button>
      </motion.div>
     </div>

     <motion.div 
      initial={{opacity:0,x:30}}animate={{opacity:1,x:0}}transition={{duration:0.6,delay:0.2}}
      className="w-full md:w-1/2 flex justify-center relative mt-16 md:mt-0">
      <div className="absolute inset-0 bg-orange-500/5 rounded-3xl transform rotate-3 scale-105 -z-10 blur-xl"></div>
      
       <div className="bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-gray-200 w-[340px] h-[480px] rounded-xl p-6 relative flex flex-col gap-4">
       
        <div className="w-full bg-slate-800 text-white p-4 rounded-lg shadow-sm">
         <h2 className="text-xl font-bold leading-tight">Ansh Pal Singh</h2>
         <p className="text-xs text-slate-300 mt-1">Web Developer</p>
        </div>
        
        <div className="space-y-2 mt-2">
         <div className="w-full h-2 bg-gray-100 rounded"></div>
         <div className="w-5/6 h-2 bg-gray-100 rounded"></div>
         <div className="w-full h-2 bg-gray-100 rounded"></div>
        </div>
        <div className="mt-2">
         <div className="w-1/3 h-3 bg-gray-200 rounded mb-2"></div>
         <div className="w-full h-2 bg-gray-100 rounded mb-1"></div>
         <div className="w-4/5 h-2 bg-gray-100 rounded"></div>
        </div>
        <div className="mt-2">
         <div className="w-1/3 h-3 bg-gray-200 rounded mb-2"></div>
         <div className="flex gap-2 flex-wrap">
          <div className="w-12 h-3 bg-orange-100 rounded"></div>
          <div className="w-16 h-3 bg-orange-100 rounded"></div>
          <div className="w-10 h-3 bg-orange-100 rounded"></div>
         </div>
        </div>

        <motion.div animate={{y:[0,-8,0]}}transition={{repeat:Infinity,duration:4}}className="absolute -left-10 top-24 bg-white rounded-full flex flex-col items-center justify-center w-28 h-28 border-[5px] border-emerald-500 shadow-2xl z-20">
         <span className="text-3xl font-black text-gray-800 leading-none">92</span>
         <span className="text-xs font-bold text-emerald-600 mt-1">Excellent</span>
        </motion.div>

        <motion.div animate={{y:[0,6,0]}}transition={{repeat:Infinity,duration:3.5}}className="absolute -right-12 top-28 bg-white rounded-full shadow-lg border border-gray-100 flex items-center px-4 py-2 gap-2 z-20">
         <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="w-3 h-3"/></div>
         <span className="text-gray-700 text-sm font-medium">Tech Stack</span>
        </motion.div>
        
        <motion.div animate={{y:[0,-6,0]}}transition={{repeat:Infinity,duration:3.8}}className="absolute -right-16 top-40 bg-white rounded-full shadow-lg border border-gray-100 flex items-center px-4 py-2 gap-2 z-20">
         <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="w-3 h-3"/></div>
         <span className="text-gray-700 text-sm font-medium">Education</span>
        </motion.div>

        <motion.div animate={{y:[0,8,0]}}transition={{repeat:Infinity,duration:4.2}}className="absolute -right-8 top-52 bg-white rounded-full shadow-lg border border-gray-100 flex items-center px-4 py-2 gap-2 z-20">
         <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">!</div>
         <span className="text-gray-700 text-sm font-medium">Cloud Exp</span>
        </motion.div>
       </div>
      </motion.div>
    </main>
  </div>
 );
}