  import { useState, useEffect } from "react";

  const MostPicked = () =>{

    const [mostPicked, setMostPicked] = useState([]);
   
   useEffect(()=>{

      async function Mostpicked(){

        try{
           const response = await fetch(`https://backend-production-024f.up.railway.app/MostPicked`,{
            method:"GET",
            headers:{
              'Content-Type':'application/json'
            }
           })

           const data = await response.json();
 
             setMostPicked(data);

        }catch(error){
          console.log(error);
        }

      }

      Mostpicked();

            },[]);


            return{
              mostPicked
            }


  };


  export default MostPicked;