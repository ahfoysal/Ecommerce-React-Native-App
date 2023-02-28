import { useEffect, useLayoutEffect, useState } from "react";
import {   StyleSheet, Text, View,  ScrollView, Alert } from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import ToastManager, { Toast } from 'toastify-react-native'; 

function AnimeInfo({route, navigation, addToCart, cart, isDark, allProducts}) {
  // const [scrollToIndex, setScrollToIndex] = useState(0);
  // const [ref, SetRef] =useState(null)

  const [isLoading, setLoading] = useState(true);
const [variations , setVariations] = useState([]);
const [selectedItem, setSelectedItem] = useState(null);
const [warning, setWarning] = useState(false);


const [currentItem, setCurrentItem] = useState(null);

  const wishListItems = useSelector((state) => state.wishListItems.ids)
  const dispatch =  useDispatch()
    const product = route.params.product
    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
     let key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
    
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
        // console.log(product)

        dataFetch()
// const result = allProducts.filter(word => word.id == product.related_ids[0]);
// console.log(result);
      }, [])


   function   variationHandle(id){
   
      // console.log(id, 'h')
     
      let clone = { ...product }
      clone.id = id.id
      // console.log('m', product.id, 'c', clone.id )
      const att = id.attributes.map((names) =>  names.option)
      // console.log(att)
      clone.name = `${product.name} ${att}`
      clone.price = id.price
      // console.log(clone.id, product.id)
      setCurrentItem(clone)
      setWarning(false)
      // addToCart(clone)
      // addToCart(product2)
      }
      const handleSubmit = async () => {
        Toast.success('Added To Cart');
      };
    

    function pressHandler(){ 
      // console.log(product.variations)
     
      if(product.variations.length < 1){
        handleSubmit()
       return  addToCart(product)
      }
      // console.log(id)
      if(!currentItem){
        setWarning(true)
        return Alert.alert('Select Variation')
      }else{
        addToCart(currentItem)
        handleSubmit()
      }
    
 
            }
            const page = Number(product.id/100)
    return (
      
         <SafeAreaView  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
         }]}>
          <ToastManager   animationStyle='rightInOut' positionValue={200} width={350} position='bottom' style={{ fontSize: 2 ,backgroundColor: 'black',color: 'white' , marginTop: 20}}/>
     
               
           <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
         <ImageContainer  Images={Images}/>
         <Detail  name={product.name} price={product.price} isDark={isDark}  sale_price={product.sale_price}
         regular_price={product.regular_price}
         total_sales={product.total_sales}
         />
        
        {variations.length > 0 && <>
          <VariationContainer  setCurrentItem={setCurrentItem} warning={warning} variationHandle={variationHandle} selectedItem={selectedItem} setSelectedItem={setSelectedItem} isLoading={isLoading} isDark={isDark} product={product} variations={variations}/>
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
                  onPress={() => {
                    navigation.navigate('Info', {
  animeId: item.id,
  animeTitle: item.name,
  product: item,
})}}               
                   />
          })}
         </View>

  </View>
                </ScrollView>   
            
      <AddToCartConatiner  pressHandler={pressHandler}/>  
         </SafeAreaView>
       
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