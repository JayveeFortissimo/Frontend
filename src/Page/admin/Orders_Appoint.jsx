import Users_Orders from "../../Components/AdminComponents/Users_Orders";
import {useRouteLoaderData} from 'react-router-dom';

const Orders_Appoint = () => {
 const datas  = useRouteLoaderData("userData");

  return <Users_Orders user ={datas}/>
}

export default Orders_Appoint;


export const allUsers = async() =>{

try{

  const response = await fetch(`https://backend-production-024f.up.railway.app/alluser`,{
   method:"GET",
   headers:{
    'Content-Type':'application'
   }
  });

  const data = await response.json();
  if(!response.ok) return console.log("User not found");


  if(!data) return null;

  return data;

}catch(error){
  console.log(error)
  return null
   
}

}
