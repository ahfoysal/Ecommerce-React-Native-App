import { Text } from "react-native";
import { useContextS } from "../../store/context/AllContext";

function Login({navigation}) {
    let {  isDark } =  useContextS();
    
    return (
        <Text>{isDark ?  'hi' : 'hello'}</Text>
    )
}
export default Login