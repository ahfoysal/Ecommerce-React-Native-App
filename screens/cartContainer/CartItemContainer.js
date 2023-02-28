

import {   Image, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"
import { Ionicons } from '@expo/vector-icons'; 
import { Pressable } from "react-native";


function CartItemContainer({image, name,  increase, decrease, quantity, item, price, sale_price, regular_price}) {
return (
 
 <View style={styles.container}>
       <View style={styles.innerContainer}>
    <Image style={{height: '100%', width: 100 , marginHorizontal: 20}} source={{uri: image}}/>
    <View  style={{flex: 1, justifyContent: 'space-between'}}>
  
        <Text style={{color: 'white'}}>{name}</Text>
        <View style={{  flexDirection: 'row',  justifyContent: 'space-between'}}>
            <View>
            <Text style={{color: GlobalStyles.colors.orange200}}>৳ {price}</Text>
            {sale_price &&    <Text style={{ textDecorationStyle: 'solid', textDecorationLine: 'line-through', color: GlobalStyles.colors.gray100
     }}>৳ {regular_price}</Text>}    
      </View>
            <View style={{flexDirection:  'row' , alignItems: 'flex-end', marginHorizontal: 35}}>
           {increase ? <Pressable style={{padding: 5, justifyContent: 'flex-end', backgroundColor: GlobalStyles.colors.darkTheme}} onPress={ () => {increase(item)} } >
         <Ionicons name='add' size={18}  color={GlobalStyles.colors.orange200} />
         </Pressable> : <View> 
         <Text style={{color: 'white', fontSize: 12, textAlign: 'right'}}>Quantity:{quantity}</Text>
         <Text style={{color: 'white', fontSize: 14, textAlign: 'right'}}>Subtotal:{quantity * price}</Text></View>}
      {increase &&   <Pressable style={{padding: 5, justifyContent: 'flex-end', backgroundColor: GlobalStyles.colors.darkTheme}} >
         <Text style={{color: 'white', marginHorizontal: 10, fontSize: 16}} >{quantity}</Text>
         </Pressable>}
       {increase && <Pressable style={{padding: 5,   justifyContent: 'flex-end', backgroundColor: GlobalStyles.colors.darkTheme}} onPress={ () => {decrease(item)} }  >
        <Ionicons name='remove' size={18} color={GlobalStyles.colors.orange200} />
        </Pressable>}
        </View>
           </View>
   
    </View>
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
        flexDirection: 'row',
        margin: 10,
        borderRadius: 8,
        paddingVertical: 10,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 125,
       
       
        
      
       
    }
})