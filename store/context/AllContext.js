import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";


const contextProviderS = createContext();

export function ContextProviderS({ children, navigation }) {
  
   
    const [cart , setCart] = useState([])

    const [isLoading, setLoading] = useState(true);
    const [allProducts , setAllProducts] = useState([]);
    const [isDark , setIsDark] = useState(true);
    const [isLoggedIn , setIsLoggedIn ] = useState(true);
    const [userInfo , setUserInfo] = useState({});

   


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
       const Store = async (jwt) => {
      try {
        await AsyncStorage.setItem(
          '@MySuperStore:key',
          jwt,
        );
      } catch (error) {
        // Error saving data
      }
    }
    const isLoggedInCheck = async () => {
      
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
          if (value === null){return setIsLoggedIn(false)}
          if (value !== null) {
            // We have data!!
            console.log(value);
            try {
              const data = jwt_decode(value);
              console.log(data)
              setUserInfo(data)
              // valid token format
            } catch(error) {
              // invalid token format
            }
            setIsLoggedIn(true)
          }
        } catch (error) {
          // Error retrieving data
        }
      
    }

    useEffect(() => {
          
      isLoggedInCheck()
      dataFetch()
    
    }, [])
    
    let StoreLink = `https://sslcommerz-gateway-yjsc.vercel.app/shop`
    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
    key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
    const dataFetch = async () => {
    const data = await (
      await fetch(
        `${StoreLink}/products/&per_page=100`
      )
    ).json();
    
    
    setAllProducts(data)
    setLoading(false)
    };
    
    
 
     
  
    



    return(  
    <contextProviderS.Provider value={{   addToCart, cart ,setCart , isLoading,   setLoading, allProducts, 
                                           setAllProducts, isDark,   setIsDark, isLoggedIn , setIsLoggedIn,
                                           setUserInfo, userInfo       }}>{children}</contextProviderS.Provider>)
    ;

}

export function useContextS() {
    return useContext(contextProviderS);
}


