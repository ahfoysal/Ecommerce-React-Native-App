
import {  Text, View } from "react-native";
import Category from "../components/Category";
import Allitems from "../components/AllItems";3

import { useState} from "react";
import { GlobalStyles } from "../util/styles";



function Home({pro, isLoading, navigation, isDark }) {
    const [activeCategory, setActiveCategory] = useState([])

   

 
  

    const gteProducts = (id) =>{
        console.log('working')
        if(id == 'all'){
            return setActiveCategory(pro)
        }
        const cartItems = pro.map((cart)=> {
            return cart.categories.map(cat => (cart)).filter((val)=> {
              return val.categories[0].name === id
                  });          
            });
        
          const merged = [].concat.apply([], cartItems);
          let uniqueChars = [...new Set(merged)];
         
        setActiveCategory(uniqueChars)
        
        }
  



    return (
         <View style={{backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme, flex: 1, paddingHorizontal: 10, paddingBottom: 80}}>
         <Category  pro={pro} onPress={gteProducts}/>
         <Allitems  pro={activeCategory.length < 1 ?  pro : activeCategory} isLoading={isLoading} navigation={navigation}/>
       
         </View>
    )
}

export default Home