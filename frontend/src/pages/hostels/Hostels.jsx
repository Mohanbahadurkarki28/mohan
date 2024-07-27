import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

import Filters from "../../components/Filters";
import HostelsMap from "../../components/maps/HostelsMap";
import Search from "../../components/Search";
import SingleHostel from "../../components/SingleHostel";

import { getHostels } from "../../api";

const Hostels = () => {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: getHostels,
  });

  if (isLoading) return <Loader className="animate-spin" />;
  if (data.data.length < 0) {
    return <h2>NO Hostel Registered Yet!!</h2>;
  }

  // Filter hostels based on the search text
  const filteredHostels = data.data.filter((hostel) =>
    hostel.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mx-auto space-y-4 my-10">
      {/* SEARCH AND FILTERS */}
      <div className="w-full flex items-center justify-between gap-2">
        <Search searchText={searchText} setSearchText={setSearchText} />
        <Filters />
      </div>

      <HostelsMap
        hostels={filteredHostels}
        selectedHostel={selectedHostel}
        setSelectedHostel={setSelectedHostel}
      />

      {selectedHostel && <SingleHostel hostel={selectedHostel} />}
    </div>
  );
};

export default Hostels;
