import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

import { getHostel } from "../../api";
import HostelMap from "../../components/maps/HostelMap";
import SingleHostel from "../../components/SingleHostel";

const Hostel = () => {
  const { hostelId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["hostels", hostelId],
    queryFn: () => getHostel(hostelId),
  });

  if (isLoading) return <Loader className="animate-spin" />;

  const hostel = data.data;

  return (
    <div className="container mx-auto">
      <SingleHostel hostel={hostel} />
      <HostelMap hostel={hostel} />
    </div>
  );
};

export default Hostel;
