import { useEffect, useLayoutEffect, useState } from "react";
import {   StyleSheet, Text, View,  ScrollView } from "react-native";
import CartIcon from "../../components/CartICon";
import ImageContainer from "../../components/Test/Test";
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
import { addWishList, removeWishList } from "../../store/redux/wishList";
import { GlobalStyles } from "../../util/styles";
import Grid from "../../components/Grid";
import Detail from "./DetailContainer";
import VariationContainer from './VariationContainer'
import DescriptionContainer from './DescriptionContainer'
import AddToCartConatiner from './AddToCartContainer'

function AnimeInfo({route, navigation, addToCart, cart, isDark, allProducts}) {

  const [isLoading, setLoading] = useState(true);
const [variations , setVariations] = useState([]);
const [isItemSelected, setIsItemSelected] = useState(false);


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
      setVariations(data)
      setLoading(false)
      };
    const Images = product.images.map((img => img))
    const originalString = product.description;
    const originalString2 = product.short_description;

const strippedString = originalString.replace(/(<([^>]+)>)/gi, "")
const strippedString2 = originalString2.replace(/(<([^>]+)>)/gi, "")
    
    const isItemFav = wishListItems.includes(product)
    function handle() {
      navigation.navigate('Cart')
  }

  function wishHandle() {
    if(isItemFav){
      dispatch(removeWishList({id: product}))
    }else {
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
      },[navigation, handle, wishHandle, dataFetch, ])

      useEffect(() => {
        dataFetch()
// const result = allProducts.filter(word => word.id == product.related_ids[0]);
// console.log(result);
      }, [])

    function pressHandler(){ 
      if(variations.length > 0){
        return console.log('Select Variation')
      }
      addToCart(product)
 
            }
            const page = Number(product.id/100)
    return (
      
         <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
         }]}>
     
               
           <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
         <ImageContainer  Images={Images}/>
         <Detail  name={product.name} price={product.price} isDark={isDark}  sale_price={product.sale_price}
         regular_price={product.regular_price}
         total_sales={product.total_sales}
         />
        
        {variations.length > 0 && <>
          <VariationContainer isLoading={isLoading} isDark={isDark} product={product} variations={variations}/>
        </>}
        
   <DescriptionContainer isDark={isDark} strippedString={strippedString} strippedString2={strippedString2}/>
     
  <View style={styles.variationContainer}>
  <Text style={styles.des}>You might also like</Text>
         <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
         {allProducts.slice((page-1) * 4, (page-1) * 4 + 4).map(item => {
            return  <Grid   key={item.id}
                   title={item.name} 
                   price={item.price}           
                   imageUrl={item.images[0].src} 
                   category={item.categories.map(test =>test.name)}
                    salePrice ={item.sale_price}
                    regularPrice={item.regular_price}
                  onPress={() => navigation.navigate('Info', {
  animeId: item.id,
  animeTitle: item.name,
  product: item,
})}
                  
                   />
          })}
         </View>

  </View>
                </ScrollView>   
            
      <AddToCartConatiner  pressHandler={pressHandler}/>  
         </View>
       
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
      
    },
      des: {
        fontSize: 16 , color: GlobalStyles.colors.gray100,
        textAlign: 'center',
        paddingBottom: 5,
        marginBottom: 8
      }


  
})
export default AnimeInfo