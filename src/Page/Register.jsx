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
  }else if (Alldatas.password.length < 6 || !/^[a-zA-Z0-9]+$/.test(Alldatas.password)) {
    toast.error("Password must be at least 6 characters long and contain only alphanumeric characters.");
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
  
             
      if (!response.ok) {
        console.log("Cannot Submit:", data.message || "Unknown error");
        toast.error("Registration failed: " + (data.message || "Unknown error"));
        return null;
    }
      if (!data || typeof data.id === 'undefined') {
        throw new Error("Invalid response data: No ID returned");
    }

    if(data.message === "Account already exists") return toast.error("ACCOUNT ALREADY EXIST");
  
      console.log(data.id);
      localStorage.setItem("ID",data.id);

      toast.success("Register Successfully");
     
      return redirect('/sizing_Form');
  
    }catch(error){
      console.log(error);
      return null;
    }
  }
  
}