import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebounce } from "../hooks/use-debounce";

const Search = ({ searchText, setSearchText }) => {
  const [localSearchText, setLocalSearchText] = useState(searchText);

  const debouncedSearchText = useDebounce(localSearchText, 300);

  // Update parent component's search text after debounce
  useEffect(() => {
    setSearchText(debouncedSearchText);
  }, [debouncedSearchText, setSearchText]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalSearchText(newValue);
  };

  return (
    <div className="relative flex items-center gap-2 flex-1">
      <SearchIcon className="absolute left-4" size={20} />
      <input
        type="text"
        value={localSearchText}
        onChange={handleInputChange}
        placeholder="Search for Hostel..."
        className="w-full border p-2 rounded-md px-10"
      />
    </div>
  );
};

export default Search;
