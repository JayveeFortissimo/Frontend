import { useState, useEffect } from "react";

const Dashboards = () =>{

const [TodaysRented, setTodaysRented] = useState([]);
const [RentedGowns, setRentedGowns] = useState([]);
const [cancels,setCancels] = useState([]);
const [AllGraph, setGraph] = useState([]);
const [AllHistory, setAllhistory] = useState([]);
const [AllDress, setAlldress] = useState([]);
const [revenue,setRentalRevenue] = useState([]);
const [PieChart,setPieChart] = useState([]);

useEffect(() =>{
async function TodaysRented() {
  try{
    const response = await fetch(`https://backend-production-62ff.up.railway.app/Today`,{
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
      const response = await fetch(`https://backend-production-62ff.up.railway.app/totalReserves`,{
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
        const response = await fetch(`https://backend-production-62ff.up.railway.app/AllCancelled`,{
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
          const response = await fetch(`https://backend-production-62ff.up.railway.app/AllTrends`,{
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
            const response = await fetch(`https://backend-production-62ff.up.railway.app/DashboardHistory`,{
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
              const response = await fetch(`https://backend-production-62ff.up.railway.app/numberOfItems`,{
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


          useEffect(() =>{
            async function AllIncome() {
                
              try{
                const response = await fetch(`https://backend-production-62ff.up.railway.app/TotalIncome`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
            
                const datas = await response.json();
                setRentalRevenue(datas);
                 
              }catch(error){
                console.log(error);
              }
            
            };
            AllIncome();
            },[]);



            useEffect(() =>{
              async function SalesTrack() {
                  
                try{
                  const response = await fetch(`https://backend-production-62ff.up.railway.app/PieChart`,{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json'
                      }
                  });
              
                  const datas = await response.json();
                  console.log(datas)
                  setPieChart(datas);
                   
                }catch(error){
                  console.log(error);
                }
              
              };
              SalesTrack();
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
      setAlldress,
      revenue,
      PieChart
}


};



export default Dashboards;

