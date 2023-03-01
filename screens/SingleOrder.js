

import { useEffect, useState } from "react";


import { StyleSheet, Pressable, View, Text , FlatList } from "react-native"
import { GlobalStyles } from "../util/styles"
import CartItemContainer from "./cartContainer/CartItemContainer";
import ButtonContainer from "./checkoutContainer/ButtonContainer";
import Summray from "./checkoutContainer/Summray";






function SingleOrder({route, navigation, isDark}) {
    const [isLoading, setLoading] = useState(true);
    const [orderInfo, setOrderInfo] = useState({});
    const [date, setDate] = useState('');

    const orderID = route.params.orderID

    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
const dataFetch = async () => {
const data = await (
  await fetch(
    shopLink+`wp-json/wc/v3/orders/`+orderID+`?`+key+'&per_page=100'
  )
).json();

console.log('data')
setOrderInfo(data)
setLoading(false)
var date = new Date(data.date_created);
setDate(date.toLocaleString())
};
useEffect(() => {
        
    dataFetch()
  
  }, [])
  function renderPopularItem(itemData) {
    return (
        <CartItemContainer image={itemData.item.image.src}  price={itemData.item.price} 
      
        name={itemData.item.name}  quantity={itemData.item.quantity} item={itemData.item}/>
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
            <Text  style={{ paddingVertical: 8,  color: GlobalStyles.colors.lightTheme, fontSize: 14  }}> Placed on {date}</Text>
       
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
        <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
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
            <Pressable   style={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8, marginHorizontal: 10}} >
    <Text  style={{   padding: 8,
    color: 'white',
textAlign: 'center',
        fontWeight: 'bold'
}}>Cancel</Text>
 </Pressable>
 <Pressable   style={{backgroundColor: GlobalStyles.colors.orange400 , width: 140, borderRadius: 8}} >
    <Text  style={{   padding: 8,
    color: 'white',
textAlign: 'center',
        fontWeight: 'bold'
}}>Pay Now</Text>
 </Pressable>
           </View>}
           
           
    </>
     }
        </View>
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