import { openBrowserAsync } from 'expo-web-browser';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { GlobalStyles } from '../../util/styles';
import OrdersItemContainer from './OrdersItemContainer';




const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    tabStyle={styles.tabStyle}
    labelStyle={styles.labelStyle}
  />
);

const OrderList = ({navigation, isDark ,route}) => {
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
  function renderOrderItem(itemData) {
  
    return (
      <OrdersItemContainer image={itemData.item.image.src}  price={itemData.item.price} 
      
      name={itemData.item.name}  quantity={itemData.item.quantity} item={itemData.item}/>
    
    )
}

  function renderPopularItem(itemData) {
    const items = itemData.item
    return (
        // <CartItemContainer image={pro.item.image.src}  price={pro.item.price} 
      
        // name={pro.item.name}  quantity={pro.item.quantity} item={pro.item}/>
     <Pressable style={styles.innerContainer} onPress={() =>navigation.navigate('SingleOrder', {orderID: items.id})}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginHorizontal: 10}}>
      <View>
      <Text style={{color: GlobalStyles.colors.error50}}> Order  #{items.id} ></Text>
        <Text style={{color: GlobalStyles.colors.gray100}}> Placed on {new Date(items.date_created).toLocaleString()}</Text>
       </View>
       <Text style={{color: GlobalStyles.colors.pink200, fontWeight: 'bold'}}> {items.status}</Text>
      </View>
        <FlatList
            data={items.line_items}
            keyExtractor={(item, index) => index}
            renderItem={renderOrderItem}
            horizontal
         
           
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginBottom: 5 }}>
            <Text style={{color: 'white'}}>Total: {items.total}</Text>
           {items.needs_payment && <Pressable  onPress={() => openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${items.total}/${items.id}`)}  style={{borderColor: GlobalStyles.colors.orange400 ,borderWidth: 1, width: 100, borderRadius: 8, marginLeft: 20}} >
          <Text  style={{   padding: 4,         color: 'white'  , textAlign: 'center',     }}>Cancel</Text>
            </Pressable>}
            {items.needs_payment && <Pressable  onPress={() => openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${items.total}/${items.id}`)}  style={{backgroundColor: GlobalStyles.colors.orange400 , width: 100, borderRadius: 8, marginLeft: 20}} >
          <Text  style={{   padding: 4,         color: 'white'  , textAlign: 'center',      }}>Pay Now</Text>
            </Pressable>}

          </View>
      </Pressable>
    )
}

  const All = () => (
    <View style={[styles.scene]} >
     {orders.length > 0 ?   
      <FlatList
            data={orders}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
         
           
          /> :  <ContinueShopping />}
    </View>
  );
  
  const ToPay = () => (
    <View style={[styles.scene]} >
      {payNeed.length > 0 ?   
      <FlatList
            data={payNeed}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
         
           
          /> :  <ContinueShopping />}
    </View>
  );
  const ToReceive = () => (
    <View style={[styles.scene]} >
    {ToReceive.length > 0 ?   
      <FlatList
            data={ToReceive}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
         
           
          /> :  <ContinueShopping />}
    </View>
  );
  
  const Cancelled = () => (
    <View style={[styles.scene]} >
    {ToCancelled.length > 0 ?   
      <FlatList
            data={ToCancelled}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
         
           
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

//   useLayoutEffect(() => {
// //    setIndex(open)
//     // console.log(orders)
//   }, [])

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