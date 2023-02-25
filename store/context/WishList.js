import { createContext, useState } from "react";
export const WishListContext = createContext({
    ids: [],
    addList: (id) => {},
    removeList: (id) => {},
})


function WishListContextProvider({children}) {


    const [wishListItems, setWishListItems] = useState([])

    function addWishList(id) {
        setWishListItems((current) => [...current, id])
    }
    function removeWishList(id) {
        setWishListItems((current) =>
         current.filter((productID) => productID !== id))

    }

    const values = {
        ids: wishListItems,
        addWishList: addWishList,
        removeWishList: removeWishList

    }
    return <WishListContext.Provider value={values}>{children}</WishListContext.Provider>

}
export default WishListContextProvider

