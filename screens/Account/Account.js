import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../util/styles";
import LoginButtonContainer from "./LogicButtonContainer";
import UserInfoContainer from "./UserInfoContainer";

function Account({navigation, isDark, isLoggedIn}) {
    const [isLoading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    
    let shopLink = 'https://shop.abusayeeed.xyz/wp/'
key='consumer_key=ck_7d700d7c05bea9f024076feb890944ad286703f2&consumer_secret=cs_59a8c6db54711f8a9fc314b95e0ad782a946c191'
const dataFetch = async () => {
const data = await (
  await fetch(
    shopLink+`wp-json/wc/v3/customers/30`+`?`+key+'&per_page=100'
  )
).json();

console.log('data')
setUserInfo(data)
setLoading(false)

};
useEffect(() => {
        
    dataFetch()
  
  }, [])
    
    return (
        <View  style={[styles.container, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme : GlobalStyles.colors.lightTheme
        }]}>
       {isLoggedIn ? <UserInfoContainer userInfo={userInfo} /> : <LoginButtonContainer />}


          </View>
    )
}
export default Account

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        // paddingTop: 20
      
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