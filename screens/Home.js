
import {  Text, View } from "react-native";
import Category from "../components/Category";
import Allitems from "../components/AllItems";3

import { useState,  useLayoutEffect} from "react";



function Home({pro, isLoading, navigation }) {
    const [activeCategory, setActiveCategory] = useState([])

   

    useLayoutEffect(() => {
    navigation.setOptions({
    
        headerLeft: () => {
            return <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 5}}>Pewds</Text>
        }
    })
    },[navigation])
  

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
         <View>
         <Category  pro={pro} onPress={gteProducts}/>
         <Allitems  pro={activeCategory.length < 1 ?  pro : activeCategory} isLoading={isLoading} navigation={navigation}/>
       
         </View>
    )
}

export default Home