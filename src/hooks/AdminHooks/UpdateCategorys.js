import { useState, useEffect, useRef} from "react";

const updateCategory = () =>{

const [category,setCategory] = useState([]);
const [color,setColor] = useState([]);
const [material,setMaterial] = useState([]);



useEffect(() =>{
  async function AllDAtas(){

    try{
        const Category = await fetch(`http://localhost:8000/allCategorys`);
        const Colors = await fetch(`http://localhost:8000/allColors`);
        const Materials = await fetch(`http://localhost:8000/allMaterials`);
   
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