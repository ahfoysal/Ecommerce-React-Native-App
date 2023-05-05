import { useEffect, useLayoutEffect, useState } from "react";
import {   StyleSheet, Text, View,  ScrollView, Alert } from "react-native";
import CartIcon from "../../components/CartICon";
import ImageContainer from "../../components/Test/Test";
import { MaterialCommunityIcons  } from '@expo/vector-icons'
import { useDispatch, useSelector } from "react-redux";
import { addWishList, removeWishList } from "../../store/redux/wishList";
import { GlobalStyles } from "../../util/styles";

import Detail from "./DetailContainer";
import VariationContainer from './VariationContainer'
import DescriptionContainer from './DescriptionContainer'
import AddToCartConatiner from './AddToCartContainer'
import { SafeAreaView } from "react-native-safe-area-context";
import { useContextS } from "../../store/context/AllContext";
 

function AnimeInfo({route, navigation}) {

  let {   addToCart, cart, isDark, allProducts } =  useContextS();

  const [isLoading, setLoading] = useState(true);
const [variations , setVariations] = useState([]);
const [selectedItem, setSelectedItem] = useState(null);
const [warning, setWarning] = useState(false);


const [currentItem, setCurrentItem] = useState(null);

  const wishListItems = useSelector((state) => state.wishListItems.ids)
  const dispatch =  useDispatch()
    const product = route.params.product
    // let shopLink = 'https://shop.abusayeeed.xyz/wp/'
    //  let key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
    let shopLink = 'https://shop.tazreemart.com/index.php/'
    key='consumer_key=ck_99ddb89db91e4691a163af42f098a1b00c482041&consumer_secret=cs_5738b6a3295a0ba1fbf3852977eb03b50fa018c8'
   
    const dataFetch = async () => {
      const data = await (
        await fetch(
          shopLink+`wp-json/wc/v3/products/`+product.id+`/variations?`+key+'&per_page=100'
          // `${StoreLink}/products-${product.id}-variations/&per_page=100`

        )
      ).json();      
      // console.log(data)
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
      },[navigation, handle, wishHandle, dataFetch,  ])

      useEffect(() => {
      
        
       
        dataFetch()

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
      clone.parent_id = product.id
      // console.log(clone.id, product.id)
      setCurrentItem(clone)
      setWarning(false)
      // addToCart(clone)
      // addToCart(product2)
      }
      const handleSubmit = async () => {
        Alert.alert('Success', 'Item added to cart.', [
          {text: 'Continue Shopping', onPress: () => console.log('Continue Shopping')},
          {
            text: 'View Cart',
            onPress: () => navigation.navigate('Cart'),
            style: 'cancel',
          },
       
        ]);
      };
    

    function pressHandler(){ 
      // console.log(product.variations)
     
      if(product.variations.length < 1 || product.parent_id != 0){
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
           
            
    return (
      
         <SafeAreaView  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
         }]}>
     
               
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
       

   </View>
                </ScrollView>   
                <>
                {variations.length > 0   &&    <AddToCartConatiner  pressHandler={pressHandler}/> } 
                </>
              {product.variations.length === 0  && <View>
                  <AddToCartConatiner  pressHandler={pressHandler}/> 
                </View> }
                { product.parent_id != 0  && <View>
                  <AddToCartConatiner  pressHandler={pressHandler}/> 
                </View> }
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