import { StyleSheet, StatusBar } from 'react-native';
import NavigationsCon from './Navigations/NavigationsCon'
import { ContextProviderS } from './store/context/AllContext';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending']);



export default function App({navigation}) {
  

  return (
  <>
  <StatusBar barStyle={'default'}  />

    <SafeAreaView style={styles.container}>
    <ContextProviderS>
   
    <Provider store={store}> 
<NavigationsCon />
  </Provider>
  

  </ContextProviderS>

 
        </SafeAreaView>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    
    
    
  }

});
