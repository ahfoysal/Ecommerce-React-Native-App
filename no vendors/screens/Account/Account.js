import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useContextS } from "../../store/context/AllContext";
import { GlobalStyles } from "../../util/styles";
import LoginButtonContainer from "./LogicButtonContainer";
import MyOrder from "./MyOrdersConatiner";
import UserInfoContainer from "./UserInfoContainer";
import GuestContainer from "./GuestContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Account({navigation }) {
  const isFocused = useIsFocused();
  let {  isDark , isLoggedIn, setIsLoggedIn , userInfo, restoringCart} =  useContextS();
    const [isLoading, setLoading] = useState(true);
    const [orders, setOrders] = useState({});
    const [newUserInfo, setNewUserInfo] = useState(userInfo);
  

    
//     let shopLink = 'https://shop.abusayeeed.xyz/wp/'
// key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
let shopLink = 'https://shop.tazreemart.com/index.php/'
key='consumer_key=ck_99ddb89db91e4691a163af42f098a1b00c482041&consumer_secret=cs_5738b6a3295a0ba1fbf3852977eb03b50fa018c8'


const dataFetch = async () => {
const order = await (
    await fetch(
      shopLink+`wp-json/wc/v3/orders`+`?customer=${userInfo.id}&`+key+'&per_page=100',
      {
        headers: {
          'Origin': 'https://pewds-shop.vercel.app'
        }
      }

    )
  ).json();
  setOrders(order)
  setLoading(false)
};
const dataFetch2 = async () => {
  const data = await (
    await fetch(
      shopLink+`wp-json/wc/v3/customers/${userInfo.id}`+`?`+key,
      {
        headers: {
          'Origin': 'https://pewds-shop.vercel.app'
        }
      }
      // `${StoreLink}/customers-36/&per_page=100`
  
    )
  ).json();
  
  setNewUserInfo(data)
  
  };
useEffect(() => {
  
  if(isFocused & isLoggedIn) {
    dataFetch()
    console.log(userInfo.id)
    console.log('ok')
   
  }
  dataFetch2()
  
  }, [isFocused, isLoggedIn])
  
  function SignOutHandler() {
    AsyncStorage.removeItem('@MySuperStore:key');
    setIsLoggedIn(false)
    
  }
 

    
    return (
        <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
     
      {isLoggedIn ? <UserInfoContainer userInfo={newUserInfo}  orders={orders.length}/> : <LoginButtonContainer navigation={navigation} />}
         


      { isLoggedIn ? <>
      {isLoading ?   <GuestContainer  />  : <MyOrder navigation={navigation} orders={orders} /> }
        </>:   <GuestContainer navigation={navigation} />
      }
                
         
         {isLoggedIn && <View style={{ justifyContent: 'flex-end', flex: 1}}>
         <Button title='SIGN OUT' buttonStyle={{ marginHorizontal: 10, marginVertical: 20, borderRadius: 8, backgroundColor: GlobalStyles.colors.orange400}} 
         onPress={ SignOutHandler} />
         </View>
         }
      
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