import { createSlice } from "@reduxjs/toolkit";
export const connectionSlice = createSlice({
    name:'connection',
    initialState:null,
    

    reducers:{
        addConnection:(state,action) => action.payload,
        // removeConnection:(state,action)=>{
        //     const newArray = state.filter((r)=>{
        //         r.id !==action.payload
        //     })
        //     return newArray
        // }
    
},
})
export const {addConnection}=connectionSlice.actions
export default connectionSlice.reducer