
import {  Text, View } from "react-native";
import Category from "../components/Category";
import Allitems from "../components/AllItems";



import { useState} from "react";
import { GlobalStyles } from "../util/styles";



function Home({pro, isLoading, navigation, isDark }) {
    const [activeCategory, setActiveCategory] = useState([])
    const [active, setActive] = useState('all')

   

 
  

    const gteProducts = (id) =>{
       
        setActive(id)
        if(id == 'all'){
            return setActiveCategory(pro.slice(0,12))
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
         <View style={{backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme, flex: 1, paddingHorizontal: 5, paddingBottom: 30}}>
             

         <Category active={active}  setActive={setActive} pro={pro} onPress={gteProducts}/>
         <Allitems   pro={activeCategory.length < 1 ?  pro.slice(0,12) : activeCategory} isLoading={isLoading} navigation={navigation}/>
         </View>
    )
}

export default Home