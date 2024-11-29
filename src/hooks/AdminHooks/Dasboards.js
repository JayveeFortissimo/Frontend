import { useState, useEffect } from "react";

const Dashboards = () =>{

const [TodaysRented, setTodaysRented] = useState([]);
const [RentedGowns, setRentedGowns] = useState([]);
const [cancels,setCancels] = useState([]);
const [AllGraph, setGraph] = useState([]);

useEffect(() =>{
async function TodaysRented() {
  try{
    const response = await fetch(`http://localhost:8000/Today`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    const datas = await response.json();
     setTodaysRented(datas);
     
  }catch(error){
    console.log(error);
  }

};

TodaysRented();

},[]);



useEffect(() =>{
  async function TotalRented() {
      
    try{
      const response = await fetch(`http://localhost:8000/totalReserves`,{
          method:'GET',
          headers:{
              'Content-Type':'application/json'
          }
      });
  
      const datas = await response.json();
      setRentedGowns(datas);
       
    }catch(error){
      console.log(error);
    }
  
  };
  
  TotalRented();
  
  },[]);


  useEffect(() =>{
    async function Cancellation() {
        
      try{
        const response = await fetch(`http://localhost:8000/AllCancelled`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        const datas = await response.json();
        setCancels(datas);
         
      }catch(error){
        console.log(error);
      }
    
    };
    
    Cancellation();

    },[]);


    useEffect(() =>{
      async function Graph() {
          
        try{
          const response = await fetch(`http://localhost:8000/AllTrends`,{
              method:'GET',
              headers:{
                  'Content-Type':'application/json'
              }
          });
      
          const datas = await response.json();
          console.log(datas)
          setGraph(datas);
           
        }catch(error){
          console.log(error);
        }
      
      };
      Graph();
      
      },[]);

return{
    TodaysRented,
    RentedGowns,
    setTodaysRented,
    setRentedGowns,
    cancels,
    setCancels,
    AllGraph,
     setGraph
}


};



export default Dashboards;

