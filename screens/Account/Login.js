
import React, {  useState } from 'react';
import {  Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useContextS } from '../../store/context/AllContext';
import { GlobalStyles } from '../../util/styles';
import { Input } from '@rneui/themed';
import { Button } from 'react-native-elements';




const Login = ({navigation ,route}) => {
    let {  isDark } =  useContextS();
    const [loading, setLoading] = useState(false)
    const [loginEmail, setLoginEmail] = useState('');


 
  const BUTTON = ({children}) => (    
                      <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 200, borderRadius: 8}} onPress={() => navigation.navigate('Home')}>
              <Text  style={{   padding: 10,
              color: 'white',
          textAlign: 'center',
                  fontWeight: 'bold'
      }}>{children}</Text>
           </Pressable>
  );

function LoginHandle() {
  console.log("Pressed")
  setLoading(true)
}
function SignUpHandler() {}


  const LoginFunction = () => (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   
    <View style={[styles.scene]}>
    <Text  style={{    color: 'white',fontWeight: 'bold', fontSize: 20, margin: 10}}>Welcome Back</Text>
    <Text  style={{    color: 'white', fontSize: 12, margin: 10}}>Login with your email and password.</Text>

        <Input    
      placeholder='Email'
      onChangeText={value => setLoginEmail({ comment: value })}
        />
       

    <Input placeholder="Password"
  
     secureTextEntry={true} />
     <View style={{alignItems: 'center'}}>
    {/* <BUTTON>LOGIN</BUTTON> */}
    <Button
    // loadingStyle={}
    buttonStyle={{backgroundColor: GlobalStyles.colors.orange400, borderRadius: 8, paddingHorizontal: 80}}
  title="LOGIN"
  onPress={LoginHandle}
  loading={loading}
/>
    </View>
    </View>
 
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
  
 
  const SignUpFunction = () => (
    <View style={[styles.scene]} >
     <BUTTON>SIGNUP</BUTTON>
    </View>
  );

   
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Login' },
    { key: 'second', title: 'SignUp' },
   
  ]);



  const renderScene = SceneMap({
    first: LoginFunction,
    second: SignUpFunction,
   
  });

  return (
   
    <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
    }]}>
     
   
     <TabView style={{flex: 1}}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      // inactiveColor={'rgb(168,170,199)'}
    /> 
    
  
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

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      tabStyle={styles.tabStyle}
      labelStyle={styles.labelStyle}
    />
  );