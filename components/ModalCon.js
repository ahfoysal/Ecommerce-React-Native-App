import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Platform, Image } from 'react-native';




function ModalCon ({toggleModal, addToCart, product }) {
  function Handle() {
  
console.log('closed')
    toggleModal()
    addToCart(product)

  }
  
    return (

        
        <View style={{ flex: 1, justifyContent: 'space-between'} }   >  
        <Pressable onPress={toggleModal}>
        <View style={{height: '80%', width: 400}}>
          
        </View>
        </Pressable>
        <View style={{backgroundColor: 'white', height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'black', height: 30, width: 80, backgroundColor: 'red'}} onPress={Handle}> Add To cart</Text>

    
        </View>
       
        </View>
        
    )

}
const styles = StyleSheet.create({
   
  });

export default ModalCon