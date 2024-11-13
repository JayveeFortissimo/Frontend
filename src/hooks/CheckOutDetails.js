import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DetailCheck = (allOrders) =>{

     //! Tiwala lang makakapasa tayo manalig lang tayo kay lord

     const [allDatas,setAll] = useState([]);

     const [Payment,setPayment] = useState("");
   
     const ID = JSON.parse(localStorage.getItem("ID"));     
   
     const SecurityDeposit = 200;

  const now = new Date();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const DATEOFNOW = now.toLocaleDateString('en-US', options);

  const dateNow = DATEOFNOW;


    useEffect(()=>{
        async function info(){
            try{
                const response = await fetch(`https://backend-production-024f.up.railway.app/profile/${ID.id}`,{
                    method:"GET",
                    headers:{
                      authorization: "Bearer " + ID.token
                    }
                });
                         
                if(!response.ok) return console.log("Data Cannot Retrive");
            
                const data = await response.json();
                setAll(data);
                 
              }catch(error){
                console.log(error);
              }
                }
        info()

    },[ID.id, ID.token]);



//FOR CODE PURPOSES
    function generateRandomWord(length) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      let word = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        word += letters[randomIndex];
      }
      return word;
    }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!FOR PAYMENTS D2 ko lallagay Final total
async function Payments(e,payment,Type,sameCode){
   e.preventDefault();
  try{
    const response = await fetch(`https://backend-production-024f.up.railway.app/userPayment`,{
      method:"POST",
      body:JSON.stringify({
        DATENOW:dateNow,
         payment: payment,
         Security:SecurityDeposit,
          Type:Type,
           user_ID:ID.id,
           code:sameCode
      }),
      headers:{
        'Content-Type':'application/json'
      }
    });

    if(!response.ok) return console.log("HAE PROBLEM");

  }catch(error){
    console.log(error);
  }


}


  //For CheckOut Processes push on              //!WAit pa d2 sa my totals ng lahat s may payment na to
 async function CheckOUtss(e, payment, sameCode, totals){
    e.preventDefault();

    const DateNows = new Date();
  
    const Datas =  allOrders.map(pro =>({
      picture:pro.picture,
      product_Name:pro.product_Name,
      size:pro.size,
      start_Date:new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
      return_Date:new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
      price:pro.price,
      quantity:pro.quantity,
      subTotal:payment === "IN STORE" || "Gcash|DownPayment"? (pro.subTotal + 200) * 0.30 : pro.subTotal + 200,
      user_ID:pro.user_ID,
      payment_Method:payment,
      status:"Waiting for approval",
      PD:payment,
      item_id:pro.product_ID,
      code:sameCode,
      Today: new Date(Date.UTC(DateNows.getFullYear(), DateNows.getMonth(), DateNows.getDate())).toISOString().split('T')[0]
     }));
       
          try{

            const response = await fetch(`https://backend-production-024f.up.railway.app/check_Out`,{
                method:"POST",
                body:JSON.stringify(Datas),
                headers:{
                    'Content-Type':'application/json'
                }
            });
    
            if(!response.ok)return console.log("Submit Data not Succesfully");
            
        }catch(error){
            console.log(error);
        }
         
  
 };



 //Delete in Cart when its already Check In
 const deleted = async(e) =>{

    e.preventDefault();
    
    try{

       const response = await fetch(`https://backend-production-024f.up.railway.app/allDeleted/${allDatas[0].id}`,{
           method:"delete",
           headers:{
               'Content-Type':'application/json'
           }
       });

       if(!response.ok) return console.log("Data not deleted Successfully");

    }catch(error){
       console.log(error)
    }
}


  //Eto yung Sa may store payment
const DownpaymentInstore = async (e,total) => {

  e.preventDefault();
  const sameCode = generateRandomWord(5);
  const totals = total;

  Payments(e,totals, "IN STORE", sameCode);

  if(allDatas.length === 0 || total === null){
    toast.error("Need to reserve an items");
  }else{
    try{
      const response = await fetch('https://backend-production-024f.up.railway.app/create-payment-link', {
        method: 'POST',
        body:JSON.stringify({
          amount: total * 100, 
          description: 'Payment for order #1234',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (data && data.data) {
       window.location.href = data.data.attributes.checkout_url;
       CheckOUtss(e, "IN STORE", sameCode, totals);
       deleted(e)
      } else {
    toast.error('Failed to create payment link.');
      }
  
    }catch(error){
     console.log(error)
    }
  }
  
};


 //ETO NAMAN SA GCASH FULLY PAID
 const Gcash = async (e,total, selectedOptions) => {
  e.preventDefault();
    const sameCode = generateRandomWord(5);
  Payments(e,total, selectedOptions === "downpayment"? "Gcash|DownPayment": "Gcash|FullPaid", sameCode);

  if(allDatas.length === 0 || total === null){
    toast.error("Need to reserve an items");
  }else{
    try{
      const response = await fetch('https://backend-production-024f.up.railway.app/create-payment-link', {
        method:'POST',
        body:JSON.stringify({
          amount: selectedOptions === "downpayment"? total * 100 : total * 100, 
          description: 'Payment for order #1234',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (data && data.data) {
         window.location.href = data.data.attributes.checkout_url;
            CheckOUtss(e, selectedOptions === "downpayment"? "Gcash|DownPayment": "Gcash|FullPaid", sameCode, total);
            deleted(e)
      } else {
    toast.error('Failed to create payment link.');
      }
  
    }catch(error){
     console.log(error)
    }
  }
  
};


    return{
        allDatas,
        CheckOUtss,
        setPayment,
        deleted,
        DownpaymentInstore,
        Gcash
    }


};



export default DetailCheck;