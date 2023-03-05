import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../util/styles";

function UserInfoContainer({userInfo, orders}) {
    const wishListItems = useSelector(state => state.wishListItems.ids )

    console.log(userInfo)
    return (
        

        <View style={[styles.innerContainer, {backgroundColor:   GlobalStyles.colors.orange400 }]}> 
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <Image style={{height: 40, width: 40 , marginHorizontal: 20, borderRadius: 25}} source={{uri: userInfo?.avatar_url}}/>
                    <Text style={{fontSize: 16, color: GlobalStyles.colors.lightTheme, fontWeight: 'bold',  paddingVertical: 10}}>{userInfo?.username}</Text>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-around', marginTop: 20}}>
           <View>
           <Text style={{fontSize: 16, color: GlobalStyles.colors.lightTheme, fontWeight: 'bold', textAlign: 'center'}}>{wishListItems.length}</Text>

        <Text style={{fontSize: 14, color: GlobalStyles.colors.lightTheme}}>My Wishlist</Text>
 
           </View>
           <View>
           <Text style={{fontSize: 16, color: GlobalStyles.colors.lightTheme, fontWeight: 'bold' , textAlign: 'center'}}>{orders}</Text>

        <Text style={{fontSize: 14, color: GlobalStyles.colors.lightTheme}}>My Orders</Text>
 
           </View>
            </View>
            
         </View>
    )
}
export default UserInfoContainer

const styles = StyleSheet.create({
    
    innerContainer: {
        // flexDirection: 'row',
        // marginVertical: 6,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 150,

        // justifyContent: 'space-evenly',
        // alignItems: 'center'
    }
})