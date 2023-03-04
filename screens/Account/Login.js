
import React, {  useState } from 'react';
import {  Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useContextS } from '../../store/context/AllContext';
import { GlobalStyles } from '../../util/styles';
import { Input } from '@rneui/themed';
import { Button } from 'react-native-elements';




const Login = ({navigation ,route}) => {
    let {  isDark } =  useContextS();
    const [loading, setLoading] = useState(false)
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');




    function LoginHandle() {
      console.log(loginEmail)
      console.log(password)
      setLoading(true)
      // setLoginEmail(enteredText)
      fetch(`https://shop.abusayeeed.xyz/wp/?rest_route=/simple-jwt-login/v1/auth&username=${loginEmail}&password=${password}&THISISMySpeCiaLAUthCodee=THISISMySpeCiaLAUthCodee`, {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
    }
 
  


function SignUpHandler() {}



   




  return (
   
    <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
    }]}>
     
   
     <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   
    <View style={[styles.scene]}>
    <Text  style={{    color: 'white',fontWeight: 'bold', fontSize: 20, margin: 10}}>Welcome Back</Text>
    <Text  style={{    color: 'white', fontSize: 12, margin: 10}}>Login with your email and password.</Text>

        <Input     
      placeholder='Email'
      onChangeText={(value) => setLoginEmail(value)}
      value={loginEmail}
      inputStyle={{color: 'white'}}

        />
       

    <Input placeholder="Password"
      onChangeText={(value) => setPassword(value)}
      value={password}
      inputStyle={{color: 'white'}}
     secureTextEntry={true} />
     <View style={{alignItems: 'center'}}>
    <Button
    buttonStyle={{backgroundColor: GlobalStyles.colors.orange400, borderRadius: 8, paddingHorizontal: 80}}
  title="LOGIN"
  onPress={LoginHandle}
  loading={loading}
/>
    </View>
    </View>
    
     </TouchableWithoutFeedback>
     </KeyboardAvoidingView>   
    </View>

  );
};

const styles = StyleSheet.create({
  scene: {
    
    marginHorizontal: 30,
    paddingHorizontal: 10,
    backgroundColor: GlobalStyles.colors.darkTheme100,   
    marginTop: 40,
    paddingVertical: 30,
    borderRadius: 8,
    
  },
  tabBar: {
    backgroundColor: GlobalStyles.colors.darkTheme,
  },
  tabStyle: {
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: GlobalStyles.colors.orange400,
  },
  indicator: {
    backgroundColor: GlobalStyles.colors.orange400,
    
  },
  container : {
    flex: 1, 
},
innerContainer: {
    margin: 6,
    backgroundColor: GlobalStyles.colors.darkTheme100, 
    
}
});

export default Login;
