import { toast } from 'react-hot-toast';

const Items_Approved = (alldatas,setAlldata,userID) =>{




//! FOR SMS Message
  const sendSMSNotification = async (to, message) => {
    try {
        const response = await fetch('http://localhost:8000/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to, message }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('SMS sent successfully:', data.messageId);
        } else {
            console.error('Error sending SMS:', data.error);
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};


  const DELETE = async(e,pro) =>{

    e.preventDefault()
  
      try{

          const response = await fetch(`http://localhost:8000/removeIncheck/${pro.id}`,{
               method:"delete",
               headers:{
                  'Content-Type':'application/json'
               }
          });

          if(!response.ok) return console.log("Have A server problem");

      }catch(error){
          console.log(error);
      }

  }

  const PushToApprove = async(e,pro) =>{
    e.preventDefault();

      DELETE(e,pro);
      //sendSMSNotification(`+639604099126`, 'Your gown reservation has been confirmed!');


      const DateNows = new Date();
      
      try{

          const response = await fetch(`http://localhost:8000/ItemsApproved`,{
               method:"POST",

               body:JSON.stringify({
                product_Name:pro.product_Name,
                start_Date:new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
                return_Date:new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
                status:"Approved",
                user_ID:userID.data1[0].id,
                picture:pro.picture,
                returned:"ON GOING",
                payment_Method:pro.payment_Method,
                PD:pro.PD,
                product_ID:pro.id,
                statusPickuped:"THIS ITEM NOT PICKUPED YET",
                quantity:pro.quantity,
                size:pro.size,
                subTotal:pro.subTotal,
                code:pro.code,
                price:pro.price,
                Today: new Date(Date.UTC(DateNows.getFullYear(), DateNows.getMonth(), DateNows.getDate())).toISOString().split('T')[0],
            }),
               headers:{
                  'Content-Type':'application/json'
               }
          });


          if(!response.ok) return toast.error("Have A server problem");
           toast.success("Items Approved!");
       

      }catch(error){
          console.log(error);
      }

  }

//!ADD Message Here
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