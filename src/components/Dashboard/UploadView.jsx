import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, User } from 'lucide-react';

export default function UploadView({ onAnalyze }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jdText, setJdText] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [files, setFiles] = useState([]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Upload Resumes</h2>
      </div>
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-2 block tracking-wide">
          Role Title
        </label>
        <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g:- Senior Software Engineer" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 tracking-wide">
            <FileText className="w-4 h-4 text-primary" /> Set Job Description
          </label>
          <textarea value={jdText} onChange={(e) => setJdText(e.target.value)} placeholder="Paste Job Description text here..." className="w-full h-[180px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none shadow-inner mb-4" />
          
          <div className="w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center p-4 relative cursor-pointer group">
            <input type="file" accept=".pdf,.docx" onChange={(e) => setJdFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <p className="text-sm font-medium text-gray-700">{jdFile ? jdFile.name : "Upload JD File"}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2 tracking-wide">
            <User className="w-4 h-4 text-blue-500" /> Resumes
          </label>
          <div className="flex-grow w-full border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center p-8 relative cursor-pointer group min-h-[280px]">
            <input type="file" multiple accept=".pdf,.docx" onChange={(e) => setFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
           
            <p className="text-sm font-medium text-gray-700">{files.length > 0 ? `${files.length} selected` : "Upload Resumes"}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
        <button onClick={() => onAnalyze(jobTitle, jdText, jdFile, files)} className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 rounded-full font-semibold shadow-lg transition-transform hover:-translate-y-0.5">
          Process Candidates
        </button>
      </div>
    </motion.div>
  );
}
