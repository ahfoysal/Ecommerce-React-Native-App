
import React, { useEffect, useState } from 'react';
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
  let {  isDark, userInfo } =  useContextS();
  const open = route.params.itemId
  // const orders = route.params.orders
  const [orders, setOrders] =useState([])
  const [isLoading, setIsLoading] =useState(false)
  
  // let shopLink = 'https://shop.abusayeeed.xyz/wp/'
  // key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
  
  let shopLink = 'https://shop.tazreemart.com/index.php/'
  key='consumer_key=ck_99ddb89db91e4691a163af42f098a1b00c482041&consumer_secret=cs_5738b6a3295a0ba1fbf3852977eb03b50fa018c8'
 
  const dataFetch = async () => {
  
  
  const order = await (
      await fetch(
        shopLink+`wp-json/wc/v3/orders`+`?customer=${userInfo.id}&`+key+'&per_page=100',
        {
          headers: {
            'Origin': 'https://pewds-shop.vercel.app'
          }
        }
        // `${StoreLink}/orders/&per_page=100&customer=36`


      )
    ).json();
    console.log(order.length)
    setOrders(order)
    setIsLoading(true)
    
  
  };
  useEffect(() => {
          
  
      dataFetch()
    
    }, [])




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
   
    {isLoading ?  <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    /> : <Text style={{color: 'white'}}>Loading</Text>}
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