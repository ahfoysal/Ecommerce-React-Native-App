import { createSlice } from "@reduxjs/toolkit";

const wishSlice = createSlice({
    name: 'wishList',
    initialState: {
        ids: []
    },
    reducers: {
        addWishList: (state, action) => {
            state.ids.push(action.payload.id);
        },
        removeWishList: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        }
    }
})

export const addWishList = wishSlice.actions.addWishList
export const removeWishList = wishSlice.actions.removeWishList

export default wishSlice.reducer
