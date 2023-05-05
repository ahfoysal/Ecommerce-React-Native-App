

import { openBrowserAsync } from "expo-web-browser";
import { useEffect, useState } from "react";


import { StyleSheet, Pressable, View, Text , FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useContextS } from "../store/context/AllContext";
import { GlobalStyles } from "../util/styles"
import CartItemContainer from "./cartContainer/CartItemContainer";
import ButtonContainer from "./checkoutContainer/ButtonContainer";
import Summray from "./checkoutContainer/Summray";






function SingleOrder({route, navigation}) {
    let {  isDark } =  useContextS();
    const [isLoading, setLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState({});

    const orderID = route.params.orderID

    let StoreLink = `https://sslcommerz-gateway-yjsc.vercel.app/shop`
//     let shopLink = 'https://shop.abusayeeed.xyz/wp/'
// key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
let shopLink = 'https://shop.tazreemart.com/index.php/'
key='consumer_key=ck_99ddb89db91e4691a163af42f098a1b00c482041&consumer_secret=cs_5738b6a3295a0ba1fbf3852977eb03b50fa018c8'

const dataFetch = async () => {
const data = await (
  await fetch(
    // shopLink+`wp-json/wc/v3/orders/`+orderID+`?`+key+'&per_page=100'
    `${StoreLink}/orders-${orderID}/&per_page=100`,
    {
        headers: {
          'Origin': 'https://pewds-shop.vercel.app'
        }
      }

  )
).json();

console.log('data')
setOrderInfo(data)
setLoading(false)

};
useEffect(() => {
        
    dataFetch()
  
  }, [])
  function renderPopularItem(itemData) {
    return (
        <CartItemContainer image={itemData.item.image.src}  price={itemData.item.price} 
      navigation={navigation}
        name={itemData.item.name}  quantity={itemData.item.quantity} />
    )
}
function Heders(itemData) {
    return (
       <>
        <View style={[styles.innerContainer, {backgroundColor:  orderInfo.status  ==  'completed'  ? 'green' : GlobalStyles.colors.orange400  }]}> 
            
            <Text  style={{   paddingVertical: 20, color: 'white', textAlign: 'center', fontWeight: 'bold',
            fontSize: 16
             }}>{orderInfo.needs_payment ?  'Payment Pending' : orderInfo.status}</Text>
             </View>
 
 
             <View style={[styles.innerContainer]}> 
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.gray100, fontSize: 14  }}> Ship & bill to</Text>
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.lightTheme, fontSize: 14  }}> {orderInfo?.billing?.first_name}</Text>
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.lightTheme, fontSize: 14  }}> {orderInfo?.billing?.phone}</Text>
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.lightTheme, fontSize: 14  }}> {orderInfo?.billing?.email}</Text>
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.gray100, fontSize: 12  }}> {orderInfo?.billing?.address_1}</Text>
 
             </View>
 
             <View style={[styles.innerContainer]}> 
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.orange400, fontSize: 17  }}> Order #{orderInfo.id}</Text>
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.lightTheme, fontSize: 14  }}> Placed on {new Date(orderInfo.date_created).toLocaleString()}</Text>

             </View>
       </>
    )
}
function Footers(itemData) {
    return (
       <>
         <Summray total={orderInfo.total} />
        
       </>
    )
}

    return (
        <SafeAreaView  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
            {isLoading ? <Text>Loading...</Text> : <>   
           
            <FlatList
            data={orderInfo.line_items}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            ListFooterComponent={Footers}
            ListHeaderComponent={Heders}
           
          />
           
              
           {orderInfo.needs_payment && <View style={{  flexDirection: 'row' , margin: 10, justifyContent: 'flex-end'}}> 
            <Pressable   style={{borderColor: GlobalStyles.colors.orange400 ,borderWidth: 1 , width: 140, borderRadius: 8, marginHorizontal: 10}} >
    <Text  style={{   padding: 8,
    color: 'white',
textAlign: 'center',
        fontWeight: 'bold'
}}>Cancel</Text>
 </Pressable>
 <Pressable onPress={() => openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${orderInfo.total}/${orderInfo.id}`)}  style={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8}} >
    <Text  style={{   padding: 8,
    color: 'white',
textAlign: 'center',
        fontWeight: 'bold'
}}>Pay Now</Text>
 </Pressable>
           </View>}
           
           
    </>
     }
        </SafeAreaView>
    )
}
export default SingleOrder

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        paddingTop: 20
      
    },
    innerContainer: {
        margin: 10,
        borderRadius: 8,
        padding: 10,
        backgroundColor: GlobalStyles.colors.darkTheme100,       
    }
})