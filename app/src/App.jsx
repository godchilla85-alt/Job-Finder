import { useState } from 'react'

import JobList from './components/JobList'
import Header from './components/Header'
import FilterSection from './components/FilterSection'
import SearchContainer from './components/SearchSection'
import { useJobs } from './hooks/useJobs'

import './App.css'

function App() {
const [filters, setFilters] = useState({
  search: '',
  location: '',
  minSalary: 45,
  maxSalary: 120,
  employmentTypes: [],
  postedWithin: null,
  positions: [],
  experience: [],
  selectedKeywords: []
});
const { jobs, loading } = useJobs();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50">
      
      <Header />

      <div className="flex flex-1 overflow-hidden"> 
        <aside className="lg:w-1/5 w-[35%] py-5 pl-5">
         <FilterSection 
         filters={filters} 
         setFilters={setFilters} 
          jobs={jobs || []}
         />
        </aside>

        <main className="lg:w-4/5 w-[65%] h-full overflow-y-auto p-4">
        <SearchContainer></SearchContainer>
          <JobList 
          filters={filters} 
            jobs={jobs || []} 
            loading={loading}
          />
        </main>

      </div>
    </div>
  )
}

export default App
