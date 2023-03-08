import { configureStore } from "@reduxjs/toolkit";
import wishList from "./wishList";

export const store = configureStore({
    reducer: {
        wishListItems: wishList
    }
})