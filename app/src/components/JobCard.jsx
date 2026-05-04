import { MdOutlineLocationOn } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";

import { useState } from "react"; 

export default function JobCard({ job }) {

  const [logoError, setLogoError] = useState(false);
  const daysAgo = getDaysAgo(job.date_posted);


  const allKeywords = job.keywords || [];
  const displayKeywords = allKeywords.slice(0, 3);
  const remainingCount = allKeywords.length - 3;

  return (
    <div className="p-4 border rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex flex-col gap-3 w-full sm:min-h-60 bg-white">
      <div className="w-full p-3 bg-stone-200 rounded-xl relative">

        <div className="w-10 h-10 border border-stone-400 rounded-xl absolute right-3 top-3 flex items-center justify-center bg-white/50 z-10">
          <span className="text-[1.8em]">
            <CiHeart />
          </span>
        </div>
        
        <div className="w-full h-12 flex items-center gap-3">

          <div className="h-full w-[15%] min-w-12">
            <div className="w-full h-full bg-sky-600 rounded-lg overflow-hidden flex items-center justify-center">

              {job.logo && !logoError ? (
                <img 
                  src={job.logo} 
                  alt={job.company_name} 
                  className="object-cover w-full h-full"
                  onError={() => setLogoError(true)} 
                />
              ) : (

                <span className="text-white text-xl font-bold uppercase">
                  {job.company_name.charAt(0)}
                </span>
              )}
            </div>
          </div>


          <div className="flex-1 min-w-0 pr-10"> 
            <h2 className="text-lg font-semibold text-stone-900 truncate">
              {job.company_name}
            </h2>
            <div className="flex items-center text-sm text-stone-600">
              <span className="mr-1 shrink-0">
                <MdOutlineLocationOn />
              </span>
      
              <p className="truncate">
                {job.location || "Remote"}
              </p>
            </div>
          </div>
        </div>
      </div>


      <p className="text-gray-800 font-bold sm:truncate">
        {job.role}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {displayKeywords.map((keyword, index) => (
          <span 
            key={index} 
            className="px-3 py-1 border border-stone-400 rounded-xl text-xs text-stone-600 bg-white"
          >
            {keyword}
          </span>
        ))}
        
        {remainingCount > 0 && (
          <span className="px-3 py-1 border border-stone-400 rounded-xl text-xs text-stone-600 bg-stone-100 font-medium">
            + {remainingCount}
          </span>
        )}
      </div>

      <div className="w-full h-5 border-t border-b-stone-400 my-2 pt-2 flex justify-between">
          <p className="font-bold text-sky-600">€{job.salary}<span className="text-sm font-medium text-stone-400 ml-1">/year</span></p>
           {daysAgo == "0" ? (
             <div className="flex text-stone-400"><span className="m-1.5"><FaRegClock /></span> <p className="text-sm">posted today</p></div>
           ): (<div className="flex text-stone-400"><span className="m-1.5"><FaRegClock /></span> <p className="text-sm"> posted {daysAgo} {daysAgo === "30+" || daysAgo > 1 ? "days" : "day" || daysAgo < 1 ? "today" : ""} ago</p></div>)
           }
          
      </div>
    </div>
  );
}

function getDaysAgo(dateString) {
  if (!dateString) return "N/A";

  const postDate = new Date(dateString);
  const today = new Date();
  

  const diffInMs = today - postDate;
  

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays > 30) {
    return "30+";
  }

  return diffInDays <= 0 ? "0" : diffInDays;
}