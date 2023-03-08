import { FlatList, Text, View } from "react-native";
import Grid from "../components/Grid";



function All({navigation, isLoading,pro}) {

  function renderPopularItem(itemData) {
 
    function pressHandler(){
navigation.navigate('Info', {
  animeId: itemData.item.id,
  animeTitle: itemData.item.name,
  product: itemData.item,
 
})
    }
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
      
        <Grid   
         title={itemData.item.name} 
         price={itemData.item.price} 
         
         imageUrl={itemData.item?.images[0]?.src} 
         category={itemData.item.categories.map(test =>test.name)}
          salePrice ={itemData.item.sale_price}
          regularPrice={itemData.item.regular_price}
          status={itemData.item.status}
        onPress={pressHandler}
        
         />
         </View>
    )
}

  



   
      


    return (
         <View>
            {isLoading ? <Text>Loading...</Text> : 
      ( 
       <>
      
          <FlatList
            data={pro}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}



          />
        
        </>
      )}
         </View>
    )
}

export default All