import { useState } from "react";

const Categorys = () =>{

    const [allData, setAlldatas] = useState({
        category:'',
        colors:'',
        materials:''
    });

    
const handleChange = (type,value) =>{
    setAlldatas(pro =>{
        return{
            ...pro,
            [type]:value
        }
    })
}

const handleSubmitCategory = async(e) =>{
    e.preventDefault();
    try{
 const response = await fetch(`https://backend-production-62ff.up.railway.app/addCategorys`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({category:allData.category})
 })
 
    if(!response.ok) return console.log("HAVE A PROBLEm");

    setAlldatas(pro => ({...pro,category:"",colors:"",materials:""}));

    }catch(error){
        console.log(error);
    }
}



const handleSubmitColors = async(e) =>{
    e.preventDefault();
    try{
 const response = await fetch(`https://backend-production-62ff.up.railway.app/addColors`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({colors:allData.colors})
 })
 
    if(!response.ok) return console.log("HAVE A PROBLEm");

    setAlldatas(pro => ({...pro,colors:""}));

    }catch(error){
        console.log(error);
    }
}




const handleSubmitMaterials = async(e) =>{
    e.preventDefault();
    try{
 const response = await fetch(`https://backend-production-62ff.up.railway.app/addMaterials`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({materials:allData.materials})
 })
 
    if(!response.ok) return console.log("HAVE A PROBLEm");

    setAlldatas(pro => ({...pro,materials:""}));

    }catch(error){
        console.log(error);
    }
}


return{
    handleChange,
    handleSubmitCategory ,
    allData,
    handleSubmitColors,
    handleSubmitMaterials
}

}



export default Categorys;