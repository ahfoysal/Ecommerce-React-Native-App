import * as React from 'react';
import { View, StyleSheet, useWindowDimensions } from "react-native"
import { GlobalStyles } from "../util/styles"
import { TabView, SceneMap } from 'react-native-tab-view';



function OrderList({navigation, isDark}) {
    
    const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const FirstRoute = () => (

    <View style={{ flex: 1, }} />
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, }} />
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: FirstRoute,
    fourth: SecondRoute,
  });
  const [routes] = React.useState([
    { key: 'first', title: 'To Pay' },
    { key: 'second', title: 'To Received' },
    { key: 'third', title: 'cancelled' },
    { key: 'fourth', title: 'All Orders' },
  ]);

    return (
        <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
       
       <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
          </View>

        
    )
}

export default OrderList

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // marginTop: 20
      
    },
    innerContainer: {
        flexDirection: 'row',
        marginVertical: 6,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 125,
        // justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})