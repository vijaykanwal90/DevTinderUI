import { createSlice } from "@reduxjs/toolkit";
export const connectionSlice = createSlice({
    name:'connection',
    initialState:{
        connection:null,
    },
    reducers:{
        addConnection:(state,action) => action.payload
        
    
},
})
export const {addConnection}=connectionSlice.actions
export default connectionSlice.reducer