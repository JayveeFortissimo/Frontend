import { useState, useEffect } from "react";

const Dashboards = () =>{

const [TodaysRented, setTodaysRented] = useState([]);
const [RentedGowns, setRentedGowns] = useState([]);
const [pieChart, setPiechar] = useState([])

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
    console.log("Today: ", datas)
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
      console.log("Total: ", datas)
      setRentedGowns(datas);
       
    }catch(error){
      console.log(error);
    }
  
  };
  
  TotalRented();
  
  },[]);


  useEffect(() =>{
    async function PieChart() {
        
      try{
        const response = await fetch(`http://localhost:8000/PieCharts`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        const datas = await response.json();
      
        setPiechar(datas);
         
      }catch(error){
        console.log(error);
      }
    
    };
    
    PieChart();
    
    },[]);

return{
    TodaysRented,
    RentedGowns,
    setTodaysRented,
    setRentedGowns,
    pieChart
}


};



export default Dashboards;

