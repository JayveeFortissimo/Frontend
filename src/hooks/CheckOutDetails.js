import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const DetailCheck = (allOrders) =>{

     // Tiwala lang makakapasa tayo manalig lang tayo kay lord
     const navigate = useNavigate();
     const [allDatas,setAll] = useState([]);
   
     const ID = JSON.parse(localStorage.getItem("ID"));     
     const SecurityDeposit = 200;

      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const DATEOFNOW = now.toLocaleDateString('en-US', options);
      const dateNow = DATEOFNOW;
      const displayDiscount = JSON.parse(localStorage.getItem("Discount"));

   
    function generateRandomWord(length) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      let word = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        word += letters[randomIndex];
      }
      return word;
    }


    const Samecode  = generateRandomWord(5);



    useEffect(()=>{
        async function info(){
            try{
                const response = await fetch(`http://localhost:8000/profile/${ID.id}`,{
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


 const deleted = async(e) =>{

  e.preventDefault();
  
  try{

     const response = await fetch(`http://localhost:8000/allDeleted/${allDatas[0].id}`,{
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



 
 async function CheckOUtss(e, TotalsAll){
    e.preventDefault();

    deleted(e);
    const DateNows = new Date();
  
    const Datas =  allOrders.map(pro =>({
      name:allDatas[0].name,
      picture:pro.picture,
      product_Name:pro.product_Name,
      size:pro.size,
      start_Date:new Date(Date.UTC(new Date(pro.start_Date).getFullYear(), new Date(pro.start_Date).getMonth(), new Date(pro.start_Date).getDate())).toISOString().split('T')[0],
      return_Date:new Date(Date.UTC(new Date(pro.return_Date).getFullYear(), new Date(pro.return_Date).getMonth(), new Date(pro.return_Date).getDate())).toISOString().split('T')[0],
      price:pro.price,
      quantity:pro.quantity,    
      subTotal: displayDiscount?((pro.subTotal + 200) * 0.30) : (pro.subTotal + 200) ,
      user_ID:pro.user_ID,
      status:"Waiting for approval",
      item_id:pro.product_ID,
      code:Samecode,
      Today: new Date(Date.UTC(DateNows.getFullYear(), DateNows.getMonth(), DateNows.getDate())).toISOString().split('T')[0],
      returned:"ON GOING",
      statusPickuped:"THIS ITEM NOT PICKUPED YET",
      type:pro.type
     }));
       
          try{

            const response = await fetch(`http://localhost:8000/check_Out`,{
                method:"POST",
                body:JSON.stringify(Datas),
                headers:{
                    'Content-Type':'application/json'
                }
            });
    
            if(!response.ok)return toast.error("Submit Data not Succesfully");
            
            toast.success("Success Reserve");

            return navigate('/profile');
            
        }catch(error){
            console.log(error);
        }
         
  
 };



    return{
        allDatas,
        CheckOUtss,
    }


};



export default DetailCheck;