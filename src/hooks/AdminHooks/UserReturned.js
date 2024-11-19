import { useEffect } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const userReturnedItems = (setToReturn, toReturn) => {

    useEffect(() => {
       
        const socket = io('http://localhost:8000'); 

        socket.on('itemRemoved', (id) => {
            console.log(id);
            console.log(toReturn)
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
            const response = await fetch(`http://localhost:8000/itemsRemoved/${id}`, {
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


    const PushHistory = async (e, pro) => {
        e.preventDefault();

        console.log("IDS" , pro.ID)
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
        };

        try {
            const response = await fetch(`http://localhost:8000/to_History`, {
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
            code:qrCodeData.code
        };

        try {
            const response = await fetch(`http://localhost:8000/to_History`, {
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
        };

        try {
            const response = await fetch(`http://localhost:8000/to_History`, {
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






