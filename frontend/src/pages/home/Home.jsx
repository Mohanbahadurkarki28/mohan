import { useQuery } from "@tanstack/react-query";
import Hero from "../../components/Hero";
import HostelCarousel from "../../components/carousel/hostel-carousel";

import { Loader2 } from "lucide-react";
import { getHostels } from "../../api";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: getHostels,
  });

  if (isLoading) return <Loader2 className="animate-spin" />;
  return (
    <div>
      <Hero />

      {/* HOSTELS */}
      <div className="w-11/12 mx-auto grid sm:grid-cols-4 gap-4 my-10">
        {data.data.map((hostel) => (
          <HostelCarousel key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
