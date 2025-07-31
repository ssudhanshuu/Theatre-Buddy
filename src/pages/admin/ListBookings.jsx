import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { dummyBookingData } from "../../assets/assets";

export default function ListBookings() {
  const currency = import.meta.env.VITE_CURRENCY;

  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookingData = async () => {
    // Simulate API delay if needed
    setTimeout(() => {
      setBooking(dummyBookingData);
      setIsLoading(false);
    }, 500); // Optional delay for realism
  };

  useEffect(() => {
    getAllBookingData();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="p-4 ml-20 md:ml-40 w-full overflow-auto">
        {!isLoading ? (
          booking.length > 0 ? (
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-500">
                <tr>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Movie Name</th>
                  <th className="p-2 border">ShowTime</th>
                  <th className="p-2 border">Seats</th>
                  <th className="p-2 border">Amount</th>
                </tr>
              </thead>
              <tbody>
                {booking.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-500">
                    <td className="p-2 border">{item?.user?.name}</td>
                    <td className="p-2 border">{item.show?.movie?.title}</td>
                    <td className="p-2 border">
                      {item.show?.showDateTime
                        ? `${new Date(
                            item.show.showDateTime
                          ).toLocaleDateString()}
                     ${new Date(item.show.showDateTime).toLocaleTimeString([], {
                       hour: "2-digit",
                       minute: "2-digit",
                     })}`
                        : " "}
                    </td>

                    <td className="p-2 border">
                      {Array.isArray(item.bookedSeats)
                        ? item.bookedSeats.join(", ")
                        : " "}
                    </td>
                    <td className="p-2 border">
                      {currency}
                      {item?.amount}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bookings available.</p>
          )
        ) : (
          <p className="text-gray-500">Loading bookings...</p>
        )}
      </div>
    </div>
  );
}
