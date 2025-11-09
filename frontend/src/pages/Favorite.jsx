<<<<<<< HEAD
// Favorite.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import MovieCard from "../component/MovieCard";

export default function Favorite() {
  const { getToken, isSignedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchFavorites() {
      if (!isSignedIn) return;

      try {
        // 🔑 Use your JWT template name here
        const token = await getToken({ template: "my-backend" });
        console.log("JWT for API:", token);

        const res = await fetch(`${API_URL}/api/user/favorites/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const body = await res.text();
          throw new Error(`Fetch failed: ${res.status} ${body}`);
        }

        const { favorites } = await res.json();
        setFavorites(favorites);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    }

    fetchFavorites();
  }, [isSignedIn, getToken, API_URL]);

  return (
    <div>
      <h2>My Favorites</h2>
      <div className="grid">
        {favorites.length
          ? favorites.map((m) => <MovieCard key={m._id} movie={m} />)
          : <p>No favorites added yet.</p>}
      </div>
    </div>
  );
}
=======
import React from 'react'

function Favorite() {
  return (
    <div>Favorite</div>
  )
}

export default Favorite
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
