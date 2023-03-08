

import { Pressable } from "react-native"
import { Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"
import { Button } from 'react-native-elements';



function ButtonContainer({createOrder, total, isClicked }) {
return (
 
    
    <View style={{justifyContent: 'space-between',  flexDirection: 'row' , margin: 10}}>
    <View style={{justifyContent: 'space-between', marginHorizontal: 20}}>
    <Text style={{color: GlobalStyles.colors.orange400, fontWeight: 'bold'}}>Total: {total}</Text>
        <Text style={{color: GlobalStyles.colors.gray100, fontSize: 6}}>*Terms Conditions Applicable</Text>
    

    </View>
    <Button
  title="Place Order"
  onPress={createOrder}
  loading={isClicked}
  titleStyle={{fontSize: 14, fontWeight: 500}}
  buttonStyle={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8}}
/>
    </View>
     
)
}

export default ButtonContainer

