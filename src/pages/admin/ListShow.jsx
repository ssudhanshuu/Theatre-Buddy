import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Title from "./Title"; // ✅ Import this if you are using it
import { dummyShowsData } from "../../assets/assets";

export default function ListShow() {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [shows, setShow] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShow = async () => {
    try {
      setShow([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShow();
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="p-4 ml-20 w-full">
        {!loading ? (
          <>
            <Title text1="List" text2="Shows" />
            <div className="max-w-4xl mt-6 overflow-x-auto">
              <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
                <thead>
                  <tr className="bg-primary/20 text-left text-white">
                    <th className="p-2 font-medium pl-5">Movie Name</th>
                    <th className="p-2 font-medium pl-5">Show Time</th>
                    <th className="p-2 font-medium pl-5">Total Bookings</th>
                    <th className="p-2 font-medium pl-5">Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {shows.map((show, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700/20 hover:bg-gray-800/10"
                    >
                      <td className="p-2 pl-5">{show?.movie?.title}</td>
                      <td className="p-2 pl-5">
                        {new Date(show?.showDateTime).toLocaleString()}
                      </td>
                      <td className="p-2 pl-5">
                        {Object.keys(show?.occupiedSeats).length}
                      </td>
                      <td className="p-2 pl-5">
                        {currency}
                        {Object.keys(show.occupiedSeats).length *
                          show.showPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-gray-300 mt-10">Loading shows...</div>
        )}
      </div>
    </div>
  );
}
