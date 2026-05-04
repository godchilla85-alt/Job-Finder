import { useState } from "react";
import JobList from "./components/JobList";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
import SearchContainer from "./components/SearchSection";
import { useJobs } from "./hooks/useJobs";
import { IoFilter, IoClose } from "react-icons/io5";

import "./App.css";

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    minSalary: 45,
    maxSalary: 120,
    employmentTypes: [],
    postedWithin: null,
    positions: [],
    experience: [],
    selectedKeywords: [],
  });

  const { jobs, loading } = useJobs();

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gray-50 relative">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        <aside
          className={`
          lg:w-1/5 sm:w-[35%] py-5 pl-5 h-full z-50

          fixed inset-y-0 left-0 w-[85%] bg-gray-50 transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
          
          sm:relative sm:translate-x-0 sm:visible sm:flex
        `}
        >
          <div className="w-full h-full bg-stone-200 rounded-xl p-4 overflow-y-auto relative">
            <button
              className="sm:hidden absolute right-4 top-4 p-2 bg-white rounded-full shadow-md"
              onClick={() => setIsFilterOpen(false)}
            >
              <IoClose size={20} />
            </button>

            <FilterSection
              filters={filters}
              setFilters={setFilters}
              jobs={jobs || []}
            />
          </div>
        </aside>

        <main className="flex-1 h-full overflow-y-auto p-4 w-full">
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-stone-800 text-white px-4 py-2.5 rounded-xl w-full justify-center font-medium active:scale-95 transition"
            >
              <IoFilter /> Filter anpassen
            </button>
          </div>

          <SearchContainer />

          <JobList filters={filters} jobs={jobs || []} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default App;
