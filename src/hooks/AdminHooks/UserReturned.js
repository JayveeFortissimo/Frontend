import { useEffect } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const userReturnedItems = (setToReturn, toReturn) => {

    useEffect(() => {
       
        const socket = io('https://backend-production-024f.up.railway.app'); 

        socket.on('itemRemoved', (id) => {
            console.log(id);
            console.log(toReturn)
            const filtered = toReturn.filter(pro => pro.id !== id);
            setToReturn(filtered);
            toast.success(`Item with ID ${id} has been removed`);
        });

        return () => {
            socket.off('itemRemoved');
        };
        
    }, [toReturn, setToReturn]);


    const Remove = async (id) => {
        try {
            const response = await fetch(`https://backend-production-024f.up.railway.app/itemsRemoved/${id}`, {
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
            quantity:pro.quantity
        };

        try {
            const response = await fetch(`https://backend-production-024f.up.railway.app/to_History`, {
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




       //! FOR SMS Message
       const sendSMSNotification = async (to, message) => {
        try {
            const response = await fetch('https://backend-production-024f.up.railway.app/send-sms', {
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
    
 

    const pushAutoMatically = async(qrCodeData) =>{
       
        Remove(qrCodeData.returnID);
       toast.success("USER RETURNED THE ITEMS");
    // sendSMSNotification('+639604099126',`THANK YOU VERY MUCH https://docs.google.com/forms/d/e/1FAIpQLSc30TriVIQ-VrjBh_UwLdecsc79nV3ftHREcer79aHiBUr1Bw/viewform?usp=sf_link`);

        const allDatas = {
            product_Name: qrCodeData.product_Name,
            picture: qrCodeData.picture,
            start_Date: new Date(Date.UTC(new Date(qrCodeData.start_Date).getFullYear(), new Date(qrCodeData.start_Date).getMonth(), new Date(qrCodeData.start_Date).getDate())).toISOString().split('T')[0],
            return_Date: new Date(Date.UTC(new Date(qrCodeData.return_Date).getFullYear(), new Date(qrCodeData.return_Date).getMonth(), new Date(qrCodeData.return_Date).getDate())).toISOString().split('T')[0],
            status: qrCodeData.status,
            user_ID: qrCodeData.user_ID,
            penalty: qrCodeData.penalty,
            quantity:qrCodeData.quantity
        };

        try {
            const response = await fetch(`https://backend-production-024f.up.railway.app/to_History`, {
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

        //console.log("IDS" , pro.ID)
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
            code:pro.code
        };

        try {
            const response = await fetch(`https://backend-production-024f.up.railway.app/to_History`, {
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






