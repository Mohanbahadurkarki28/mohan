import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getUserBookings } from "../../api";
import BookingsTable from "../../components/table/bookings-table";

const Bookings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getUserBookings,
  });

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="underline">Bookings</h2>
      {data?.data?.length > 0 && <BookingsTable data={data.data} />}
    </div>
  );
};

export default Bookings;
