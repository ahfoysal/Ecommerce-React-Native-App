import * as React from 'react';
import { useLayoutEffect } from "react";
import {  FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView } from "react-native";
import CartIcon from "../components/CartICon";






function AnimeInfo({route, navigation, addToCart, cart}) {

  
    const product = route.params.product
    

    function handle() {
      navigation.navigate('Cart')
  }
    useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => {
             
              return <CartIcon onPress={handle} cart={cart}/>
          }
      })
      },[navigation, handle])



    function pressHandler(){
      addToCart(product)
   
            }

            function renderPopularItem(itemData) {
 
              
                return (
                  <Image  key={itemData.item.id} style={{height: 400, width: 300}} source={{uri: itemData.item.src}}/>
                )
            }
    return (
      
         <View  style={styles.container}>
           
           <FlatList
            data={product.images}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            horizontal
            showsHorizontalScrollIndicator={false}
           
          />
           
           <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
         



         <Text>{product.name}</Text>
         <Text>{product.price}</Text>
         {product.sale_price && <Text>{product.sale_price}</Text>}
       
         <Text>{product.description}</Text>
        
                </ScrollView>
         <View  >
         <Pressable   onPress={pressHandler}>
            <Text  style={{   padding: 15,
        width: 450,
        textAlign: 'center',
        backgroundColor: '#FF9900',
        color: 'white' }}>Add To Cart</Text>
         </Pressable>
        </View>  
       
         </View>
       
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
        padding: 0,
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        justifyContent: 'center ',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 15,
        width: '100%',
        backgroundColor: '#FF9900',
        
    },
    cartbtn: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    btn: {
      flex: 1,
      width: '100%'
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1,
        height: 125,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
  
})
export default AnimeInfo