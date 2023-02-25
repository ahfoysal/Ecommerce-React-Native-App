import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import {  Dimensions, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView } from "react-native";


function AnimeInfo({route, cart, navigation}) {

    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity , 0)
    const createOrder = () => {
        console.log('prrssed')
       
        const cartItems = cart.map((cart) => `{'product_id': ${cart.id},'quantity': ${cart.quantity}}` );
        const StringCart= JSON.stringify(cartItems);  
        const newItms = StringCart.replace (/"/g,'');
        const newCart = newItms.replace (/'/g,'"');
        const cID = `"customer_id":"0"  ,`
        
        key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'

        

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

 const body1 = `{"payment_method":"cod","payment_method_title":"Cash On Delivery","billing":{"first_name":"name","address_1":"address","phone":"015","email":"ahfoysal40@gmail.com"},"line_items":`
const body2= `${newCart}}`
    const body3 = body1.concat(' ', body2);


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body1.concat(' ', body2),
        redirect: 'follow'
      };
      fetch(`https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/orders?`+key, requestOptions)
        .then(response => response.json())
        .then(result => {
          const rslt = result;
          console.log(rslt)
          
         
          })
        .catch(error => {
          const rslt = error;
          console.log('error', rslt)
         
        }); 

    console.log(body3)

    }
    
    function renderPopularItem(itemData) {
 
      
        return (
            <View style={styles.flexRow}>
                        
            <View>
            <Image style={{height: 100, width: 100}} source={{uri: itemData.item.images[0].src}}/>
            </View>
            <View>
            <Text style={{color: 'red'}}> {itemData.item.name}</Text>
            <Text style={{color: 'red'}}> {itemData.item.price}</Text>
            <Text style={{color: 'red'}}> {itemData.item.quantity}</Text>
            <Text style={{color: 'red'}}> {total}</Text>
            </View>
        </View>
        )
    }

    // const product = route.params.product


    return (
      
         <View  style={styles.container}>
     

                    <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularItem}
           
          />
            <View >
         <Pressable  onPress={createOrder}>
            <Text style={{   padding: 15,
        width: 450,
        textAlign: 'center',
        backgroundColor: '#FF9900',
        color: 'white' }}>Place Order</Text>
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