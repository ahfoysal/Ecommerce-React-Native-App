import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContextS } from "../../store/context/AllContext";
import { GlobalStyles } from "../../util/styles";
import LoginButtonContainer from "./LogicButtonContainer";
import MyOrder from "./MyOrdersConatiner";
import UserInfoContainer from "./UserInfoContainer";

function Account({navigation }) {
  const isFocused = useIsFocused();
  let {  isDark , isLoggedIn} =  useContextS();
    const [isLoading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [orders, setOrders] = useState({});

    
    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
const dataFetch = async () => {
const data = await (
  await fetch(
    shopLink+`wp-json/wc/v3/customers/36`+`?`+key
  )
).json();

console.log('data')
setUserInfo(data)


const order = await (
    await fetch(
      shopLink+`wp-json/wc/v3/orders`+`?customer=36&`+key+'&per_page=100'
    )
  ).json();
  console.log(order.length)
  setOrders(order)
  setLoading(false)

};
useEffect(() => {
        
  if(isFocused) {
    dataFetch()
    console.log('refresh')
  }
    dataFetch()
  
  }, [isFocused, dataFetch])
    
    return (
        <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
      {isLoading ? <></> : <>
      {isLoggedIn ? <UserInfoContainer userInfo={userInfo}  orders={orders.length}/> : <LoginButtonContainer navigation={navigation} />}
          <MyOrder navigation={navigation} orders={orders} />
      </>}
          </View>
    )
}
export default Account

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // marginTop: 20
      
    },
    innerContainer: {
        flexDirection: 'row',
        marginVertical: 6,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 125,
        // justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})