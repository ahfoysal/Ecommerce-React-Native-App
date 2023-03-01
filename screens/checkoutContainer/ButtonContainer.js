

import { Pressable } from "react-native"
import { Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"



function ButtonContainer({createOrder, total }) {
return (
 
    
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
     
)
}

export default ButtonContainer

