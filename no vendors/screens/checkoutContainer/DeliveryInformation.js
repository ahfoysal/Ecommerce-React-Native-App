

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
      placeholder='Name'
      onChangeText={(value) => setPhoneNumber(value)}
      value={name}
      inputStyle={{color: 'white', fontSize: 15}}

        />
          <Input    
      placeholder='Phone'
      onChangeText={(value) => phoneNumber(value)}
      value={phoneNumber}
      inputStyle={{color: 'white', fontSize: 15}}

        />
        <Input    
      placeholder='Email'
      onChangeText={(value) => setEmail(value)}
      value={email}
      inputStyle={{color: 'white', fontSize: 15}}

        />
          <Input    
      placeholder='Email'
      onChangeText={(value) => setAddress(value)}
      value={address}
      inputStyle={{color: 'white', fontSize: 15}}

        />
    
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