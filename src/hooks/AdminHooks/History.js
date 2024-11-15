import { useState,useEffect } from "react";

const HistoryOfUser = (ID) =>{
      
    const [allDatas, setAllDatas] = useState([]);
    const [toReturn, setToReturn] = useState([]);
    
   
    useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000//ApprovedItems/${ID}`);
          const data = await response.json();

          const dateOfNow = new Date();
  
          const approvedDatas = [];
          const returnTodayData = [];
  
          data.forEach(pro => {
            const returnDate = new Date(pro.return_Date);
  
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

    
    //!MAG LALAGAY PA KO MESSAGES

    const deletedItems = async(id) =>{
       try{
       const response = await fetch(`http://localhost:8000//removeGrace/${id}`,{
        method:"DELETE",
        headers:{
          'Content-Type':'application/json'
        },
        //!BAKA MAGKA ERROR AHH DAHIL SA ID
        body:JSON.stringify({user_ID:ID})
       });

       if(!response.ok) return console.log("CANNOT DELETE ITEMS");
       }catch(error){
        console.log(error);
       }
    }


  
    return { allDatas, toReturn, setAllDatas, setToReturn, deletedItems };
    
};


export default HistoryOfUser;