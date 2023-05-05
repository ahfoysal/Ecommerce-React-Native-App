

import {    StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"



function Summary({total}) {
return (
 
    <View style={styles.innerContainer}>
    <Text style={{color: GlobalStyles.colors.orange400,
          fontWeight: '600',
          fontSize: 18}}>Oder Summary</Text>

    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>

    <View style={{marginVertical: 10}}>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 14}}>Items Total</Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 14}}>Delivery Charge</Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 14}}>Grand Total</Text>

    </View>
 
    <View style={{marginVertical: 10}}>
    <Text style={{color: GlobalStyles.colors.lightTheme, marginVertical: 8,  fontSize: 14, textAlign: 'right'}}>৳ {total}</Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 14, textAlign: 'right'}}>৳ 0</Text>
    <Text style={{color: GlobalStyles.colors.orange200, marginVertical: 8,  fontSize: 14, textAlign: 'right', fontWeight: 'bold'}}>৳ {total}</Text>
    </View>
    </View>
  


    </View>
       
     
)
}

export default Summary

const styles = StyleSheet.create({
    
    innerContainer: {
        marginVertical: 10,
        borderRadius: 8,
        padding: 15,
        backgroundColor: GlobalStyles.colors.darkTheme100,       
    }
})