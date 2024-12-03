import { useState, useEffect } from "react";

const Dashboards = () =>{

const [TodaysRented, setTodaysRented] = useState([]);
const [RentedGowns, setRentedGowns] = useState([]);
const [cancels,setCancels] = useState([]);
const [AllGraph, setGraph] = useState([]);
const [AllHistory, setAllhistory] = useState([]);
const [AllDress, setAlldress] = useState([]);
const [revenue,setRentalRevenue] = useState([]);

useEffect(() =>{
async function TodaysRented() {
  try{
    const response = await fetch(`https://backend-production-d6a2.up.railway.app/Today`,{
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
      const response = await fetch(`https://backend-production-d6a2.up.railway.app/totalReserves`,{
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
        const response = await fetch(`https://backend-production-d6a2.up.railway.app/AllCancelled`,{
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
          const response = await fetch(`https://backend-production-d6a2.up.railway.app/AllTrends`,{
              method:'GET',
              headers:{
                  'Content-Type':'application/json'
              }
          });
      
          const datas = await response.json();
          setGraph(datas);
           
        }catch(error){
          console.log(error);
        }
      
      };
      Graph();
      
      },[]);


      useEffect(() =>{
        async function AllHistory() {
            
          try{
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/DashboardHistory`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            });
        
            const datas = await response.json();
            setAllhistory(datas);
             
          }catch(error){
            console.log(error);
          }
        
        };
        AllHistory();
        
        },[]);



        useEffect(() =>{
          async function AllDress() {
              
            try{
              const response = await fetch(`https://backend-production-d6a2.up.railway.app/numberOfItems`,{
                  method:'GET',
                  headers:{
                      'Content-Type':'application/json'
                  }
              });
          
              const datas = await response.json();
              setAlldress(datas);
               
            }catch(error){
              console.log(error);
            }
          
          };
          AllDress();
          
          },[]);

return{
    TodaysRented,
    RentedGowns,
    setTodaysRented,
    setRentedGowns,
    cancels,
    setCancels,
    AllGraph,
     setGraph,
     AllHistory,
      setAllhistory,
      AllDress, 
      setAlldress
}


};



export default Dashboards;

