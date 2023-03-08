
import React, {  useState } from 'react';
import {  Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useContextS } from '../../store/context/AllContext';
import { GlobalStyles } from '../../util/styles';
import { Input } from '@rneui/themed';
import { Button } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";






const Login = ({navigation ,route}) => {
    let {  isDark, setUserInfo , setIsLoggedIn, isLoggedInCheck } =  useContextS();
    const [loading, setLoading] = useState(false)
    const [loginEmail, setLoginEmail] = useState('hello');
    const [password, setPassword] = useState('test1234');
    const [err, setErr] = useState('');


    const Store = async (jwt) => {
      try {
        await AsyncStorage.setItem(
          '@MySuperStore:key',
          jwt,
        );
      } catch (error) {
        // Error saving data
      }
    }

    const  LoginHandle = () => {
      if(!loginEmail){
        return setErr('Please enter email')}
            if(!password){
                return setErr('Please enter password')}
      setErr('')
      setLoading(true)
      fetch(`https://shop.abusayeeed.xyz/wp/?rest_route=/simple-jwt-login/v1/auth&username=${loginEmail}&password=${password}&THISISMySpeCiaLAUthCodee=THISISMySpeCiaLAUthCodee`, {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
    if(json.success === false){ 
      setErr(json.data.message)
      setLoading(false)}
        if(json.success === true){
          const tokens = json.data.jwt
          console.log(json)
          Store(tokens)
          try {
            const data = jwt_decode(tokens);
            console.log(data)
            setUserInfo(data)
            isLoggedInCheck()
            
          } catch(error) {
            // invalid token format
          }
          setIsLoggedIn(true)
          navigation.navigate('Account')
          
          
          // console.log(json.data.jwt)
        
        }
    console.log(json)})
    }

  return (
   
    <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
    }]}>
     
   
     <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   
    <View style={[styles.scene]}>
    <Text  style={{    color: 'white',fontWeight: 'bold', fontSize: 20, margin: 10}}>Welcome Back </Text>
    <Text  style={{    color: 'white', fontSize: 12, margin: 10}}>Login with your email and password.</Text>
   {err && <Text  style={{    color: 'red', fontSize: 12, margin: 10}}>{err}</Text>}

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
     {/* <View style={{alignItems: 'center'}}> */}
    <Button
    buttonStyle={{backgroundColor: GlobalStyles.colors.orange400, borderRadius: 8, marginTop: 20}}
  title="LOGIN"
  onPress={() => LoginHandle()}
  loading={loading}
/>
<Button
    buttonStyle={{backgroundColor: GlobalStyles.colors.darkTheme, borderRadius: 8, marginTop: 20}}
  title="SIGN UP"
  onPress={() => navigation.navigate('SignUp')}
 
/>
    {/* </View> */}
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
