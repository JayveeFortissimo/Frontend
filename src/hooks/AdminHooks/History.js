import { useState,useEffect } from "react";

const HistoryOfUser = (ID) =>{
      
    const [allDatas, setAllDatas] = useState([]);
    const [toReturn, setToReturn] = useState([]);
    
   
    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/ApprovedItems/${ID}`);
          const data = await response.json();
  
          const approvedDatas = [];
          const returnTodayData = [];
  
          data.forEach(pro => {
  
            if (pro.Pickuped === "ITEM PICKED UP ALREADY") {
              returnTodayData.push(pro);
            } else if(pro.Pickuped === "THIS ITEM NOT PICKUPED YET"){
                approvedDatas.push(pro)
            }
          });
  
          setAllDatas(approvedDatas);   
          setToReturn(returnTodayData);  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [ID]);

    
  
    return { allDatas, toReturn, setAllDatas, setToReturn };
    
};


export default HistoryOfUser;