import { useState, useEffect } from "react";

const Dashboards = () =>{

const [TodaysRented, setTodaysRented] = useState([]);
const [RentedGowns, setRentedGowns] = useState([]);


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

return{
    TodaysRented,
    RentedGowns,
    setTodaysRented,
    setRentedGowns
}


};



export default Dashboards;

