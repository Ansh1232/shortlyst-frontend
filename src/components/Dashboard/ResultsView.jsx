import{useState}from'react';
import{motion}from'framer-motion';
import{Search,Download,Trash2}from'lucide-react';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||'http://localhost:8000';

export default function ResultsView({candList,jobId,jobTitle,onSelect,onDeleteCandidate,showDialog}){
 const[q,setQ]=useState("");
 const currentList=candList.filter(c=>c.name.toLowerCase().includes(q.toLowerCase()));

 const handleCsv=()=>{
  window.location.href=`${API_BASE_URL}/api/jobs/${jobId}/export/csv`;
 };

 const deleteCandidate=async(candidateId)=>{
  try{
   const res=await fetch(`${API_BASE_URL}/api/jobs/${jobId}/candidates/${candidateId}`,{method:'DELETE'});
   if(!res.ok)throw new Error('Could not delete this candidate.');
   onDeleteCandidate(candidateId);
  }catch(err){
   showDialog({title:'Delete failed',message:err.message,type:'error'});
  }
 };

 return(
  <motion.div initial={{opacity:0,y:20}}animate={{opacity:1,y:0}}exit={{opacity:0,y:-20}}className="max-w-5xl mx-auto">
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
     <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{jobTitle||'Overview'}</h2>
     <p className="text-sm text-gray-500 mt-1">Processed {candList.length} total.</p>
    </div>
    <div className="flex items-center gap-3 w-full md:w-auto">
     <div className="relative flex-grow md:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
      <input type="text"placeholder="Lookup..."value={q}onChange={(e)=>setQ(e.target.value)}className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/50"/>
     </div>
     <button onClick={handleCsv}className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 text-gray-700">
      <Download className="w-4 h-4"/> Download
     </button>
    </div>
   </div>

   <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden grid gap-0 divide-y divide-gray-100">
    {currentList.map((c)=>(
     <div key={c.id}className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-gray-50/80 transition-colors">
      <div className="col-span-1 flex justify-center">
       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${c.rank===1?'bg-orange-100 text-primary border border-orange-200':'bg-white border border-gray-200 text-gray-500'}`}>#{c.rank}</div>
      </div>
      <div className="col-span-4">
       <p className="font-bold text-gray-900">{c.name}</p>
      </div>
      <div className="col-span-1 flex justify-center">
       <span className={`text-xl font-black ${c.match_score>=80?'text-emerald-600':c.match_score>=60?'text-yellow-600':'text-red-600'}`}>{Math.round(c.match_score)}</span>
      </div>
      <div className="col-span-4 flex flex-col gap-2 justify-center py-1">
       <div className="flex flex-wrap gap-1.5">
        {(c.matched_skills||[]).slice(0,4).map(s=>(
         <span key={s}className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100/50 rounded-md text-[10px] font-bold uppercase">{s}</span>
        ))}
       </div>
      </div>
      <div className="col-span-2 flex justify-end gap-2">
       <button onClick={()=>onSelect(c)}className="px-5 py-2 border border-gray-200 rounded-full text-sm font-semibold text-gray-700 bg-white hover:border-primary hover:text-primary transition-all">Preview</button>
       <button onClick={()=>deleteCandidate(c.id)}className="w-9 h-9 flex items-center justify-center border border-red-100 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"aria-label="Delete candidate">
        <Trash2 className="w-4 h-4"/>
       </button>
      </div>
     </div>
    ))}
    {currentList.length===0&&(
     <div className="p-8 text-sm font-semibold text-gray-500">No candidates found.</div>
    )}
   </div>
  </motion.div>
 );
}