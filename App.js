
import { StyleSheet,  View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Single from './screens/SingleProduct';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator()


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

  return (
  <>
  <StatusBar barStyle={'default'}  />

    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: '#141414'}, 
          headerTintColor: 'white',
          
      }}>
        <Stack.Screen  name="Home"  options={{
          title: 'Home',
          contentStyle: {backgroundColor: '#141414'},
       
        }}> 
        {(props) => <Home isLoading={isLoading} pro={allProducts} {...props} />}
        
        </Stack.Screen>
        <Stack.Screen  name="Info" 
        options={({route, navigation}) => {
          const CatId = route.params.product.name
          return {
              title: CatId
          }; }} 
          >
        {(props) => <Single addToCart={addToCart} cart={cart} {...props} />}
        </Stack.Screen>
        <Stack.Screen  name="Cart"  >
        {(props) => <Cart cart={cart} setCart={setCart}  {...props} />}
        </Stack.Screen>
        <Stack.Screen  name="Checkout"  >
        {(props) => <Checkout cart={cart} {...props} />}
        </Stack.Screen>



      </Stack.Navigator>
     
    
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
