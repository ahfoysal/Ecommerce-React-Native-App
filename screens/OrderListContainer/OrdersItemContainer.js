

import {   Image, StyleSheet, Text, View } from "react-native"

import { Ionicons } from '@expo/vector-icons'; 
import { Pressable } from "react-native";
import { GlobalStyles } from "../../util/styles";


function CartItemContainer({image, name,  increase, decrease, quantity, item, price, sale_price, regular_price}) {
return (
 
 <View style={styles.container}>
       <View style={styles.innerContainer}>
        <Image style={{height: 80, width: 80 }} source={{uri: image || 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'}}/>
        <Text  numberOfLines={2}  style={{color: 'white'}}>{name}</Text>     
         <Text style={{color: GlobalStyles.colors.orange200}}>৳ {price}</Text>
         
   </View>
 </View>
       
     
)
}

export default CartItemContainer

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // paddingTop: 20
      
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
        // flexDirection: 'row',
        marginHorizontal: 5,   
        marginVertical: 10,
      borderRadius: 8,
        paddingVertical: 10,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 150,
        width: 80,
       
       
        
      
       
    }
})