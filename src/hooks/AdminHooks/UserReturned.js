import { useEffect } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const userReturnedItems = (setToReturn, toReturn, userEmail) => {

    useEffect(() => {
       
        const socket = io('https://backend-production-d6a2.up.railway.app'); 
        socket.on('itemRemoved', (id) => {
            const filtered = toReturn.filter(pro => pro.id !== id);
            setToReturn(filtered);
            toast.success(`Item with ID ${id} has been removed`);
        });

        return () => {
            socket.off('itemRemoved');
            socket.disconnect()
        };
        
    }, [toReturn, setToReturn]);


    const Remove = async (id) => {
        try {
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/itemsRemoved/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return console.log("Have A Problem");

        } catch (error) {
            console.log(error);
        }
    };


   const MessageThankyou = async() =>{

  try{
  const response  = await fetch(`https://backend-production-d6a2.up.railway.app/thankyou`,{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        email:userEmail
    })
  })

  if(!response.ok) return console.log("Cannot Send Emails");

  }catch(error){
   console.log(error);
  }

   }


    const PushHistory = async (e, pro) => {
        e.preventDefault();

        MessageThankyou();
        Remove(pro.returnID);

        toast.success("USER RETURNED THE ITEMS");

        const dataPenalty = {
            product_Name: pro.product_Name,
            picture: pro.picture,
            start_Date: new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
            return_Date: new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
            status: pro.status,
            user_ID: pro.user_ID,
            penalty: pro.penalty,
            quantity:pro.quantity,
            price:pro.price,
            code:pro.code,
            name:pro.name,
            size:pro.size,
            item_id:pro.item_id,
            subTotal:pro.subTotal
        };

        try {
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/to_History`, {
                method: "POST",
                body: JSON.stringify(dataPenalty),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return console.log("Have A server problem");

        } catch (error) {
            console.log(error);
        }
    };


 

    const pushAutoMatically = async(qrCodeData) =>{
         
        MessageThankyou();
        Remove(qrCodeData.returnID);
       toast.success("USER RETURNED THE ITEMS");
  
        const allDatas = {
            product_Name: qrCodeData.product_Name,
            picture: qrCodeData.picture,
            start_Date: new Date(Date.UTC(new Date(qrCodeData.start_Date).getFullYear(), new Date(qrCodeData.start_Date).getMonth(), new Date(qrCodeData.start_Date).getDate())).toISOString().split('T')[0],
            return_Date: new Date(Date.UTC(new Date(qrCodeData.return_Date).getFullYear(), new Date(qrCodeData.return_Date).getMonth(), new Date(qrCodeData.return_Date).getDate())).toISOString().split('T')[0],
            status: qrCodeData.status,
            user_ID: qrCodeData.user_ID,
            penalty: qrCodeData.penalty,
            quantity:qrCodeData.quantity,
            price:qrCodeData.price,
            code:qrCodeData.code,
            name:qrCodeData.name,
            size:qrCodeData.size,
            item_id:qrCodeData.item_id,
            subTotal:qrCodeData.subTotal
        };

        try {
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/to_History`, {
                method: "POST",
                body: JSON.stringify(allDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return console.log("Have A server problem");

            toast.success("Success");

        } catch (error) {
            console.log(error);
        }
    }




    const PushHistoryNoQRCODE = async (e, pro) => {
        e.preventDefault();
        
        MessageThankyou();
        Remove(pro.returnID);

        toast.success("USER RETURNED THE ITEMS");

        const dataPenalty = {
            product_Name: pro.product_Name,
            picture: pro.picture,
            start_Date: new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
            return_Date: new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
            status: "NO QRCODE",
            user_ID: pro.user_ID,
            penalty: 1000,
            quantity:pro.quantity,
            price:pro.price,
            code:pro.code,
            name:pro.name,
            size:pro.size,
            item_id:pro.item_id,
            subTotal:pro.subTotal
        };

        try {
            const response = await fetch(`https://backend-production-d6a2.up.railway.app/to_History`, {
                method: "POST",
                body: JSON.stringify(dataPenalty),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return console.log("Have A server problem");

        } catch (error) {
            console.log(error);
        }
    };


    return {
        PushHistory,
        pushAutoMatically,
        PushHistoryNoQRCODE
    };
}

export default userReturnedItems;






