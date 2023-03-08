

import { Text, TextInput, View } from "react-native";



const Input = ({label, textInputConfig}) => (
    <View>
    <Text style={{color: 'white'}}>{label}</Text>
    <TextInput {...textInputConfig} />

     
    </View>
  );


  export default Input