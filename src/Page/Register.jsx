import Regist from '../Components/register';
import {redirect} from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {

  return <Regist/>
}

export default Register


export const regista = async({request, params}) =>{

  const data = await request.formData();

  const confirmation = data.get("confirm");
  const Alldatas = {
    name:data.get("name"),
    email:data.get("email"),
    address:data.get("address"),
    contact:data.get("contact"),
    password:data.get("password"),
  }


  if(Alldatas.password !== confirmation){
    toast.error("Password and Confirm are not Matched");
    return null;
  }else{
    try{

      const response = await fetch(`https://backend-production-024f.up.railway.app/register`,{
        method:"POST",
        body:JSON.stringify(Alldatas),
        headers:{
          'Content-Type':'application/json'
        }
      });
  
      const data = await response.json();
  
     localStorage.setItem("SID",data.id)
  
      if(!response.ok){
        console.log("Cannot Submit");
        return null;
      };
  
      toast.success("Register Successfully");
     
      return redirect('/sizing_Form');
  
    }catch(error){
      console.log(error);
      return null;
    }
  }
  
}