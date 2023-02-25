import { useContext } from "react"
import { FlatList, Text } from "react-native"
import { useSelector } from "react-redux"
import Grid from "../components/Grid"
// import { WishListContext } from "../store/context/WishList"

function Wish({navigation}) {
    // const wishListCtx = useContext(WishListContext)
    const wishListItems = useSelector(state => state.wishListItems.ids )

    function renderPopularItem(itemData) {
 
        function pressHandler(){
    navigation.navigate('Info', {
      animeId: itemData.item.id,
      animeTitle: itemData.item.name,
      product: itemData.item
    })
        }
        return (

            <Grid   
             title={itemData.item.name} 
             price={itemData.item.price} 
             
             imageUrl={itemData.item.images[0].src} 
             category={itemData.item.categories.map(test =>test.name)}
              salePrice ={itemData.item.sale_price}
              regularPrice={itemData.item.regular_price}
            onPress={pressHandler}
            
             />
        )
    }
    

    return (
        <>
         {wishListItems.length < 1 && <Text> No item in cart</Text>}
        <FlatList
            data={wishListItems}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularItem}
            numColumns={2}
          />
          </>

        
    )
}

export default Wish