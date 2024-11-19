import { useState,useEffect, useRef } from "react";
import {useSelector} from 'react-redux';
import toast from 'react-hot-toast';
import io from "socket.io-client";

const profileDetails = (SizeName) =>{

//If you have a problem here Yung sa profile componnets tignan mo
  const ID = JSON.parse(localStorage.getItem("ID"));  
        //SAmay checkout to
    const [allOrders,setAllOrders] = useState([]);

    const [reasonCacell,setReasonCancel] = useState("");

    const [dataCancel, setDataCancel] = useState([]);
   
    const [allSize,setAllsize] = useState([]);
    //Samay Push Cancel
    const dataOut = useSelector(state => state.Cancel.items);

    const [time, setTime] = useState('');
    const date2 = new Date();
    // Extract date
  const year = date2.getFullYear();
  const month = (date2.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date2.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const dates = new Date(formattedDate)

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
const Starto =  dates.toLocaleDateString('en-US', options);

const socket = useRef(null);

  //For time
  //!ARALIN MO TO
  useEffect(() => {
 
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime()

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  
    useEffect(()=>{

        async function data() {
           try{
      
            const response = await fetch(`http://localhost:8000/orders/${ID.id}`,{
              method:'GET',
              headers:{
                'Content-Type':'application/json'
              }
            })
      
            const datas = await response.json();
         
            setAllOrders(datas.result);
           }catch(error){
            console.log("");
           }
        }
      
        data();
      
      },[]);


      useEffect(()=>{

        async function Size() {
          try{
     
           const response = await fetch(`http://localhost:8000/Size/${SizeName.id}`,{
             method:'GET',
             headers:{
               'Content-Type':'application/json'
             }
           })
     
           const datas = await response.json();
           setAllsize(datas.data);
          }catch(error){
            //!MAY ERROR D2 TIGNAN MO NALANG
           console.log("");
          }
       }
     
       Size();
        
      },[]);


      useEffect(() => {
        
        socket.current = io("http://localhost:8000"); 

        socket.current.on('canceled', (data) => {
          console.log('Item canceled:', data);
          setAllOrders((prevOrders) => prevOrders.filter(order => order.id !== data.id));
          setDataCancel((prevOrders) => [...prevOrders, data]);
        });

      socket.current.on('statusUpdated', ({ id, status }) => {
        setDataCancel(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, status } : item
          )
        );
      });
      
        return () => {
          socket.current.off('canceled');
          socket.current.off('statusUpdated');
            socket.current.disconnect();
        };
    }, []);


     
    //!!!!!!!!!!!!!!!!Push Cancelled
const PushToHistoryCancel = async(e) =>{
    
    e.preventDefault();

  if(reasonCacell === ""){
    toast.error("Please select Reason");
  }else{

    try{

        const response = await fetch(`http://localhost:8000/cancelled`,{
           method:"POST",
           body:JSON.stringify({
               picture:dataOut.picture,
               name:dataOut.name,
               price:dataOut.price,
               start_Date:dataOut.start,
               return_Date:dataOut.finish,
               user_ID:dataOut.user_ID,
               quantity:dataOut.quantity,
               Reason:reasonCacell,
               status:"WAITING FOR REFUND",
               item_id:dataOut.item_id,
               size:dataOut.size,
               id:dataOut.id,
               code:dataOut.code,
               sub_Total:dataOut.sub_Total
           }),
           headers:{
               'Content-Type':'application/json'
           }
        });

        if(!response.ok) return console.log("Failed to Cancelled");
       
        
         }catch(error){
             console.log(error);
         } 
  }
   
};


//Get History of user
useEffect(()=>{
  const allCancell = async() =>{

    try{
    
      const response = await fetch(`http://localhost:8000/allCanceled/${ID.id}`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json'
        }
      });

      const datas = await response.json();

      if(!response.ok) return console.log('Cacelled Item not retrived');

      setDataCancel(datas.result);
       
    }catch(error){
      console.log("");
    }
    
    }

    allCancell();

},[]);


const [allNotif, setAllnotifs] = useState([]);

// NOTIFS
useEffect(()=>{
  const allNotifs = async() =>{

    try{
    
      const response = await fetch(`http://localhost:8000/notifications/${ID.id}`,{
        method:"GET",
        headers:{
          'Content-Type':'application/json'
        }
      });

      const datas = await response.json();
      setAllnotifs(datas)

      if(!response.ok) return console.log('HAVE A PROBLEM HERE');

    
       
    }catch(error){
      console.log("");
    }
    
    }

    allNotifs();

},[]);


      
return{
    allOrders,
    PushToHistoryCancel ,
    setReasonCancel,
    dataCancel,
    allSize,
    time,
    Starto,
    setAllOrders,
    allNotif, 
    setAllnotifs,
    setDataCancel
}

};



export default profileDetails;