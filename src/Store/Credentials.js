import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    userID:null,
    usersDatas:[]
}


const user_Credentials = createSlice({
    name:"Users_Profile",
    initialState,
    reducers:{
         setUserData(state,actions){
            return{
              ...state,
              usersDatas:actions.payload
            }
         },
    }
});

export const user = user_Credentials.actions;

export default user_Credentials.reducer;

//For Fetch user
export const userprofile = (dispatch,userID) =>{

    return async() =>{

  try{
    const response = await fetch(`http://localhost:8000/profile/${userID.id}`,{
        method:"GET",
        headers:{
          authorization: "Bearer " + userID.token
        }
    });

    const data = await response.json();

    if(!response.ok) return console.log("Data Cannot Retrive");

    dispatch(user_Credentials.actions.setUserData(data))
     
  }catch(error){
    console.log(error);
  }
    }
}
