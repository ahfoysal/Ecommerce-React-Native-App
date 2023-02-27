import { useLayoutEffect, useContext } from "react";
import {   StyleSheet, Text, Button, View, Pressable,  ScrollView } from "react-native";
import CartIcon from "../components/CartICon";
import ImageContainer from "../components/Test/Test";
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
// import { WishListContext } from "../store/context/WishList";
import { addWishList, removeWishList } from "../store/redux/wishList";
import RenderHtml from 'react-native-render-html';
import { GlobalStyles } from "../util/styles";
import { Ionicons } from '@expo/vector-icons'; 









function AnimeInfo({route, navigation, addToCart, cart, isDark}) {
  
  const { width } = useWindowDimensions();

  // const wishListCtx = useContext(WishListContext)

  const wishListItems = useSelector((state) => state.wishListItems.ids)
  const dispatch =  useDispatch()
    const product = route.params.product
    const Images = product.images.map((img => img))



    const source = {
      html: product.description
    };
    
    const isItemFav = wishListItems.includes(product)
    function handle() {
      navigation.navigate('Cart')
  }

  function wishHandle() {
    // console.log('added ')
    if(isItemFav){
      // wishListCtx.removeWishList(product)
      dispatch(removeWishList({id: product}))
    }else {
      // wishListCtx.addWishList(product)
      dispatch(addWishList({id: product}))
    }
  }
    useLayoutEffect(() => {
      // console.log(product)
      navigation.setOptions({
          headerRight: () => {
             
            
              return <>
              
              <MaterialCommunityIcons  onPress={wishHandle}  name={isItemFav ? 'heart' : 'heart-outline'} color='white'  size={28}/>
              <CartIcon onPress={handle} cart={cart}/>


              </>
          }
      })
      },[navigation, handle, wishHandle])



    function pressHandler(){
      addToCart(product)
   
            }

       
    return (
      
         <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
         }]}>
         
           <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
         <ImageContainer  Images={Images}/>

         <View style={[styles.innerContainer, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
         }]}>
         <Text style={styles.title}>{product.name}</Text>
         <View style={{flexDirection : 'row'}}>
          <Text style={[styles.price, {fontSize: 18, paddingTop: 7, marginRight: 2}]}>৳</Text>
          <Text style={styles.price}>{product.price}</Text>
          {product.sale_price &&         <Text style={[styles.price , {fontSize: 15, paddingTop: 10, color: GlobalStyles.colors.pink200, marginLeft: 12,
          textDecorationStyle: 'solid', textDecorationLine: 'line-through'
          }]}>৳ {product.regular_price}</Text>}
          </View>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
        <Ionicons name='star' size={16} color={GlobalStyles.colors.yellow200} />
        <Text style={{color: 'white', fontSize: 13, marginLeft: 10}}>0.00</Text>


        </View>
  

         </View>
         <View style={[{backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
         }]}>
       
       
      {product?.attributes.length > 1 &&
        <View style={{ marginVertical: 10,}}>   
       
         {product?.attributes.map((att) => {
    return <View key={att.name} style={{flexDirection: 'column', marginVertical: 10}}> 
    <Text style={{color: 'white'}}>{att.name} : {att?.option}   </Text>
    
    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
       
    {att.options?.map((opt, index) => {
                              return  <Text key={opt} style={{color: 'white'}} onPress={() => console.log(product.variations[index] , opt) }>{opt} </Text>
                      }
                    )}
        </View>
       </View>
   
  })}
        </View>
        

      }
 

  
  


         </View>
         {/* <RenderHtml
      contentWidth={width}
      source={source}
    /> */}

        
                </ScrollView>
         <View  >
         <Pressable   onPress={pressHandler}>
            <Text  style={{   padding: 15,
        width: 450,
        textAlign: 'center',
        backgroundColor: '#FF9900',
        color: 'white' }}>Add To Cart</Text>
         </Pressable>
        </View>  
       
         </View>
       
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
      
    },
    innerContainer: {
      margin: 10,
      paddingHorizontal: 15,
      paddingVertical: 15
    },
    title: {
      color: 'white',
      fontSize: 18,
      marginVertical: 5,
    },
      price: {
        color: GlobalStyles.colors.text500,
        fontWeight: '600',
        fontSize: 24,
        marginVertical: 10
        
      }
  
})
export default AnimeInfo