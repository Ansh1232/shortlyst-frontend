import { motion } from 'framer-motion';
import { X, Crosshair } from 'lucide-react';

export default function ResumePreviewModal({ cData, onClose }) {
  const isHigh = cData.match_score >= 80;
  const isMed = cData.match_score >= 60;
  
  const scoreColor = isHigh ? 'text-emerald-600 border-emerald-500' : isMed ? 'text-yellow-600 border-yellow-500' : 'text-red-600 border-red-500';
  const scoreWord = isHigh ? 'Strong Match' : isMed ? 'Moderate' : 'Low Match';

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-gray-900/30 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-xl bg-slate-50 h-full shadow-2xl border-l border-gray-200 flex flex-col">
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-900">Scorecard</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"><X className="w-4 h-4 text-gray-600" /></button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 sm:p-8 relative flex justify-center">
          <div className="w-full max-w-[430px] min-h-[500px] p-6 bg-white rounded-xl shadow-lg border border-gray-200 relative flex flex-col gap-4">
            <div className="bg-slate-800 text-white p-4 pl-28 rounded-lg shadow-sm min-h-24 flex items-center">
              <h1 className="text-xl font-bold break-words">{cData.name}</h1>
            </div>
            
            <div className="mt-4">
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2 border-b pb-1">Found Skills</h4>
              <div className="flex flex-wrap gap-2">
                {(cData.matched_skills || []).map((s,i) => <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-bold rounded">{s}</span>)}
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider mb-2 border-b pb-1">Critical Missing</h4>
              <div className="flex flex-wrap gap-2">
                {(cData.missing_skills || []).map((s,i) => <span key={i} className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded">{s}</span>)}
              </div>
            </div>

            <div className={`absolute left-6 top-10 bg-white rounded-full flex flex-col items-center justify-center w-24 h-24 border-[5px] shadow-xl ${scoreColor} z-20`}>
              <span className="text-3xl font-black">{Math.round(cData.match_score)}</span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-gray-900 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
              {!isHigh && !isMed ? null : <Crosshair className="w-4 h-4 text-emerald-400" />}
              <span className="text-xs font-bold">{scoreWord}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
