import { Text } from "react-native";

function Login({navigation}) {
    
    
    return (
        <Text onPress={() =>    navigation.navigate('SingleOrder', {
            orderID: '1572',
           
          })}>Login</Text>
    )
}
export default Login