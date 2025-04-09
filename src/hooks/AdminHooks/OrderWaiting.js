import { useState, useEffect } from "react";


const OrderWaiting = (user_ID) =>{

    const [orders, setOrders] = useState([]);

useEffect(() =>{

async function AllOrders() {
      
    try{

    const responnse = await fetch(`https://backend-production-62ff.up.railway.app/orders/${user_ID}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    });

    const data = await responnse.json();

   const Datas = data.result.filter(
    order => order.status === "Waiting for approval"
  );

     setOrders(Datas)

    }catch(error){
        console.log(error);
    }
}

AllOrders();

},[]);


return{
    orders,
    setOrders
}


}


export default OrderWaiting;