import { useState } from "react";
import { useJobs } from "../hooks/useJobs";
import JobCard from "./JobCard";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineLocationOn } from "react-icons/md";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { BiBriefcase } from "react-icons/bi";
import JobDetailBG from "../assets/job_detail_bg_2.jpg";
import { IoIosClose } from "react-icons/io";
import { TbCalendarTime } from "react-icons/tb";




function getDaysAgo(dateString) {
  if (!dateString) return 0;
  const postDate = new Date(dateString);
  const today = new Date();
  const diffInMs = today - postDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export default function JobList({ filters }) {
  const { jobs, loading } = useJobs(filters);
  const [selectedJob, setSelectedJob] = useState(null);
  const [logoError, setLogoError] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    // --- GEHALT ---
    const minF = filters?.minSalary ?? 0;
    const maxF = filters?.maxSalary ?? 1000;
    const jobMinSalary = job.salary ? parseInt(job.salary.split("k")[0]) : 0;
    const matchesSalary = jobMinSalary >= minF && jobMinSalary <= maxF;

    // --- JOB TYPE ---
    const selectedTypes = filters?.employmentTypes || [];
    const matchesType =
      selectedTypes.length === 0 ||
      (job.employment_type &&
        selectedTypes.some(
          (t) =>
            t.toLowerCase().trim() === job.employment_type.toLowerCase().trim(),
        ));

    // --- JOB POSITION (WorkMode) ---
    const selectedPositions = filters?.positions || [];
    const jobWorkMode = job.workMode?.toLowerCase().trim() || "";

    const matchesPosition =
      selectedPositions.length === 0 ||
      selectedPositions.some((p) => p.toLowerCase().trim() === jobWorkMode);

    // --- 4. EXPERIENCE (NEU) ---
    const selectedExperience = filters?.experience || [];
    const jobExperience = job.experience?.toLowerCase().trim() || "";
    const matchesExperience = 
      selectedExperience.length === 0 ||
      selectedExperience.some((exp) => exp.toLowerCase().trim() === jobExperience);

    // --- DATUM ---
    let matchesDate = true;
    if (filters?.postedWithin) {
      const daysLimit = parseInt(filters.postedWithin);
      const diffInDays = getDaysAgo(job.date_posted);
      matchesDate = diffInDays <= daysLimit;
    }

    // --- 6. KEYWORDS (ComboBox) ---
const activeKeywords = filters?.keywords || [];

const matchesKeywords = activeKeywords.length === 0 || 
  activeKeywords.every(selectedKw => {
  
    const jobKeywordsArray = Array.isArray(job.keywords) ? job.keywords : [];
    
    return jobKeywordsArray.some(jobKw => 
      String(jobKw).toLowerCase().trim() === String(selectedKw).toLowerCase().trim()
    );
  });

    // --- FINALES ERGEBNIS ---
   const isTotalMatch = 
  matchesSalary && 
  matchesType && 
  matchesPosition && 
  matchesDate && 
  matchesExperience && 
  matchesKeywords;


    return isTotalMatch;
  });


  if (loading) return <p className="text-center p-10">Lade Jobs...</p>;
  console.log(selectedJob);

  return (
    <div className="sm:p-6 pt-10 relative">

   
     

      <h2 className="text-xl font-bold mb-6">
        {filteredJobs.length} passende Rollen gefunden
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="cursor-pointer"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedJob && (
          <>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />


            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-full max-w-3xl bg-white shadow-2xl z-50 overflow-y-auto"
            >
              

              <div className="w-full h-50 bg-stone-600 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${JobDetailBG})` }}>
                <button
                onClick={() => setSelectedJob(null)}
                className="mb-6 text-stone-800 hover:text-stone-800 transition absolute top-2 right-5 bg-white/80 p-2 rounded-full"
              >
                <span className="text-2xl"><IoIosClose></IoIosClose></span>
              </button>
              </div>
              <div className="w-[90%] bg-white p-5 rounded-2xl relative m-auto -top-15">
                <div className="w-full flex mb-5">
                  <div className="w-[15%]">
                    <div className="w-full min-w-12 shadow-sm">
                      <div className="w-full h-full bg-sky-600 rounded-lg overflow-hidden flex items-center justify-center">
                        {selectedJob.logo && !logoError ? (
                          <img
                            src={selectedJob.logo}
                            alt={selectedJob.company_name}
                            className="object-cover w-full h-full"
                            onError={() => setLogoError(true)}
                          />
                        ) : (
                          <span className="text-white text-4xl font-bold uppercase p-8">
                            {selectedJob.company_name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-[85%] pl-5">
                    <h1 className="text-3xl font-bold text-stone-900">
                      {selectedJob.role}
                    </h1>
                    <h3 className="text-cyan-600 font-medium text-xl">
                      {selectedJob.company_name}
                    </h3>
                    <div className="w-full flex flex-wrap gap-x-5 mt-2">
                      <div className="flex text-sm text-stone-600">
                        <span className="mr-1 shrink-0 font-medium text-lg pt-1.5">
                          <MdOutlineLocationOn />
                        </span>

                        <p className="truncate font-medium text-lg">
                          {selectedJob.location || "Remote"}
                        </p>
                      </div>
                      <div className="flex text-sm text-stone-600">
                        <span className="mr-1 shrink-0 font-medium text-lg pt-1.5">
                          <LiaMoneyBillWaveAltSolid />
                        </span>

                        <p className="truncate font-medium text-lg">
                          {selectedJob.salary}
                        </p>
                      </div>
                      <div className="flex text-sm text-stone-600">
                        <span className="mr-1 shrink-0 font-medium text-lg pt-1.5">
                          <TbCalendarTime  />
                        </span>

                        <p className="truncate font-medium text-lg">
                          {selectedJob.employment_type}
                        </p>
                      </div>
                      <div className="flex text-sm text-stone-600">
                        <span className="mr-1 shrink-0 font-medium text-lg pt-1.5">
                          <BiBriefcase />
                        </span>

                        <p className="truncate font-medium text-lg">
                          {selectedJob.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {selectedJob.keywords &&(
                <div className="w-full border-t border-b  border-stone-200 py-2 mb-5 flex flex-wrap">
                  {selectedJob.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 border border-stone-400 rounded-xl text-sm text-stone-600 bg-stone-100 m-1.5"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
)}
                <div className="prose prose-stone max-w-none">
                 
                  <div dangerouslySetInnerHTML={{ __html: selectedJob.text }} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
