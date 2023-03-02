
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useContextS } from '../../store/context/AllContext';
import { GlobalStyles } from '../../util/styles';
import RenderPopularItem from './singleProvider';




const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    tabStyle={styles.tabStyle}
    labelStyle={styles.labelStyle}
  />
);

const OrderList = ({navigation ,route}) => {
  let {  isDark } =  useContextS();
  const open = route.params.itemId
  const orders = route.params.orders


  const payNeed = orders.filter(order => {
    return order.status == 'pending'
  })
  const ToReceived = orders.filter(order => {
    return order.status == 'processing'
  })
  const ToCancelled = orders.filter(order => {
    return order.status == 'cancelled'
  })
 

 
  const ContinueShopping = () => (
    
         <View style={{ marginVertical: 100, alignItems: 'center'}}>
                      <Text style={{color: GlobalStyles.colors.lightTheme, textAlign: 'center'}}>There are no orders Placed yet.</Text>
                      <Pressable    style={{backgroundColor: GlobalStyles.colors.orange400 , width: 200, borderRadius: 8, marginVertical: 100}} onPress={() => navigation.navigate('Home')}>
              <Text  style={{   padding: 10,
              color: 'white',
          textAlign: 'center',
                  fontWeight: 'bold'
      }}>Continue Shopping</Text>
           </Pressable>
                  </View>
                 
   
  );


 

  const All = () => (
    <View style={[styles.scene]} >
     {orders.length > 0 ?   
      <FlatList
            data={orders}
            keyExtractor={(item, index) => index}
            renderItem={( item ) => <RenderPopularItem itemData={item} navigation ={navigation}/>}         
           
          /> :  <ContinueShopping />}
    </View>
  );
  
  const ToPay = () => (
    <View style={[styles.scene]} >
      {payNeed.length > 0 ?   
      <FlatList
            data={payNeed}
            keyExtractor={(item, index) => index}
            renderItem={( item ) => <RenderPopularItem itemData={item} navigation ={navigation}/>}         
         
           
          /> :  <ContinueShopping />}
    </View>
  );
  const ToReceive = () => (
    <View style={[styles.scene]} >
    {ToReceived.length > 0 ?   
      <FlatList
            data={ToReceived}
            keyExtractor={(item, index) => index}
            renderItem={( item ) => <RenderPopularItem itemData={item} navigation ={navigation}/>}         
         
           
          /> :  <ContinueShopping />}
    </View>
  );
  
  const Cancelled = () => (
    <View style={[styles.scene]} >
    {ToCancelled.length > 0 ?   
      <FlatList
            data={ToCancelled}
            keyExtractor={(item, index) => index}
            renderItem={( item ) => <RenderPopularItem itemData={item} navigation ={navigation}/>}         
         
           
          /> :  <ContinueShopping />}
  </View>
  );

   
  const [index, setIndex] = useState(open || 0);
  const [routes] = useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'To Pay' },
    { key: 'third', title: 'To Receive' },
    { key: 'fourth', title: 'Cancelled' },
  ]);



  const renderScene = SceneMap({
    first: All,
    second: ToPay,
    third: ToReceive,
    fourth: Cancelled,
  });

  return (
    <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
    }]}>
   
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: GlobalStyles.colors.darkTheme,
  },
  tabStyle: {
    width: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  labelStyle: {
    fontSize: 12,
    
    margin: 2,
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

export default OrderList;