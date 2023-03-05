
import {  Text, View } from "react-native";
import Category from "../components/Category";
import Allitems from "../components/AllItems";



import { useState} from "react";
import { GlobalStyles } from "../util/styles";
import { useContextS } from "../store/context/AllContext";



function Home({navigation}) {
    let {  isLoading, isDark, allProducts } =  useContextS();

    const [activeCategory, setActiveCategory] = useState([])
    const [active, setActive] = useState('all')

   

 
  

    const gteProducts = (id) =>{
       
        setActive(id)
        if(id === 'all'){
            return setActiveCategory(allProducts.slice(0,12))
        }
        const cartItems = allProducts.map((cart)=> {
            return cart.categories.map(cat => (cart)).filter((val)=> {
              return val.categories[0].name === id
                  });          
            });
        
          const merged = [].concat.apply([], cartItems);
          let uniqueChars = [...new Set(merged)];
         
        setActiveCategory(uniqueChars)
        
        }
  



    return (
         <View style={{backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme, flex: 1, paddingHorizontal: 5, paddingBottom: 30}}>
             

         <Category active={active}  setActive={setActive} pro={allProducts} onPress={gteProducts}/>
         <Allitems   pro={activeCategory.length < 1 ?  allProducts.slice(0,12) : activeCategory} isLoading={isLoading} navigation={navigation}/>
         </View>
    )
}

export default Home