import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const EditSize = () => {

  const ID2 = JSON.parse(localStorage.getItem("ID"));

  const [measurements2, setMeasurements2] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
    weight: '',
    user_ID: ID2.id
  });

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://backend-production-d6a2.up.railway.app/editsize/${ID2.id}`, {
        method: 'PUT',
        body: JSON.stringify(measurements2),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) return console.log("There was a problem with the server");

      toast.success("Size Submitted");

      // Clear input fields after submission
      setMeasurements2({
        bust: '',
        waist: '',
        hips: '',
        height: '',
        weight: '',
        user_ID: ID2.id
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-production-d6a2.up.railway.app/getSize/${ID2.id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        setMeasurements2({
          ...measurements2,
          bust: data.data.Bust,
          waist: data.data.Waist,
          hips: data.data.Hips,
          height: data.data.Height,
          weight: data.data.Weight
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ID2.id]);

  return {
    measurements2,
    setMeasurements2,
    handleEdit
  };
};

export default EditSize;
