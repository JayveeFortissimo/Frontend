import Itemx from "../Components/Items";

const Items = () => {
  return <Itemx/>
}

export default Items;


export const items = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('ID')); // Get userId from local storage

    const response = await fetch(`https://backend-production-62ff.up.railway.app/Items`, {
      method: "POST", // Change to POST to send userId in the request body
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }) // Send userId in the request body
    });

    if (!response.ok) {
      console.error("Failed to fetch data");
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    
    return data.data;  
  } catch (error) {
    console.error("Error fetching items:", error);
    return { error: "Failed to load items" }; 
  }
};

