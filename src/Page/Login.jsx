import {redirect} from 'react-router-dom'
import Logs from '../Components/login.jsx';
import toast from 'react-hot-toast';

const Login = () => {
  
  return <Logs />
}

export default Login;


export const Logins = async({request,params}) =>{

const datas = await request.formData();

const allData = {
  email:datas.get("email"),
  password:datas.get("password")
}

  try{

    const response = await fetch(`http://localhost:8000/login`,{
      method:"POST",
      body:JSON.stringify(allData),
      headers:{
        'Content-Type':'application/json',
      },
       credentials: 'include'
    });

    const datas = await response.json();
    
    if (!response.ok) return toast.error("Credentials wrong");

    localStorage.setItem("ID",JSON.stringify({id:datas.uersID,token:datas.token}));

    if(datas.is_Admin){
      return redirect('/admin')
    }
  
    return redirect('/profile');

  }catch(error){
    console.log(error)
    return null
  }



}