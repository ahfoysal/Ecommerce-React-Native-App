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
// import { useContext } from 'react';
// import { WishListContext } from '../store/context/WishList';
import { useSelector } from 'react-redux';
import SingleOrder from '../screens/SingleOrder';
import Account from '../screens/Account/Account';
import OrderList from '../screens/OrderList';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()


function NavigationCon({isLoading, allProducts, setCart , cart, addToCart, isDark, isLoggedIn}) {
  // const wishListCtx = useContext(WishListContext)
  const wishListItems = useSelector(state => state.wishListItems.ids )



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
              tabBarIcon: ({color, size}) => <Entypo name="home" size={size} color={color} />,
      
           
            }}> 
            {(props) => <Home isLoading={isLoading} pro={allProducts} isDark={isDark} {...props} />}
            
            </BottomTab.Screen>
          
      
      
      
            <BottomTab.Screen  name="Cart"    options={{
          
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cart" size={size} color={color} />,
          tabBarBadge: sum > 0 ? sum : null,
          tabBarBadgeStyle: {backgroundColor: '#f7bc0c', marginHorizontal: 5}
       
        }}>
        {(props) => <Cart  isDark={isDark} cart={cart} setCart={setCart}  {...props} />}
        </BottomTab.Screen>
        
        <BottomTab.Screen  name="Wish List"   options={{
          
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="heart" size={size} color={color} />,
          tabBarBadge: wishListItems.length > 0 ? wishListItems.length : null,
          tabBarBadgeStyle: {backgroundColor: '#f7bc0c', marginHorizontal: 5}

        }}>
        {(props) => <WishListScreen   {...props} />}
        </BottomTab.Screen>

        <BottomTab.Screen  name="Account"   options={{
          
          tabBarIcon: ({color, size}) => <Ionicons name='person-sharp' size={size} color={color} />,
       
        }}>
        {(props) => <Account  isDark={isDark} isLoggedIn={isLoggedIn} {...props} />}
        </BottomTab.Screen>
        
        
      
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
          }; }} 
          >
        {(props) => <Single addToCart={addToCart} cart={cart} isDark={isDark} allProducts={allProducts} {...props} />}
        </Stack.Screen>
        
       
        
        <Stack.Screen  name="Checkout"  >
        {(props) => <Checkout cart={cart} isDark={isDark} setCart={setCart} {...props} />}
        </Stack.Screen>

        <Stack.Screen  name="SingleOrder"  >
        {(props) => <SingleOrder  isDark={isDark} {...props} />}
        </Stack.Screen>

        <Stack.Screen  name="Login"  >
        {(props) => <Login  isDark={isDark} {...props} />}
        </Stack.Screen>

        <Stack.Screen  name="OrderList"  >
        {(props) => <OrderList  isDark={isDark} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>


      
     
    
      </NavigationContainer>
        
       
    )
}

export default NavigationCon