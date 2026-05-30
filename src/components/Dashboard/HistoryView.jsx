import{useCallback,useEffect,useState}from'react';
import{motion}from'framer-motion';
import{Clock,Trash2,Users}from'lucide-react';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||'http://localhost:8000';

export default function HistoryView({onOpenJob,onDeleted,showDialog}){
 const[jobs,setJobs]=useState([]);
 const[loading,setLoading]=useState(true);

 const loadJobs=useCallback(async()=>{
  setLoading(true);
  try{
   const jobsRes=await fetch(`${API_BASE_URL}/api/jobs`);
   if(!jobsRes.ok)throw new Error('Could not load history.');
   const jobsData=await jobsRes.json();

   const enriched=await Promise.all(jobsData.map(async(job)=>{
    try{
     const candRes=await fetch(`${API_BASE_URL}/api/jobs/${job.id}/candidates`);
     const candidates=candRes.ok?await candRes.json():[];
     const topCandidate=candidates[0];

     return{...job,candidateCount:candidates.length,topScore:topCandidate?Math.round(topCandidate.match_score):null,topCandidate:topCandidate?.name||null};
    }catch{
     return{...job,candidateCount:0,topScore:null,topCandidate:null};
    }
   }));

   setJobs(enriched);
  }catch(err){
   showDialog({title:'History unavailable',message:err.message,type:'error'});
  }finally{
   setLoading(false);
  }
 },[showDialog]);

 useEffect(()=>{
  const timer=setTimeout(()=>{loadJobs();},0);
  return()=>clearTimeout(timer);
 },[loadJobs]);

 const deleteJob=async(jobId)=>{
  try{
   const res=await fetch(`${API_BASE_URL}/api/jobs/${jobId}`,{method:'DELETE'});
   if(!res.ok)throw new Error('Could not delete this history item.');

   setJobs((items)=>items.filter((job)=>job.id!==jobId));
   onDeleted(jobId);
  }catch(err){
   showDialog({title:'Delete failed',message:err.message,type:'error'});
  }
 };

 return(
  <motion.div initial={{opacity:0,y:20}}animate={{opacity:1,y:0}}exit={{opacity:0,y:-20}}className="max-w-5xl mx-auto">
   <div className="mb-8">
    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">History</h2>
    <p className="text-sm text-gray-500 mt-1">Recent screening sessions and previous resumes.</p>
   </div>

   <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-100">
    {loading&&<div className="p-8 text-sm font-semibold text-gray-500">Loading history...</div>}

    {!loading&&jobs.length===0&&(
     <div className="p-8 text-sm font-semibold text-gray-500">No previous screening sessions yet.</div>
    )}

    {!loading&&jobs.map((job)=>(
     <div key={job.id}className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-gray-50/80 transition-colors">
      <div className="col-span-12 md:col-span-5">
       <div className="flex items-center gap-2 text-gray-900">
        <Clock className="w-4 h-4 text-primary"/>
        <p className="font-bold">{job.title||'Open Role'}</p>
       </div>
       <p className="text-xs text-gray-500 mt-1 line-clamp-1">{job.description}</p>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center gap-2 text-sm font-semibold text-gray-600">
       <Users className="w-4 h-4 text-gray-400"/>
       {job.candidateCount} resumes
      </div>
      <div className="col-span-3 md:col-span-2">
       {job.topScore===null?(
        <span className="text-sm font-semibold text-gray-400">No score</span>
       ):(
        <span className={`text-xl font-black ${job.topScore>=80?'text-emerald-600':job.topScore>=60?'text-yellow-600':'text-red-600'}`}>{job.topScore}</span>
       )}
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-end gap-2">
       <button onClick={()=>onOpenJob(job)}className="px-4 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 bg-white hover:border-primary hover:text-primary transition-all">
        Open
       </button>
       <button onClick={()=>deleteJob(job.id)}className="w-9 h-9 flex items-center justify-center border border-red-100 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"aria-label="Delete history item">
        <Trash2 className="w-4 h-4"/>
       </button>
      </div>
     </div>
    ))}
   </div>
  </motion.div>
 );
}