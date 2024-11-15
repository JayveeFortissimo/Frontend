import { useState, useEffect } from "react";
import io from 'socket.io-client';


const Appointment = () =>{

    const ID = JSON.parse(localStorage.getItem("ID"));
   
    const [data,setData] = useState([]);

    const [allApointment, setAllApointment] = useState([]);


   useEffect(()=>{
    
    async function appointment(){

        try{
            const response =  await fetch(`http://localhost:8000/appoinmentID/${ID.id}`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json'
                }
            });

            const data = await response.json();

             setData(data)
            if(!response.ok) return console.log("Cannot fetched")

        }catch(error){
            console.log(error);
        }
    
    }

    appointment();
   },[ID.id]);



   useEffect(()=>{


     const socket = io.connect('http://localhost:8000'); // Use your server's URL

    async function ALLappointment(){

        try{
            const response =  await fetch(`http://localhost:8000/allAppointments`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json'
                }
            });

            const data = await response.json();

           
            setAllApointment(data)
            if(!response.ok) return console.log("Cannot fetched");

            

        }catch(error){
            console.log(error);
        }
    
    }

    ALLappointment();


    socket.on('new_appointment', (newAppointment) => {
                
        setAllApointment((prevAppointments) =>
             [...prevAppointments, {
            date:newAppointment.date,
            email:newAppointment.email,
            full_Name:newAppointment.fname,
            number:newAppointment.contact,
            prefer_Time:newAppointment.time,
            user_ID:newAppointment.user_ID,
            status:newAppointment.status
        }]);

    });


    return () => {
        socket.off('new_appointment');
        socket.disconnect(); 
    };
   },[]);


return{
    data,
    allApointment,
    setAllApointment
}
};




export default Appointment;