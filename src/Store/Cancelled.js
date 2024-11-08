import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    items:{
        picture:"",
        name:"",
        price:0,
        start:"",
        finish:"",
        user_ID:0,
        quantity:0,
        item_id:0,
        size:"",
        id:"",
        code:"",
        sub_Total:0
     },
     reasonCancel:false,
}

const Cancel = createSlice({
    name:"CancelledFuncion",
    initialState,
    reducers:{
         ///PROFILE CANCELLATION
         setReasonToopen(state,action){
            state.reasonCancel = action.payload;
        },

        //setCancell Items
        setCancell(state,action){
        state.items.picture = action.payload.picture;
        state.items.name = action.payload.product_Name;
        state.items.price = action.payload.price;
        state.items.start = action.payload.start_Date;
        state.items.finish = action.payload.return_Date;
        state.items.user_ID = action.payload.user_ID;
        state.items.quantity = action.payload.quantity;
        state.items.item_id = action.payload.item_id;
        state.items.size = action.payload.size;
        state.items.id = action.payload.id;
        state.items.code = action.payload.code;
        state.items.sub_Total = action.payload.subTotal;
        },
        //X the Reason
        setX(state,action){
        state.reasonCancel = action.payload;
        }
        
        
    }
});


//For ecporting actions
export const Cancels = Cancel.actions;

export default Cancel.reducer;
