import { useState, useEffect } from "react";
import { useLoaderData } from 'react-router-dom';
import { VscDiscard } from "react-icons/vsc";
import { MdDateRange, MdInfo, MdPayments } from "react-icons/md";
import { BiSolidTimeFive } from "react-icons/bi";


const Cancelled = () => {

    const userID = useLoaderData();

    const [allCancelled,setCancelled] = useState([]);
    
     useEffect(()=>{

        async function CancelledData() {
        try{
        const response = await fetch(`https://backend-production-024f.up.railway.app/allCanceled/${userID.data1[0].id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await response.json();

        setCancelled(data.result);

        }catch(error){
            console.log(error);
        }  
        }
        CancelledData();

     },[]);

  return (
    <div className="p-3 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <VscDiscard className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
        <h2 className="text-lg sm:text-xl font-semibold text-white">Cancelled Orders</h2>
      </div>

      <div className="grid gap-3 sm:gap-4 max-h-[calc(100vh-12rem)] overflow-auto">
        {allCancelled.map((pro) => {
          const startDate = new Date(pro.start_Date);
          const returnDate = new Date(pro.return_Date);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const Starto = startDate.toLocaleDateString('en-US', options);
          const returns = returnDate.toLocaleDateString('en-US', options);

          return (
            <div
              key={pro.id}
              className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-3 sm:p-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={`https://backend-production-024f.up.railway.app/uploads/${pro.picture}`}
                    alt={pro.Name}
                    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-3 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div className="text-center sm:text-left">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{pro.Name}</h3>
                      <p className="text-base sm:text-lg font-semibold text-gray-700">
                        ₱ {pro.Price}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center sm:justify-start gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit mx-auto sm:mx-0 ${
                      pro.status === "APPROVED BY ADMIN" 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <MdPayments className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium">{pro.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <MdDateRange className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span>Start: {Starto}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <MdDateRange className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span>Return: {returns}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs sm:text-sm justify-center sm:justify-start">
                    <MdInfo className="w-3 h-3 sm:w-4 sm:h-4 mt-1 text-red-500" />
                    <div>
                      <p className="text-gray-600">
                        Reason: <span className="text-red-600 font-medium">{pro.Reason}</span>
                      </p>
                    </div>
                  </div>

                  {pro.status === "APPROVED BY ADMIN" && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm bg-green-50 text-green-700 p-2 rounded-lg mt-1 justify-center sm:justify-start">
                      <BiSolidTimeFive className="w-3 h-3 sm:w-4 sm:h-4" />
                      <p className="font-medium">Processing refund - Expected within 1 day</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Cancelled