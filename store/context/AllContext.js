import { createContext, useEffect, useState, useContext } from "react";



const contextProviderS = createContext();

export function ContextProviderS({ children }) {
  
   
    const [cart , setCart] = useState([])

    const [isLoading, setLoading] = useState(true);
    const [allProducts , setAllProducts] = useState([]);
    const [isDark , setIsDark] = useState(true);
    const [isLoggedIn , setIsLoggedIn ] = useState(false);
   


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
     
  





    return(  
    <contextProviderS.Provider value={{  addToCart, cart ,setCart , isLoading,   setLoading, allProducts, setAllProducts, isDark,   setIsDark, isLoggedIn , setIsLoggedIn   }}>{children}</contextProviderS.Provider>)
    ;

}

export function useContextS() {
    return useContext(contextProviderS);
}


