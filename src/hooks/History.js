import { useState, useEffect } from "react";

const history = (ID)=>{

    const [history, setHistory] = useState([]);

    useEffect(()=>{

        async function data() {
            try{
       
             const response = await fetch(`https://backend-production-024f.up.railway.app/AllHistory/${ID}`,{
               method:'GET',
               headers:{
                 'Content-Type':'application/json'
               }
             })
       
             const datas = await response.json();
          setHistory(datas);
            }catch(error){
             console.log("");
            }
         }
       
         data();
       

    },[]);



    return{
        history
    }


};



export default history;