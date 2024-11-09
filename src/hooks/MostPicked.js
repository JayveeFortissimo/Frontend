import { useState, useEffect } from "react";

const MostPicked = () => {
  const [mostPicked, setMostPicked] = useState([]);  // Initialize with empty array

  useEffect(() => {
    async function fetchMostPicked() {
      try {
        const response = await fetch('https://frontend-3g30f0t4c-jayveefortissimos-projects.vercel.app/MostPicked', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        // Make sure data is an array
        setMostPicked(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching most picked items:", error);
        setMostPicked([]); // Set empty array on error
      }
    }
    fetchMostPicked();
  }, []);

  return { mostPicked };
};

export default MostPicked;