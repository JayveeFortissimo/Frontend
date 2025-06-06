import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import updateCategory from "../../hooks/AdminHooks/UpdateCategorys.js";
import { useState } from 'react';


const CategoryTable = () => {

  const { category,setCategory } = updateCategory();
  
  const [byID,setById] = useState(0);
  const [editCategory, setEditCategory] = useState("");

  const field = (<input placeholder='Category' className='px-2' onChange={e => setEditCategory(e.target.value.toUpperCase())}/>)

  const handleUpdate = async(e,id) => {

      e.preventDefault();
    try{
      const response = await fetch(`https://backend-production-62ff.up.railway.app/CategoryEdit/${id}`,{
        method:"put",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({category:editCategory})
      });
      if(!response.ok) return console.log("NO DELETE");

      //!PAG ARALAN MO TO
      setCategory((prevCategories) =>
        prevCategories.map((item) =>
          item.id === id ? { ...item, category: editCategory } : item
        )
      );
      
      }catch(error){
        console.log(error);
      }
   
  };

  const handleDelete = async(e, id, category) => {
    e.preventDefault();
   console.log(category)
  try{
   const response = await fetch(`https://backend-production-62ff.up.railway.app/CategoryDelete/${id}`,{
    method:"delete",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({category:category})
   });
   if(!response.ok) return console.log("NO DELETE");

   setCategory(pro => pro.filter(element => element.id !== id));
   
  }catch(error){
    console.log(error);
  }
  };

  return (
    <div className="w-full p-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {category.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{item.id}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {
                    item.id === byID ? field : (<div className="text-sm text-gray-900">{item.category}</div>)
                  }
                 
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">

                    {
                      item.id === byID? (
                        <button
                      onClick={(e) => handleUpdate(e,item.id)}
                      className="inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-sm font-medium text-[tomato] hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-[tomato] focus:ring-offset-2"
                    >
                      <FiEdit className="h-4 w-4" />
                    </button>
                      ):(
                        <button
                        onClick={() => setById(item.id)}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      )
                    }
                   

                    <button
                      onClick={(e) => handleDelete(e,item.id,item.category)}
                      className="inline-flex items-center rounded-md bg-red-50 px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <RiDeleteBinLine className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;