import {   FlatList, StyleSheet } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { GlobalStyles } from '../../util/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItemContainer from '../cartContainer/CartItemContainer';
import Summray from './Summray';
import ButtonContainer from './ButtonContainer';
import DeliveryInfo from './DeliveryInformation';
import { useState } from "react";
    



function Checkout({route, cart, navigation, isDark, setCart}) {

    const [name, setName] = useState('Customer Name');
    const [email, setEmail] = useState('CustomerEmail@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('0123456789');
    const [address, setAddress] = useState('Customer Address');





    const total = cart.reduce((total, prd) => total + prd.price * prd.quantity , 0)
    const createOrder = () => {
        console.log('prrssed')
       
        const cartItems = cart.map((cart) => `{'product_id': ${cart.id},'quantity': ${cart.quantity}}` );
        const StringCart= JSON.stringify(cartItems);  
        const newItms = StringCart.replace (/"/g,'');
        const newCart = newItms.replace (/'/g,'"');
        const cID = `"customer_id":"36"  ,`
        
        key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'

        

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

 const body1 = `{"payment_method":"cod" , ${cID} "payment_method_title":"Cash On Delivery" , "billing":{"first_name":"${name}","country": "BD","address_1":"${address}","phone":"${phoneNumber}","email":"${email}"},"line_items":`
const body2= `${newCart}}`
    const body3 = body1.concat(' ', body2);


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body1.concat(' ', body2),
        redirect: 'follow'
      };
      fetch(`https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/orders?`+key, requestOptions)
        .then(response => response.json())
        .then(result => {
          const rslt = result;
          console.log(rslt)
          
          WebBrowser.openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${rslt.total}/${rslt.id}`)
          
          navigation.navigate('SingleOrder', {
            orderID: rslt.id})
          setCart([])
         
          })
        .catch(error => {
          const rslt = error;
          console.log('error', rslt)
         
        }); 
    console.log(body3)
    }   
    function renderPopularItem(itemData) {
        return (
            <CartItemContainer image={itemData.item.images[0].src}  price={itemData.item.price} regular_price={itemData.item.regular_price}
            sale_price={itemData.item.sale_price}
            name={itemData.item.name}  quantity={itemData.item.quantity} item={itemData.item}/>
        )
    }
    function summary(itemData) {
        return (
            <Summray total={total}/>
        )
    }
    function Delivery(itemData) {
        return (
            <DeliveryInfo  name={name} setName={setName} email={email} setEmail={setEmail}  phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}  address={address} setAddress={setAddress} />
        )
    }



    return (
      
        <SafeAreaView  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>


        {cart.length > 0 && <>
                    <FlatList
            data={cart}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            ListFooterComponent={summary}
            ListHeaderComponent={Delivery}
           
          />
            <ButtonContainer total={total} createOrder={createOrder} />
  
                 </>          
                 }

                
         </SafeAreaView>
       
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
        paddingTop: 20
      
    }
})
export default Checkout