import {useNavigate} from 'react-router-dom';
import { useEffect,useState} from 'react';
import toast from 'react-hot-toast';

const toCart = () =>{
   
    const user_ID = JSON.parse(localStorage.getItem("ID"));
    const navigate = useNavigate();
    const [allOrders,setAllOrders] = useState([]);
    //!!!ETO YUNG PINAKA TOTAL
    const [total,SetTotal] = useState([]);


  //Pushed Cart
  //!Also check this may chnges kasi ehh sa table ng size and quantity
  
    const toCart = async(e,pro,startDate,endDate,size,quanta, additionalFee) =>{
    
      e.preventDefault();

      const sum = allOrders.some(ele => ele.product_Name  === pro.product_Name);

      const allDatas ={
        
        product_Name:pro.product_Name,
        picture:pro.image,
        type:pro.type,
        size:size,
        startDate:startDate,
        returnDate:endDate,
        price:pro.price,
       originalQuantity:quanta,
        quantity:quanta,
        subTotal:((pro.price + additionalFee) * quanta) ,
        user_ID:user_ID.id,
        product_ID:pro.id,
        additional: (additionalFee * quanta)
      }

      if(sum) {
        toast.error("THIS ITEM ALREDY IN CART")

      }else {

        if(startDate === null || endDate === null){
          toast.error("Please select Date")
        }else if(size === null){
          toast.error("Please select Size")
          
        }else{
  
          try{
        
            const response = await fetch(`http://localhost:8000/toCart`,{
              method:"POST",
              body:JSON.stringify(allDatas),
              headers:{
                'Content-Type':'application/json'
              }
            });
        
            if(!response.ok) return toast.error("Cart Failed");
            toast.success("Items added to cart successfully!");
          return navigate('/cart');
  
          }catch(error){
            console.log(error);
          }
  
        }


      }
  
     
      };


      //retrived Cart
useEffect(()=>{

  const cartsRetrived = async() =>{
    try{

      const response = await fetch(`http://localhost:8000/getCartUser/${user_ID.id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })

      const datas = await response.json();
     setAllOrders(datas)
     }catch(error){
      console.log("");
     }
  }

  cartsRetrived();

},[]);



//Delete Functions

const removeItems = async(id) =>{

 const items  = allOrders.filter(pro => pro.id !== id);
  
     
    setTimeout(()=>{
      toast.success("Item DEleted Successfully")
      setAllOrders(items)
    },1000)


  try{
    const response = await fetch(`http://localhost:8000/removeItems/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json'
      }
    });

    if(!response.ok) return console.log("Cannot REmoved");
 
  }catch(error){
    console.log(error);
  }

 };



   // FOR Total Quantity
   useEffect(()=>{
    async function Totals(){
   //!BAKA MAG KA ERROR
      if(user_ID === null) {
        console.log("LOGIN FIRSTTT")
      }else{
        try{
          const response = await fetch(`http://localhost:8000/Total/${user_ID.id}`,{
            method:"GET",
            headers:{
              'Content-Type':'application/json'
            }
          });
         
        if (!response.ok) throw new Error("Network response was not ok");
    
        const data = await response.json();
        SetTotal(data[0].total); 
    
        }catch(error){
          console.log(error);
        }
      }
      
    };
  
    Totals();
   },[])

      return{
        toCart,
        allOrders,
        removeItems,
        total,
        setAllOrders
      }
      
}




export default toCart;