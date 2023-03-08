import * as React from 'react';

import {  FlatList, StyleSheet, Text, Button, View, Pressable } from "react-native";
import { useSelector } from 'react-redux';
import { useContextS } from '../store/context/AllContext';
import { GlobalStyles } from '../util/styles';
import CartItemContainer from './cartContainer/CartItemContainer';



function AnimeInfo({route, navigation}) {
    const wishListItems = useSelector(state => state.wishListItems.ids )
    let {  isDark } =  useContextS();



    function renderPopularItem(itemData) {
 
    

        return (
            <CartItemContainer image={itemData.item.images[0].src}  price={itemData.item.price} regular_price={itemData.item.regular_price}
            sale_price={itemData.item.sale_price}  quantity={0}
            name={itemData.item.name} item={itemData.item}/>
       
        )
    }

   


    return (
      
 <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
            }]}>
                {wishListItems.length < 1 && <View style={{ marginVertical: 100, alignItems: 'center'}}>
                    <Text style={{color: GlobalStyles.colors.primary100, textAlign: 'center'}}>There are no items in this cart</Text>
                    <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 200, borderRadius: 8, marginVertical: 100}} onPress={() => navigation.navigate('Home')}>
            <Text  style={{   padding: 10,
            color: 'white',
        textAlign: 'center',
                fontWeight: 'bold'
    }}>Continue Shopping</Text>
         </Pressable>
                </View>}

                 {wishListItems.length > 0 && <>
                    <FlatList
            data={wishListItems}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
           
          />
         
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