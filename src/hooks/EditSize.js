 import { useState, useEffect } from "react";
import toast from 'react-hot-toast'

 const EditSize = () =>{


    const ID2 = JSON.parse(localStorage.getItem("ID"));

    const [measurements2, setMeasurements2] = useState({
        bust:'',
        waist:'',
        hips:'',
        height:'',
        weight:'',
        user_ID:ID2.id
      });

      
      const handleEdit = async(e) => {
        e.preventDefault();
       
        try{
            const response = await fetch(`https://backend-production-62ff.up.railway.app/editsize/${ID2.id}`,{
                method:'PUT',
                body:JSON.stringify(measurements2),
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(!response.ok) return console.log("Have A Problem at server");

            toast.success("Size Submited")
            setMeasurements2(pro => ({...pro,bust:'',weight:'',waist:'',hips:'',height:''}));

        }catch(error){
            console.log(error);
        }

      };


      useEffect(() =>{

        const valueDefault = async() =>{
       
            try{
                const respionse = await fetch(`https://backend-production-62ff.up.railway.app/getSize/${ID2.id}`,{
                   method:"GET",
                   headers:{
                       'Content-Type':'application/json'
                   }
                })
       
                const data = await respionse.json();
            
                   setMeasurements2(pro => ({...pro, 
                    bust:data.data.Bust,
                    waist:data.data.Waist,
                    hips:data.data.Hips,
                    height:data.data.Height,
                    weight:data.data.Weight}))
       
                   }catch(error){
                  console.log(error)
                   }
           
        }

        valueDefault();

      },[ID2.id]);
      

      return{
        measurements2,
        setMeasurements2,
        handleEdit
      }

 };




 export default EditSize;