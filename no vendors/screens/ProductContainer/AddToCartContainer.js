import {  Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"


function Detail({pressHandler}) {
return (
 
         <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400}} onPress={pressHandler}>
            <Text  style={{   padding: 15,
            color: 'white',
        textAlign: 'center',
    }}>Add To Cart</Text>
         </Pressable>
       
     
)
}

export default Detail

const styles = StyleSheet.create({
    



        
})