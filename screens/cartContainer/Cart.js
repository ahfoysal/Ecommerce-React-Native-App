import * as React from 'react';

import {  FlatList, StyleSheet, Text, Button, View, Pressable } from "react-native";
import { GlobalStyles } from '../../util/styles';
import CartItemContainer from './CartItemContainer';


function AnimeInfo({route, cart, navigation, setCart, isDark}) {
    function pressHandler(){
        
          navigation.navigate('Checkout')
              }
    function renderPopularItem(itemData) {
 
      function increase(id){    
       
      id.quantity = id.quantity+1
      const newCart = [...cart, id];
      const unique = [...new Map(newCart.map((m) => [m.name  , m])).values()];
      setCart(unique);
      
      }
      function decrease(id){
        
        if(id.quantity < 2) {
            return
        }  
        id.quantity = id.quantity-1
        const newCart = [...cart, id];
        const unique = [...new Map(newCart.map((m) => [m.name  , m])).values()];
        setCart(unique);
     
        } 

        return (
            <CartItemContainer image={itemData.item.images[0].src}  price={itemData.item.price} regular_price={itemData.item.regular_price}
            sale_price={itemData.item.sale_price}
            name={itemData.item.name} increase={increase} decrease={decrease}  quantity={itemData.item.quantity} item={itemData.item}/>
       
        )
    }

   
    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity , 0)
    let Totals = cart.map((qun) => qun.quantity)
  let sum = 0; 
  
  Totals.forEach(item => {
      sum += item;
    });


    return (
      
 <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
            }]}>
                {cart.length < 1 && <View style={{ marginVertical: 100, alignItems: 'center'}}>
                    <Text style={{color: GlobalStyles.colors.primary100, textAlign: 'center'}}>There are no items in this cart</Text>
                    <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 200, borderRadius: 8, marginVertical: 100}} onPress={() => navigation.navigate('Home')}>
            <Text  style={{   padding: 10,
            color: 'white',
        textAlign: 'center',
                fontWeight: 'bold'
    }}>Continue Shopping</Text>
         </Pressable>
                </View>}

                 {cart.length > 0 && <>
                    <FlatList
            data={cart}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
           
          />
            <View style={{justifyContent: 'flex-end',  flexDirection: 'row' , margin: 10}}>
            <View style={{justifyContent: 'space-between', marginHorizontal: 20}}>
                <Text style={{color: GlobalStyles.colors.gray100, fontSize: 10}}>Charge: ৳ 0</Text>
                <Text style={{color: GlobalStyles.colors.orange400, fontWeight: 'bold'}}>Total: {total}</Text>

            </View>
            <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8}} onPress={pressHandler}>
            <Text  style={{   padding: 10,
            color: 'white',
        textAlign: 'center',
                fontWeight: 'bold'
    }}>Check Out ({sum})</Text>
         </Pressable>
            </View>
                 </>
                 
                
                 }
         </View>
       
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
    }
})
export default AnimeInfo