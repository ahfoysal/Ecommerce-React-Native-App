import * as React from 'react';
import { useEffect } from "react";
import {  Dimensions, FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { GlobalStyles } from '../../util/styles';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItemContainer from '../cartContainer/CartItemContainer';
import Summray from './Summray';
    



function AnimeInfo({route, cart, navigation, isDark, setCart}) {





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

 const body1 = `{"payment_method":"cod" , ${cID} "payment_method_title":"Cash On Delivery" , "billing":{"first_name":"name","country": "BD","address_1":"address","phone":"015","email":"ahfoysal40@gmail.com"},"line_items":`
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
          
          WebBrowser.openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${rslt.total}/${rslt.id}`)
         
          navigation.navigate('Home')
          setCart([])
          
         
          })
        .catch(error => {
          const rslt = error;
          console.log('error', rslt)
         
        }); 

    console.log(body3)

    }
    
    function renderPopularItem(itemData) {

    
      
        return (
            <CartItemContainer image={itemData.item.images[0].src}  price={itemData.item.price} regular_price={itemData.item.regular_price}
            sale_price={itemData.item.sale_price}
            name={itemData.item.name}  quantity={itemData.item.quantity} item={itemData.item}/>
        )
    }
    function summary(itemData) {

    
      
        return (
            <Summray total={total}/>
        )
    }



    return (
      
        <SafeAreaView  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
        
     

        {cart.length > 0 && <>
                    <FlatList
            data={cart}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            ListFooterComponent={summary}
           
          />
         
            <View style={{justifyContent: 'space-between',  flexDirection: 'row' , margin: 10}}>
            <View style={{justifyContent: 'space-between', marginHorizontal: 20}}>
            <Text style={{color: GlobalStyles.colors.orange400, fontWeight: 'bold'}}>Total: {total}</Text>
                <Text style={{color: GlobalStyles.colors.gray100, fontSize: 6}}>*Terms Conditions Applicable</Text>
            

            </View>
            <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8}} onPress={createOrder}>
            <Text  style={{   padding: 10,
            color: 'white',
        textAlign: 'center',
                fontWeight: 'bold'
    }}>Place Order</Text>
         </Pressable>
            </View>
                 </>
                 
                
                 }

                
         </SafeAreaView>
       
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
        paddingTop: 20
      
    },
    buttons: {
   
        justifyContent: 'center ',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 15,
        width: '100%',
        backgroundColor: '#FF9900',
        
    },
    innerContainer: {
        flexDirection: 'row',
        marginVertical: 6,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 125,
        // justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    summaryContainers: {
        // flexDirection: 'row',
        marginVertical: 10,
        borderRadius: 8,
        padding: 15,
        
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        // height: 125,
       
       
        
      
       
    }
})
export default AnimeInfo