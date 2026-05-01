import { SearchField } from "@heroui/react";

export default function SearchContainer({onSearch}){
    return(
        <div>
            <div className="w-full h-full p-5 bg-linear-to-b from-sky-700 to-sky-600 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-white">Discover your ideal career right here!</h2>
                <p className="text-white my-2">Explore opputunities that suit your interests to archieve the career you want</p>
                      <SearchField 
          aria-label="Search aircraft"
          placeholder="Search Jobs..."
          className="w-full"
          onChange={(value) => onSearch(value)}
          onClear={() => onSearch("")}
        >
          <SearchField.Group className="bg-white rounded-full my-2">
            <SearchField.SearchIcon className="ml-2" />
            <SearchField.Input />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>            
                </div>
        </div>
    )
}




