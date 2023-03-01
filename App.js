import { useEffect, useState } from 'react';
import { StyleSheet,  View, StatusBar } from 'react-native';
import NavigationsCon from './Navigations/NavigationsCon'
import WishListContextProvider from './store/context/WishList';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App({navigation}) {
  const [cart , setCart] = useState([])
const [isLoading, setLoading] = useState(true);
const [allProducts , setAllProducts] = useState([]);
const [isDark , setIsDark] = useState(true);
const [isLoggedIn , setIsLoggedIn ] = useState(true);









  function addToCart(id) {
    
    
    let indexOfObject = cart.filter(object => {
      return object.id === id.id;
    });
    if(indexOfObject.length >= 1){
      indexOfObject[0].quantity = indexOfObject[0].quantity+1
    // console.log(indexOfObject[0])
    const newCart = [...cart, indexOfObject[0]];
    
    const unique = [...new Map(newCart.map((m) => [m.id  , m])).values()];
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


setAllProducts(data)
setLoading(false)
};
 

  return (
  <>
  <StatusBar barStyle={'default'}  />

    <SafeAreaView style={styles.container}>
 {/* <WishListContextProvider> */}
 <Provider store={store}>
 

<NavigationsCon  isLoading={isLoading} 
 allProducts={allProducts} 
 setCart={setCart}  
 cart={cart} 
 addToCart={addToCart} 
 isDark={isDark}
 isLoggedIn={isLoggedIn}
 />

   {/* </WishListContextProvider> */}
   </Provider>
        </SafeAreaView>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
    
    
    
  }

});
