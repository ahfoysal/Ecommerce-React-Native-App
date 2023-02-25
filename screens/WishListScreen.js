import { useContext } from "react"
import { WishListContext } from "../store/context/WishList"

function Wish() {
    const wishListCtx = useContext(WishListContext)


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
        
        <FlatList
            data={pro}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularItem}
            numColumns={2}
          />


        
    )
}

export default Wish