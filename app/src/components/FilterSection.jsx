import { CiFilter } from "react-icons/ci";
import { SalaryRangeSlider } from "./SalarySlider";
import { WorkTypeFilter } from "./WorkTypeFilter";
import { JobPosition } from "./JobPosition";
import  JobPosted  from "./JobPosted";
import { Experience } from "./Expierence";
import KeywordFilter from "./KeywordFilter";

export default function FilterSection({ filters, setFilters, jobs }) {

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    console.log(value)
  };


const allKeywords = jobs.flatMap(job => job.keywords || []);
const keywordOptions = [...new Set(allKeywords)].sort().map(k => ({ id: k, name: k }));
const uniqueKeywords = [...new Set(allKeywords)].sort();


if (!filters) return null;

  return (
    <div className="h-screen w-full flex flex-col bg-stone-200 rounded-xl pt-10 sm:pt-0">
      <div className="w-full border-b border-stone-400 py-2 flex justify-between">
        <div className="flex items-center gap-2">
          <CiFilter className="text-xl" />
          <p className="font-bold">Filters</p>
        </div>
        <button 
          onClick={() => setFilters({
            search: '', location: '', minSalary: 30, maxSalary: 200, employmentTypes: [], postedWithin: null
          })}
          className="text-sky-600 font-bold hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="w-full py-5 flex flex-col gap-10">
        <JobPosted 
        value={filters?.postedWithin} 
        onChange={(val) => updateFilter('postedWithin', val)} 
      />
        
        <SalaryRangeSlider
          value={[filters.minSalary || 45, filters.maxSalary || 120]}
          onChange={(vals) => {
            updateFilter('minSalary', vals[0]);
            updateFilter('maxSalary', vals[1]);
          }} 
        />
        
         <WorkTypeFilter 
        value={filters.employmentTypes || []} 
        onChange={(newValues) => {
          setFilters(prev => ({ ...prev, employmentTypes: newValues }));
        }} 
      />
        
        
       <JobPosition
          value={filters.positions} 
         onChange={(val) => updateFilter('positions', val)}
        />

        <Experience
          value={filters.experience} 
         onChange={(val) => updateFilter('experience', val)}
        />

        <KeywordFilter
  options={keywordOptions}
  selectedKeywords={filters.keywords}
  onSelectionChange={(newList) => updateFilter('keywords', newList)}
/>
      </div>
    </div>
  );
}