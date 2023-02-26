import { useLayoutEffect, useContext } from "react";
import {  FlatList, StyleSheet, Text, Button, View, Pressable, Image, ScrollView } from "react-native";
import CartIcon from "../components/CartICon";
import { useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
// import { WishListContext } from "../store/context/WishList";
import { addWishList, removeWishList } from "../store/redux/wishList";
import RenderHtml from 'react-native-render-html';
// import { SliderBox } from "react-native-image-slider-box";





function AnimeInfo({route, navigation, addToCart, cart}) {
  const { width } = useWindowDimensions();

  // const wishListCtx = useContext(WishListContext)

  const wishListItems = useSelector((state) => state.wishListItems.ids)
  const dispatch =  useDispatch()
    const product = route.params.product


    const source = {
      html: product.description
    };
    
    const isItemFav = wishListItems.includes(product)
    function handle() {
      navigation.navigate('Cart')
  }

  function wishHandle() {
    console.log('added ')
    if(isItemFav){
      // wishListCtx.removeWishList(product)
      dispatch(removeWishList({id: product}))
    }else {
      // wishListCtx.addWishList(product)
      dispatch(addWishList({id: product}))
    }
  }
    useLayoutEffect(() => {
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

            function renderPopularItem(itemData) {
 
              
              // const images =  [
              //   "https://source.unsplash.com/1024x768/?nature",
              //   "https://source.unsplash.com/1024x768/?water",
              //   "https://source.unsplash.com/1024x768/?girl",
              //   "https://source.unsplash.com/1024x768/?tree", 
              // ]
        
              
                return (
                  <Image  key={itemData.item.id} style={{height: 400, width: 300}} source={{uri: itemData.item.src}}/>

              

                )
            }
    return (
      
         <View  style={styles.container}>
           
           <FlatList
            data={product.images}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            horizontal
            showsHorizontalScrollIndicator={false}
           
          />
           
           <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
         



         <Text>{product.name}</Text>
         <Text>{product.price}</Text>
         {product.sale_price && <Text>{product.sale_price}</Text>}
       
         <RenderHtml
      contentWidth={width}
      source={source}
    />

        
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
        padding: 0,
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        justifyContent: 'center ',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 15,
        width: '100%',
        backgroundColor: '#FF9900',
        
    },
    cartbtn: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    btn: {
      flex: 1,
      width: '100%'
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1,
        height: 125,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
  
})
export default AnimeInfo