import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../../util/styles";
import { useState } from "react";


function Detail({isLoading, product, isDark, variations, selectedItem, setSelectedItem, variationHandle, warning, setCurrentItem}) {
  const [isItemSelected, setIsItemSelected] = useState(null);
  
  const variationHandler = async (id) => {
    if(isItemSelected == id.id){
      setCurrentItem(null)
      setSelectedItem(null)
      return setIsItemSelected(null)
    }
    setIsItemSelected(id.id)
    setSelectedItem(id)
    variationHandle(id)

    console.log(id.attributes[0].name, id.attributes[0].option)
   
    };

return (
    <View style={[ styles.variationContainer, warning && styles.warning,{backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
    }]}>
    <View style={{flexDirection: 'row'}}>
    {!selectedItem ? <Text style={styles.description}> Variations</Text> : <Text style={styles.description}> Selected:</Text>}
    {selectedItem  &&  selectedItem.attributes.map((name,index) => {
      return  <Text  key={index} style={{color: 'white'}}>{selectedItem.attributes[index].name} : {selectedItem.attributes[index].option}, </Text>
    })}
    <Text style={{color: 'white'}}> ⋄ Stock: {selectedItem?.stock_quantity}</Text>
    </View>
     {isLoading ? <Text>Loading...</Text> :  
 <View style={{flexDirection: 'row', marginVertical: 15}}>
 
 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
 <View style={{justifyContent: 'flex-end', alignItems: 'stretch', marginRight: 15,}}>
 {product.attributes.map((att, index) => {
   return       <Text  key={index} style={styles.attSize}>{att.name}</Text>
 })}
 </View>
 {variations.map((products, index) => {
   return     <Pressable  onPress={() => variationHandler(products)} key={index} style={[{width: 80 ,         paddingVertical: 6
,  justifyContent: 'center', alignItems: 'center', marginHorizontal: 5},
  isItemSelected === products.id &&  styles.active]}>
   <Image style={{height: 60, width: 60}} source={{uri: products.image.src}}/>

  <View >  
  {products.attributes.map(att => {
     return         <Text key={att.option} style={styles.attSize}>{att.option} </Text>

   })}
  </View>
 
   </Pressable>
})}
</ScrollView>

 </View>
 
 }
    </View>
)
}

export default Detail

const styles = StyleSheet.create({
    innerContainer: {
        marginVertical: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 15
      },
      title: {
        color: 'white',
        fontSize: 18,
        marginVertical: 5,
      },
        price: {
          color: GlobalStyles.colors.text500,
          fontWeight: '600',
          fontSize: 24,
          marginVertical: 10
          
        },
        variationContainer: {
      padding: 15,
      paddingVertical: 15,
      marginVertical: 10

    },
    attSize: {
      color: 'white',
      fontSize: 10,
      textAlign: 'center'
    },
    description: {
      fontSize: 16 , color: GlobalStyles.colors.gray100,
      borderBottomWidth: .5, 
      borderBottomColor: '#C8C8C8',
      paddingBottom: 5,
      marginBottom: 8, 
      marginRight: 10,
      
    },
    des: {
      fontSize: 16 , color: GlobalStyles.colors.gray100,
      textAlign: 'center',
      paddingBottom: 5,
      marginBottom: 8
    },
    active: {
        backgroundColor: GlobalStyles.colors.orange200,
        borderRadius: 6,
    },
    warning: {
      borderWidth: 2,
      borderColor: 'red'
    }



        
})