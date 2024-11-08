import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    browseRefine:false,
    browse:false,
    color:false,
      //Isiningit ko na d2 yung category sa may Profile
      category:'ALL',
      Activity:"Reserve",
      EditProfile:false,
      //MessageComponent
      message:false,
      appointment:false,
      Notifications:false,
      Settings:false,
      EditSize: false,
   // this is
   priceMaxRange: 10000,
   priceMinRange: 0,
   priceFiltered: 0,

   selectedColors: [],    // New state for color filter
    selectedMaterials: [], 

}


const SideBar = createSlice({
    name:"Side",
    initialState,
    reducers:{

      setSelectedColors(state, action) {
        state.selectedColors.includes(action.payload)? console.log("REFINED REDUNDANT"): state.selectedColors.push(action.payload)
    },
        setSelectedMaterials(state, action) {
          state.selectedMaterials.includes(action.payload)?console.log("REFINED REDUNDANT"): state.selectedMaterials.push(action.payload);
        },

        removeColorFilter(state, action) {
          state.selectedColors = state.selectedColors.filter(color => color !== action.payload);
        },
        
        removeMaterialFilter(state, action) {
          state.selectedMaterials = state.selectedMaterials.filter(material => material !== action.payload);
        },

      setPriceRange(state, action) {
        return {
            ...state,
            priceMinRange: action.payload.min, // Update min price range
            priceMaxRange: action.payload.max, // Update max price range
        }
      },

      EditSize(state,action){
        return{
          ...state,
          EditSize:action.payload
        }
  },

      Settings(state,action){
        return{
          ...state,
          Settings:action.payload
        }
  },

      Notif(state,action){
        return{
          ...state,
          Notifications:action.payload
        }
  },

        Editpro(state,action){
              return{
                ...state,
                EditProfile:action.payload
              }
        },

        Appointment(state,action){
          return{
            ...state,
            appointment:action.payload
          }
    },
          
        sideModal(state,action){
            return {...state,browseRefine:action.payload};
        },
        //Sides Bars
        BrowseCollections(state,action){
            return {...state,browse:action.payload};
        },
        Colors(state,action){
            return {...state,color:action.payload};
        },
        //Category
        setCategory(state,action){
            return{...state, category:action.payload}
         },

         //Change Category in Side Bars e2
          //Change Per Category like, wedding,toxido etc...
        ChangeCategory(state,action){
            return{...state,category:action.payload};
        },
        
        Activity(state,action){
           switch(action.payload){
            case "Reserve": return{...state,Activity:action.payload};
            case "History": return{...state,Activity:action.payload};
            case "Cancelled": return{...state,Activity:action.payload};
            case "FinalH": return{...state,Activity:action.payload}
            case "Return": return{...state,Activity:action.payload}
           }
        },
        messageOpen(state,action){
          return{
            ...state,
            message:action.payload
          }
        }
        
        
    }
});


//For ecporting actions
export const Sidebars = SideBar.actions;

export default SideBar.reducer;
