import { Pressable, Text } from "react-native"
import { MaterialCommunityIcons  } from '@expo/vector-icons'

function Icon({onPress, cart}) {

   let Total = cart.map((qun) => qun.quantity)
   let sum = 0; 

   Total.forEach(item => {
       sum += item;
     });

    
    return (
        <Pressable onPress={onPress} style={{flexDirection: 'row'}} >
            <MaterialCommunityIcons    name='cart-minus' color='white'  size={28}/>
           {sum != 0 && <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold', paddingTop: 5}}>{sum}</Text>}

            
        </Pressable>
    )
}

export default Icon