import { useEffect, useLayoutEffect, useState } from "react";
import {   StyleSheet, Text, View, Pressable,  ScrollView, Image } from "react-native";
import CartIcon from "../components/CartICon";
import ImageContainer from "../components/Test/Test";
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
// import { WishListContext } from "../store/context/WishList";
import { addWishList, removeWishList } from "../store/redux/wishList";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { GlobalStyles } from "../util/styles";
import { Ionicons } from '@expo/vector-icons'; 









function AnimeInfo({route, navigation, addToCart, cart, isDark}) {

  const [isLoading, setLoading] = useState(true);
const [variations , setVariations] = useState([]);


  

const { width } = useWindowDimensions();

  const wishListItems = useSelector((state) => state.wishListItems.ids)
  const dispatch =  useDispatch()
    const product = route.params.product





    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
    key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
    
    const dataFetch = async () => {
      const data = await (
        await fetch(
          shopLink+`wp-json/wc/v3/products/`+product.id+`/variations?`+key+'&per_page=100'
        )
      ).json();
      
      console.log('data')
      const ctgName =  data.map(product => {
        return product.image.src})
        console.log(ctgName)


      setVariations(data)
      setLoading(false)
      };
       



    const Images = product.images.map((img => img))



    const source = {
      html: product.description 
    };
    const tagsStyles = {
     
      a: {
        color: 'white'
      },
      p: {
        color: 'white'
      },
      span: {
        color: 'white'
      },
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
      // dataFetch()
      navigation.setOptions({
          headerRight: () => {
             
            
              return <>
              
              <MaterialCommunityIcons  onPress={wishHandle}  name={isItemFav ? 'heart' : 'heart-outline'} color='white'  size={28}/>
              <CartIcon onPress={handle} cart={cart}/>


              </>
          }
      })
      },[navigation, handle, wishHandle, dataFetch, ])

      useEffect(() => {
        dataFetch()
      }, [])


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
         <View style={[ styles.variationContainer,{backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
         }]}>
         <Text style={{color: 'white', fontSize: 16 , color: GlobalStyles.colors.gray100}}> Variations</Text>
          {isLoading ? <Text>Loading...</Text> :  
      <View style={{flexDirection: 'row', marginVertical: 15}}>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{justifyContent: 'flex-end', alignItems: 'stretch', marginRight: 15,}}>
      {product.attributes.map((att) => {
        return       <Text style={styles.attSize}>{att.name}</Text>
      })}
      </View>
      {variations.map(products => {
        return     <View  style={{width: 80 , justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{height: 60, width: 60}} source={{uri: products.image.src}}/>

       <View >  
       {products.attributes.map(att => {
          return         <Text style={styles.attSize}>{att.option} </Text>

        })}
       </View>
      
        </View>
})}
</ScrollView>
     
      </View>
      
      }
         </View>
        
    <View style={[styles.innerContainer, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
         }]}>
          <RenderHtml
      contentWidth={width}
      source={source}
      tagsStyles={tagsStyles}
         
    /> 
      </View>
        
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
      marginVertical: 15,
      marginHorizontal: 10,
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
        
      },
      variationContainer: {
        padding: 10,
        paddingVertical: 15,

      },
      attSize: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center'
      }

  
})
export default AnimeInfo