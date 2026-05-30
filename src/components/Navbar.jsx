export default function Navbar({actions,className=""}){
 return(
  <nav className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 h-[68px] w-[90%] max-w-5xl rounded-full border border-gray-200 bg-white/92 p-2 shadow-xl backdrop-blur-md ${className}`}>
   <div className="relative flex h-full w-full items-center justify-between">
    <button type="button"className="relative flex h-full items-center rounded-full bg-gray-900 px-8 text-[22px] font-extrabold leading-none tracking-tight text-white shadow-md outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary/50"aria-label="Shortlyst">
     Shortlyst
    </button>
    {actions&&<div className="flex items-center gap-3 px-5">{actions}</div>}
   </div>
  </nav>
 );
}