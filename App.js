
import { StyleSheet,  View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import AnimeInfo from './screens/AnimeInfo';

const Stack = createNativeStackNavigator()


export default function App() {

  return (
  <>
  <StatusBar barStyle={'default'}  />

    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Home" component={Home}/>
        <Stack.Screen  name="Info" component={AnimeInfo}/>


      </Stack.Navigator>
     
    
      </NavigationContainer>
        
       

        </View>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    padding: 20,
    flex: 1,
    
    
  }

});
