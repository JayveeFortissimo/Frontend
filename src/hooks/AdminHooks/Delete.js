import toast from "react-hot-toast";


const deleteItems = (allData,setData) =>{
    
    const deletes = async(e,id) =>{

        e.preventDefault();
        
        const filtered = allData.filter(pro => pro.id !== id);

         setData(filtered);

        try{

            const response = await fetch(`https://backend-production-62ff.up.railway.app/itemdelete/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type':'application/json'
                }
            });

            if(!response.ok) return toast.error("Data Cannot deleted seccessfully");

            return toast.success("Data deleted Successfully");

        }catch(error){
            console.log(error);
        }
    };



    return{
        deletes
    }

};

export default deleteItems;