import { createSlice } from "@reduxjs/toolkit";
export const requestSlice = createSlice({
    name:'request',
    initialState:{
        request:null,
    },
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            const newArray = state.filter((r)=>{
                r.id !==action.payload
            })
            return newArray

        }
    }
})
export const {addRequest,removeRequest}=requestSlice.actions
export default requestSlice.reducer