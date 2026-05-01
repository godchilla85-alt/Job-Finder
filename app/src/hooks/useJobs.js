import { useState, useEffect } from "react";
import { fetchJobs } from "../api/findwork";


function addFakeData(job) {
  const minSalary = Math.floor(Math.random() * (70 - 45 + 1) + 45);
  const salary = `${minSalary}k - ${minSalary + 20}k`;
  let workMode = job.remote ? "Remote" : (Math.random() > 0.5 ? "Hybrid" : "Office");
  let experience = job.experience 
  ? job.experience.toLowerCase() 
  : (Math.random() < 0.33 
      ? "Entry Level" 
      : Math.random() < 0.66 
        ? "Intermediate" 
        : "Senior");
const employment_type = job.employment_type 
    ? job.employment_type.toLowerCase() 
    : (Math.random() > 0.5 ? "full time" : "part time");

  return {
    ...job,
    salary,
    workMode,
    experience,
    employment_type
  };
}

export function useJobs(filters = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await fetchJobs(filters);
        const rawResults = data.results || [];

        const cleanJobs = rawResults.filter(job => 
          job.role && job.role.trim() !== ""
        );

        const finalJobs = cleanJobs.map(job => addFakeData(job));

        setJobs(finalJobs);
      } catch (error) {
        console.error("Fehler beim Verarbeiten der Jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [JSON.stringify(filters)]);
  return { jobs, loading };
}