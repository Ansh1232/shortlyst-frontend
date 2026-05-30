import{useState}from'react';
import{motion,AnimatePresence}from'framer-motion';
import{AlertCircle,CheckCircle}from'lucide-react';
import UploadView from'./Dashboard/UploadView';
import AnalyzingView from'./Dashboard/AnalyzingView';
import ResultsView from'./Dashboard/ResultsView';
import ResumePreviewModal from'./Dashboard/ResumePreviewModal';
import HistoryView from'./Dashboard/HistoryView';
import Navbar from'./Navbar';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL||'http://localhost:8000';

function getSessionId(){
  let id=localStorage.getItem('shortlyst_session');
  if(!id){
    id=crypto.randomUUID();
    localStorage.setItem('shortlyst_session',id);
  }
  return id;
}

const SESSION_ID=getSessionId();

export default function ApplicationDashboard({onGoHome}){
 const[view,setView]=useState('setup');
 const[activeTab,setActiveTab]=useState('upload');
 const[candList,setCandList]=useState([]);
 const[selCand,setSelCand]=useState(null);
 const[jobId,setJobId]=useState(null);
 const[jobTitle,setJobTitle]=useState("");
 const[dialog,setDialog]=useState(null);

 const handleAnalyze=async(roleTitle,jdText,jdFile,uploadedFiles)=>{
  if(!jdText.trim()&&!jdFile)return setDialog({title:"Oops",message:"Need a JD text or file to start.",type:"error"});
  if(!uploadedFiles||uploadedFiles.length===0)return setDialog({title:"No Resumes",message:"Upload at least one candidate.",type:"error"});

  const exts=['.pdf','.docx'];
  const invalid=Array.from(uploadedFiles).filter(f=>{
   const ext=f.name.substring(f.name.lastIndexOf('.')).toLowerCase();
   return !exts.includes(ext);
  });

  if(invalid.length>0){
   return setDialog({title:"Bad file",message:"PDF and DOCX only for now.",type:"error"});
  }

  if(jdFile&&!exts.includes(jdFile.name.substring(jdFile.name.lastIndexOf('.')).toLowerCase())){
   return setDialog({title:"Bad JD file",message:"JD must be PDF or DOCX.",type:"error"});
  }

  setView('analyzing');

  try{
   const jdForm=new FormData();
   const finalTitle=roleTitle.trim()||"Open Role";
   jdForm.append('title',finalTitle);
   if(jdText.trim())jdForm.append('description',jdText);
   if(jdFile)jdForm.append('jd_file',jdFile);
   jdForm.append('session_id',SESSION_ID);

   const jobRes=await fetch(`${API_BASE_URL}/api/jobs`,{
    method:'POST',
    body:jdForm
   });

   if(!jobRes.ok)throw new Error("Could not start job session.");
   const jobData=await jobRes.json();
   setJobId(jobData.id);
   setJobTitle(jobData.title||finalTitle);

   for(const f of uploadedFiles){
    const formData=new FormData();
    formData.append('name',f.name.replace(/\.[^/.]+$/,""));
    formData.append('file',f);
    await fetch(`${API_BASE_URL}/api/jobs/${jobData.id}/candidates`,{
     method:'POST',
     body:formData
    });
   }

   const listRes=await fetch(`${API_BASE_URL}/api/jobs/${jobData.id}/candidates`);
   if(!listRes.ok)throw new Error("Could not fetch the candidates list");
   
   const resultsData=await listRes.json();
   setCandList(resultsData);
   
   setView('results');
   setActiveTab('results');

  }catch(err){
   setView('setup');
   setDialog({ 
    title:"Network error", 
    message:err.message==='Failed to fetch'?"Server unreachable":err.message, 
    type:"error" 
   });
  }
 };

 const openHistoryJob=async(job)=>{
  setView('analyzing');
  setActiveTab('history');
  try{
   const listRes=await fetch(`${API_BASE_URL}/api/jobs/${job.id}/candidates`);
   if(!listRes.ok)throw new Error("Could not load previous resumes.");

   const resultsData=await listRes.json();
   setJobId(job.id);
   setJobTitle(job.title||"Open Role");
   setCandList(resultsData);
   setView('results');
   setActiveTab('results');
  }catch(err){
   setView('history');
   setDialog({title:"History error",message:err.message,type:"error"});
  }
 };

 const handleHistoryDeleted=(deletedJobId)=>{
  if(deletedJobId===jobId){
   setJobId(null);
   setJobTitle("");
   setCandList([]);
   setView('history');
   setActiveTab('history');
  }
 };

 const handleCandidateDeleted=(candidateId)=>{
  setCandList((items)=>(
   items.filter((candidate)=>candidate.id!==candidateId).map((candidate,index)=>({...candidate,rank:index+1}))
  ));
 };

 return(
  <div className="min-h-screen flex flex-col relative animate-[fadeIn_0.4s_ease-out]">
   <Navbar actions={(
    <button onClick={onGoHome}className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
     Home
    </button>
   )}/>

   <main className="flex-grow max-w-6xl mx-auto w-full px-6 pt-32 pb-32">
    <AnimatePresence mode="wait">
     {view==='setup'&&<UploadView key="upload"onAnalyze={handleAnalyze}/>}
     {view==='analyzing'&&<AnalyzingView key="analyzing"/>}
     {view==='history'&&<HistoryView key="history"sessionId={SESSION_ID}onOpenJob={openHistoryJob}onDeleted={handleHistoryDeleted}showDialog={setDialog}/>}
     {view==='results'&&<ResultsView key="results"candList={candList}jobId={jobId}jobTitle={jobTitle}onSelect={setSelCand}onDeleteCandidate={handleCandidateDeleted}showDialog={setDialog}/>}
    </AnimatePresence>
   </main>

   <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-full p-1.5 flex items-center gap-1">
    <button onClick={()=>{setView('setup');setActiveTab('upload');}}className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab==='upload'?'bg-gray-900 text-white shadow-md':'text-gray-500 hover:text-gray-900'}`}>
     Upload
    </button>
    <button disabled={candList.length===0}onClick={()=>{if(candList.length>0){setView('results');setActiveTab('results');}}}className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab==='results'?'bg-gray-900 text-white shadow-md':'text-gray-500 hover:text-gray-900'} ${candList.length===0?'opacity-40 cursor-not-allowed':''}`}>
     Results
    </button>
    <button onClick={()=>{setView('history');setActiveTab('history');}}className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab==='history'?'bg-gray-900 text-white shadow-md':'text-gray-500 hover:text-gray-900'}`}>
     History
    </button>
   </div>

   <AnimatePresence>
    {dialog&&(
     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <motion.div initial={{opacity:0,scale:0.95,y:10}}animate={{opacity:1,scale:1,y:0}}exit={{opacity:0,scale:0.95,y:10}}className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
       <div className={`p-6 border-b ${dialog.type==='error'?'bg-red-50/50':'bg-green-50/50'}`}>
        <div className="flex items-center gap-3">
         {dialog.type==='error'?<AlertCircle className="text-red-500"/>:<CheckCircle className="text-green-500"/>}
         <h3 className="text-lg font-semibold text-gray-900">{dialog.title}</h3>
        </div>
       </div>
       <div className="p-6 text-gray-600 leading-relaxed">{dialog.message}</div>
       <div className="p-4 bg-gray-50 flex justify-end">
        <button onClick={()=>setDialog(null)}className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">OK</button>
       </div>
      </motion.div>
     </div>
    )}
   </AnimatePresence>

   <AnimatePresence>
    {selCand&&<ResumePreviewModal cData={selCand}onClose={()=>setSelCand(null)}/>}
   </AnimatePresence>
  </div>
 );
}
