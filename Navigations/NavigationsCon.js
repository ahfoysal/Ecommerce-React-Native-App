import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import Home from '../screens/Home';
import Single from '../screens/SingleProduct';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()


function NavigationCon({isLoading, allProducts, setCart , cart, addToCart}) {
  let Total = cart.map((qun) => qun.quantity)
  let sum = 0; 
  
  Total.forEach(item => {
      sum += item;
    });
   
    function BottomNavigator() {
        return (  <BottomTab.Navigator >
            <BottomTab.Screen  name="Home"  options={{
              title: 'Home',
              tabBarIcon: ({color, size}) => <Entypo name="home" size={size} color={color} />,
      
           
            }}> 
            {(props) => <Home isLoading={isLoading} pro={allProducts} {...props} />}
            
            </BottomTab.Screen>
          
      
      
      
            <BottomTab.Screen  name="My Cart"   options={{
          
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cart" size={size} color={color} />,
          tabBarBadge: sum > 0 ? sum : null
       
        }}>
        {(props) => <Cart cart={cart} setCart={setCart}  {...props} />}
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

        <Stack.Screen  name="Home"  options={{
          title: 'Home',
          contentStyle: {backgroundColor: '#141414'},
        }}> 
        {(props) => <Home isLoading={isLoading} pro={allProducts} {...props} />}
        
        </Stack.Screen>
        <Stack.Screen  name="Info" 
        options={({route}) => {
          const CatId = route.params.product.name
          return {
              title: CatId
          }; }} 
          >
        {(props) => <Single addToCart={addToCart} cart={cart} {...props} />}
        </Stack.Screen>
        
        <Stack.Screen  name="My Cart"   options={{
    
          tabBarBadge: sum > 0 ? sum : null
       
        }}>
        {(props) => <Cart cart={cart} setCart={setCart}  {...props} />}
        </Stack.Screen>
        
        <Stack.Screen  name="Checkout"  >
        {(props) => <Checkout cart={cart} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>


      
     
    
      </NavigationContainer>
        
       
    )
}

export default NavigationCon