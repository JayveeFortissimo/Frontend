import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const AdminProfile = () =>{

    const ADID = JSON.parse(localStorage.getItem("ID"));
     const [profile, setProfile] = useState([]);

     const [userPro, setUserPro] = useState({
      name: '',
      email: '',
      address: '',
      contact: '',
      password: ''
  });
 
  const handleProfile = (type, value) => {
    setUserPro(pros => ({
        ...pros,
        [type]: value
    }));
};

          useEffect(()=>{

            async function YourProfile() {
                  try{
                      const response = await fetch(`https://backend-production-62ff.up.railway.app/AdminProfile/${ADID.id}`,{
                        method:"GET",
                        headers:{
                            authorization: "Bearer" + ADID.token
                        }
                      });

                      const dataYours = await response.json();
          
                    setProfile(dataYours);

                  }catch(error){
                    console.log(error);
                  }
            }

            YourProfile();
       //!Tnanggal ko d2 yung AIID.id
        },[]);


        const Edits = async (e) => {
          e.preventDefault();
          if (!ADID || !ADID.id) return toast.error("User ID is not available");
  
          try {
              const response = await fetch(`https://backend-production-62ff.up.railway.app/user_can_Edit/${ADID.id}`, {
                  method: "PUT",
                  body: JSON.stringify(userPro),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
  
  
              if (!response.ok) return toast.error("Data could not be edited successfully");
  
              toast.success("Edited Successfully");
  
              setUserPro({ name: '', email: '', address: '', contact: '', password: '' });
          } catch (error) {
              console.log(error);
          }
      };


return{
    profile,
    handleProfile,
    Edits,
    userPro
}


};



export default AdminProfile;