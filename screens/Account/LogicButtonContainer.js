import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../util/styles";

function LoginButtonContainer({navigation}) {
    
    
    return (

        <View style={[styles.innerContainer, {backgroundColor:   GlobalStyles.colors.orange400, justifyContent: 'center'  }]}> 
            <Pressable onPress={() => navigation.navigate('Login')} style={{backgroundColor: GlobalStyles.colors.lightTheme, borderRadius: 8, marginVertical: 40}}>
        <Text  style={{paddingVertical: 20, paddingHorizontal: 20, color: GlobalStyles.colors.orange400, fontWeight: 'bold',
        fontSize: 15
         }}>LOGIN / SIGNUP</Text>
         </Pressable>
         </View>
    )
}
export default LoginButtonContainer

const styles = StyleSheet.create({
    
    innerContainer: {
        flexDirection: 'row',
        // marginVertical: 6,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        height: 150,
        // justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})