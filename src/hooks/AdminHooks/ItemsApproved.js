import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import io from 'socket.io-client';
import {Sidebars}from '../../Store/Side.js';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Items_Approved = (orders, setOrders, userID) =>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:8000');
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('newCheckOut', (data) => {
      console.log(data)
      setOrders(prevOrders => [...prevOrders, ...data.checkouts]);
      
    });

    return () => {
      socket.off('newCheckOut');
      socket.disconnect();
    };
  }, []);



  const PushToApprove = async(e,pro) =>{
    e.preventDefault();
   
      try{

          const response = await fetch(`http://localhost:8000/ItemsApproved`,{
               method:"PUT",

               body:JSON.stringify({
                product_Name:pro.product_Name,
                start_Date:new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
                return_Date:new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
                status:"Approved",
                user_ID:userID.data1[0].id,
                picture:pro.picture,
                returned:"ON GOING",
                product_ID:pro.id,
                statusPickuped:"THIS ITEM NOT PICKUPED YET",
            }),
               headers:{
                  'Content-Type':'application/json'
               }
          });

          if(!response.ok) return toast.error("Have A server problem");
           toast.success("Items Approved!");
           dispatch(Sidebars.Activity('History'));
       
      }catch(error){
          console.log(error);
      }

  }



//!DEcline Cancellations Here


const DELETE = async(e,pro) =>{
  e.preventDefault();

    try{
        const response = await fetch(`http://localhost:8000/removeIncheck/${pro.id}`,{
             method:"delete",
             headers:{
                'Content-Type':'application/json'
             }
        });

        if(!response.ok) return console.log("Have A server problem");

        navigate('/admin')

    }catch(error){
        console.log(error);
    }
}



  const DeclineReserve = async(e,pro) =>{
    e.preventDefault();
    DELETE(e,pro)
    try{

        const response = await fetch(`http://localhost:8000/cancelled`,{
           method:"POST",
           body:JSON.stringify({
               picture:pro.picture,
               name:pro.product_Name,
               price:pro.price,
               start_Date:pro.start_Date,
               return_Date:pro.return_Date,
               user_ID:pro.user_ID,
               quantity:pro.quantity,
               Reason:"ADMIN DECLINE",
               status:"WAITING FOR REFUND",
               item_id:pro.item_id,
               size:pro.size,
               id:pro.id,
               code:pro.code,
               sub_Total:pro.subTotal
           }),
           headers:{
               'Content-Type':'application/json'
           }
        });

        if(!response.ok) return console.log("Failed to Cancelled");
       
        
         }catch(error){
             console.log(error);
         } 
  
   
};


return{
  PushToApprove,
  DeclineReserve
}


};



export default Items_Approved;