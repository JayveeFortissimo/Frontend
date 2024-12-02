import { useState, useEffect, useRef} from "react";

const updateCategory = () =>{

const [category,setCategory] = useState([]);
const [color,setColor] = useState([]);
const [material,setMaterial] = useState([]);



useEffect(() =>{
  async function AllDAtas(){

    try{
        const Category = await fetch(`https://backend-production-d6a2.up.railway.app/allCategorys`);
        const Colors = await fetch(`https://backend-production-d6a2.up.railway.app/allColors`);
        const Materials = await fetch(`https://backend-production-d6a2.up.railway.app/allMaterials`);
   
       const data1 = await Category.json();
       const data2 = await Colors.json();
       const data3 = await Materials.json();

          setCategory(data1.data);
          setColor(data2.data);
          setMaterial(data3.data);

    }catch(err){
        console.log(err);
    }

  }

  AllDAtas();
},[]);


 return{
    category,color,material,setCategory,setColor,setMaterial
 }

};




export default updateCategory;