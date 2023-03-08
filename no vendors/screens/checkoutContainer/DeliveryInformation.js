

import {    StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles"
import { Input } from '@rneui/themed';




function DeliveryInfo({name, setName, email, setEmail, phoneNumber, setPhoneNumber, address, setAddress}) {
    function LoginHandle(enteredText) {
        console.log(enteredText)
        // setLoading(true)
        // setLoginEmail(enteredText)
      }
    return (
 
    <View style={styles.innerContainer}>
     <Text style={{color: GlobalStyles.colors.orange400,
          fontWeight: '600',
          fontSize: 18}}>Delivery Information</Text>

<View style={{marginVertical: 10}}>
<Input    
      placeholder='Email'
      onChangeText={LoginHandle}
    //   value={loginEmail}
      inputStyle={{color: 'white'}}

        />
    <Text style={{color: GlobalStyles.colors.lightTheme, marginVertical: 8,  fontSize: 15}}>Name: {name} </Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 15}}>Address: {address} </Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 15}}>Phone Number: {phoneNumber}</Text>
    <Text style={{color: GlobalStyles.colors.gray100, marginVertical: 8,  fontSize: 15}}>Email: {email}</Text>

    </View>
    </View>
       
     
)
}

export default DeliveryInfo

const styles = StyleSheet.create({
    
    innerContainer: {

        margin: 10,
        borderRadius: 8,  
         padding: 15,      
        backgroundColor: GlobalStyles.colors.darkTheme100, 

    }
})