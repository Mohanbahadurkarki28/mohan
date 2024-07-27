import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getAllBookings } from "../api";
import BookingsTable from "./table/bookings-table";

const AllBookings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-4 my-10">
      <h2 className="underline">Bookings</h2>
      {data?.data?.length > 0 && <BookingsTable data={data?.data} />}
    </div>
  );
};

export default AllBookings;
