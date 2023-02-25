import { useEffect, useState } from 'react';
import { StyleSheet,  View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Single from './screens/SingleProduct';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

export default function App({navigation}) {
  const [cart , setCart] = useState([])
const [isLoading, setLoading] = useState(true);
const [allProducts , setAllProducts] = useState([]);


  function addToCart(id) {
    
    
    let indexOfObject = cart.filter(object => {
      return object.name === id.name;
    });
    if(indexOfObject.length >= 1){
      indexOfObject[0].quantity = indexOfObject[0].quantity+1
    // console.log(indexOfObject[0])
    const newCart = [...cart, indexOfObject[0]];
    
    const unique = [...new Map(newCart.map((m) => [m.name  , m])).values()];
    // console.log(unique);

    setCart(unique);
    // console.log(newCart)
      return 

    }
    console.log(indexOfObject)
    id.quantity = 1
    const newCart = [...cart, id];
    
    setCart(newCart);
    // console.log(newCart)
      
}
const clearTheCart = () => {
  
  setCart([]) 
 

}


useEffect(() => {
        
  dataFetch()
}, [])
let shopLink = 'https://shop.abusayeeed.xyz/wp/'
key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
const dataFetch = async () => {
const data = await (
  await fetch(
    shopLink+`wp-json/wc/v3/products?`+key+'&per_page=100'
  )
).json();

// set state when the data received

setAllProducts(data)
setLoading(false)
};
let Total = cart.map((qun) => qun.quantity)
let sum = 0; 

Total.forEach(item => {
    sum += item;
  });

  return (
  <>
  <StatusBar barStyle={'default'}  />

    <View style={styles.container}>
      <NavigationContainer>
      <BottomTab.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#141414'}, 
          headerTintColor: 'white',
          
      }}>
        <BottomTab.Screen  name="Home"  options={{
          title: 'Home',
          contentStyle: {backgroundColor: '#141414'},
          tabBarIcon: ({color, size}) => <Entypo name="home" size={size} color={color} />,

       
        }}> 
        {(props) => <Home isLoading={isLoading} pro={allProducts} {...props} />}
        
        </BottomTab.Screen>
        <BottomTab.Screen  name="Info" 
        // options={({route, navigation}) => {
        //   const CatId = route.params.product.name
        //   return {
        //       title: CatId
        //   }; }} 
          >
        {(props) => <Single addToCart={addToCart} cart={cart} {...props} />}
        </BottomTab.Screen>
        
        <BottomTab.Screen  name="My Cart"   options={{
    
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="cart" size={size} color={color} />,
          tabBarBadge: sum > 0 ? sum : null
       
        }}>
        {(props) => <Cart cart={cart} setCart={setCart}  {...props} />}
        </BottomTab.Screen>
        
        <BottomTab.Screen  name="Checkout"  >
        {(props) => <Checkout cart={cart} {...props} />}
        </BottomTab.Screen>



        <BottomTab.Screen  name="Orders"  options={{
          title: 'Orders',
       
          tabBarIcon: ({color, size}) => <Ionicons name="ios-person-sharp" size={size} color={color} />,

       
        }} >
        {(props) => <Checkout cart={cart} {...props} />}
        </BottomTab.Screen>

        
        <BottomTab.Screen  name="Account"  options={{
          title: 'Account',
       
          tabBarIcon: ({color, size}) => <Ionicons name="ios-person-sharp" size={size} color={color} />,

       
        }} >
        {(props) => <Checkout cart={cart} {...props} />}
        </BottomTab.Screen>



      </BottomTab.Navigator>
     
    
      </NavigationContainer>
        
       

        </View>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    
    
  }

});
