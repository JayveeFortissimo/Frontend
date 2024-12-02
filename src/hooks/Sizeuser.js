import { useState } from "react";
import toast from 'react-hot-toast';


const SizeUser = (navigate) =>{

    const ID = JSON.parse(localStorage.getItem("ID"));

    const [measurements, setMeasurements] = useState({
        bust:'',
        waist:'',
        hips:'',
        height:'',
        weight:'',
        user_ID:ID.id
      });


      const handleChange = (type,value) => {
       setMeasurements(size =>{
        return{
            ...size,
            [type]:value
        }
       })
      };

      
      const handleSubmit = async(e) => {
        e.preventDefault();
       
        try{
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/sendSize`,{
                method:'POST',
                body:JSON.stringify(measurements),
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(!response.ok) return console.log("Have A Problem at server");

            toast.success("Size Submited")
            setMeasurements(pro => ({...pro,bust:'',weight:'',waist:'',hips:'',height:''}));
           
            localStorage.removeItem("SID");
    
            navigate('/profile');

        }catch(error){
            console.log(error);
        }

      };


      const handleSubmitLater = async(e) => {
        e.preventDefault();
       
        try{
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/sendSize`,{
                method:'POST',
                body:JSON.stringify({
                    bust:0,
                    waist:0,
                    hips:0,
                    height:0,
                    weight:0,
                    user_ID:ID.id
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(!response.ok) return console.log("Have A Problem at server");

            toast.success("Size Submited");

            setMeasurements(pro => ({...pro,bust:'',weight:'',waist:'',hips:'',height:''}));

            localStorage.removeItem("SID");

           navigate('/profile')

        }catch(error){
            console.log(error);
        }

      };

return{
    handleChange,
    handleSubmit,
    measurements,
    handleSubmitLater
}


};




export default SizeUser;