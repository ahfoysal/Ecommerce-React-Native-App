import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import Home from '../screens/Home';
import Single from '../screens/ProductContainer/SingleProduct';
import Cart from '../screens/cartContainer/Cart';
import Checkout from '../screens/checkoutContainer/Checkout';
import WishListScreen from '../screens/WishListScreen';
import Login from '../screens/Account/Login';
import { useSelector } from 'react-redux';
import SingleOrder from '../screens/SingleOrder';
import Account from '../screens/Account/Account';
import OrderList from '../screens/OrderListContainer/OrderList';
import { useEffect, useState } from 'react';
import { useContextS } from '../store/context/AllContext';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()


function NavigationCon() {
 
  const wishListItems = useSelector(state => state.wishListItems.ids )

  let { cart} =  useContextS();

  let Total = cart.map((qun) => qun.quantity)
  let sum = 0; 
  
  Total.forEach(item => {
      sum += item;
    });
   
    function BottomNavigator() {
        return (  <BottomTab.Navigator    screenOptions={{
          headerStyle: { backgroundColor: '#141414'},
          headerTintColor: 'white',
        
          tabBarActiveTintColor: '#f7bc0c',
          tabBarStyle: {backgroundColor: '#141414'}, 
        
        }}>
            <BottomTab.Screen  name="Home"  options={{
              title: 'Home',
              tabBarIcon: ({color, size}) => <Entypo name="home" size={size} color={color} />
              }}  component ={Home} /> 
    
          
      
      
      
            <BottomTab.Screen  name="Cart"    options={{      
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cart" size={size} color={color} />,
          tabBarBadge: sum > 0 ? sum : null,
          tabBarBadgeStyle: {backgroundColor: '#f7bc0c', marginHorizontal: 5}}} component ={Cart} />
        
        
        <BottomTab.Screen  name="Wish List"   options={{ 
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="heart" size={size} color={color} />,
          tabBarBadge: wishListItems.length > 0 ? wishListItems.length : null,
          tabBarBadgeStyle: {backgroundColor: '#f7bc0c', marginHorizontal: 5}
        }}  component={WishListScreen} />
        

        <BottomTab.Screen  name="Account"   options={{  
          tabBarIcon: ({color, size}) => <Ionicons name='person-sharp' size={size} color={color} />,
       }} component={Account} />
       
        
        
      
            </BottomTab.Navigator>
        )
      
      }

      
    
    return (
        <NavigationContainer>

      <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#141414'}, 
          headerTintColor: 'white',
          
      }}>
     
        <Stack.Screen  name="Nav"  component={BottomNavigator} options={{headerShown: false,}} />

      

        <Stack.Screen  name="Info" 
        options={({route}) => {
          const CatId = route.params.product.name
          return {
              title: CatId
          }; }} component={Single}   />
       
        
       
        
        <Stack.Screen  name="Checkout"  component={Checkout}  />
       

        <Stack.Screen  name="SingleOrder"  component={SingleOrder} />
     

        <Stack.Screen  name="Login" component={Login} />
        

        <Stack.Screen  name="OrderList"  >
        {(props) => <OrderList   {...props} />}
        </Stack.Screen>

      </Stack.Navigator>


      
     
    
      </NavigationContainer>
        
       
    )
}

export default NavigationCon