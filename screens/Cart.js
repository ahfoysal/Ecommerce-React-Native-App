import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import {  Dimensions, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView } from "react-native";


function AnimeInfo({route, cart, navigation, setCart}) {
    function pressHandler(){
        
          navigation.navigate('Checkout')
              }
    function renderPopularItem(itemData) {
 
      function increase(id){      
      id.quantity = id.quantity+1
      const newCart = [...cart, id];
      const unique = [...new Map(newCart.map((m) => [m.name  , m])).values()];
      setCart(unique);
      console.log(id.quantity)
      }
      function decrease(id){
        id.quantity = id.quantity-1
        const newCart = [...cart, id];
        const unique = [...new Map(newCart.map((m) => [m.name  , m])).values()];
        setCart(unique);
        console.log(id.quantity)
        } 
        return (
            <View style={styles.flexRow}>
                        
            <View>
            <Image style={{height: 100, width: 100}} source={{uri: itemData.item.images[0].src}}/>
            </View>
            <View>
            <Text style={{color: 'red'}}> {itemData.item.name}</Text>
            <Text style={{color: 'red'}} onPress={ () => {increase(itemData.item)} }> Plus</Text>
            <Text style={{color: 'red'}} > Quantity: {itemData.item.quantity}</Text>
            <Text style={{color: 'red'}} onPress={ () => {decrease(itemData.item)} }> Minus</Text>
            </View>
        </View>
        )
    }

    // const product = route.params.product


    return (
      
         <View  style={styles.container}>

                {cart.length < 1 && <Text> No item in cart</Text>}

                    <FlatList
            data={cart}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
           
          />
            <View >
         <Pressable   onPress={pressHandler}>
            <Text style={{   padding: 15,
        width: 450,
        textAlign: 'center',
        backgroundColor: '#FF9900',
        color: 'white' }} >Checkout</Text>
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
    flexRow: {
        flexDirection: 'row',
        flex: 1,
        height: 125,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})
export default AnimeInfo