import {  Pressable, StyleSheet, Text, View } from "react-native"


function Detail({pressHandler}) {
return (
    <View   >
         <Pressable   onPress={pressHandler}>
            <Text  style={{   padding: 15,
        width: 450,
        textAlign: 'center',
        backgroundColor: '#FF9900',
        color: 'white' }}>Add To Cart</Text>
         </Pressable>
        </View>  
     
)
}

export default Detail

const styles = StyleSheet.create({
    



        
})