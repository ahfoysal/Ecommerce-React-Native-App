import { Pressable, StyleSheet, Text, View, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../util/styles";



function Grid ({title, imageUrl, price, onPress,category,salePrice, regularPrice}) {
  
    return (

        
        <View style={styles.itemCon} >  
        <Pressable android_ripple={{color: '#ccc'}}  style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
        >
        {/* {salePrice &&         <Text style={styles.whiteText}>
        Sale</Text>} */}
        <Image style={styles.image} source={{uri: imageUrl}}/>
        <View style={[styles.innerContainer]}>
        <View style={{flexDirection: 'row'}}>
        <Ionicons name='star' size={14} color={'orange'} />
        <Text style={{color: GlobalStyles.colors.gray100, fontSize: 13, paddingHorizontal: 4}}>0.0</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.whiteText}>{price}</Text>

        {salePrice &&         <Text style={styles.whiteText}>{regularPrice}</Text>}


        </View>
        </Pressable>
       
       
        </View>
        
    )

}
const styles = StyleSheet.create({
    itemCon: {
      
        borderRadius: 6,
        backgroundColor: '#212529',
      margin: 5,  
      color: 'white',
       flex: 1,
       height: 300,
       overflow: 'hidden',
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.25,
       shadowOffset: { width: 0, height: 2},
       maxWidth: 200,
       


      },
      title: {
        color: 'white',
        fontWeight: 600,
        fontSize: 14,
        
      },
      button: {
        flex: 1,

      },
      innerContainer: {

        paddingHorizontal: 10,
        paddingVertical: 10
    
      },
      buttonPressed: {
        opacity: 0.5
        
      },
      image: {
        width: '100%',
        height: 200,
        
      }
  });

export default Grid