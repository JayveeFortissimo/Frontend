import { useState, useEffect } from "react";


const RefferalPoints = () =>{

  const [allPoints, setAllpoints] = useState([]);
   
  const ID = JSON.parse(localStorage.getItem("ID"));
   
  useEffect(()=>{

    async function allDatas() {
          
        try{
     const response = await fetch(`http://localhost:8000/allRefferer/${ID.id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
     });
 
    const data = await response.json();

    setAllpoints(data);

        }catch(error){
            console.log(error);
        }


    }

    allDatas();

  },[]);



  const Refresh = async(e) =>{
      e.preventDefault();
    try{
      const response = await fetch(`http://localhost:8000/Refresh/${ID.id}`,{
         method:'DELETE',
         headers:{
             'Content-Type':'application/json'
         }
      });
  
         if(!response.ok) return console.log("HAVE A  PROBLEM HERE")
         }catch(error){
             console.log(error);
         }

  }


return { allPoints, Refresh }


};



export default RefferalPoints;