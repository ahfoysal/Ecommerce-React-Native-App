import { Pressable, StyleSheet, Text, View, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../util/styles";



function Grid ({title, imageUrl, price, onPress,category,salePrice, regularPrice}) {
  
    return (

        
        <View style={styles.itemCon} >  
        <Pressable android_ripple={{color: '#ccc'}}  style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
        >
     
 <View style={{position: 'relative'}}>
 <Image style={styles.image} source={{uri: imageUrl}}/>
        {salePrice &&         <Text  style={[
          styles.box,
          {
            transform: [{rotateX: '45deg'}, {rotateZ: '45deg'}],          },styles.tag
        ]}>
        Sale</Text>}
       
     </View>
     <Text style={styles.title}>{title}</Text>

       
        <View style={[styles.innerContainer]}>
    
        <View style={{flexDirection: 'row'}}>
        <Ionicons name='star' size={14} color={GlobalStyles.colors.yellow200} />


        </View>

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
    
       overflow: 'hidden',
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.25,
       shadowOffset: { width: 0, height: 2},
       maxWidth: 200,
       


      },
      title: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 13
        
      },
      innerContainer: {

        marginHorizontal: 10,
        marginVertical: 10
    
      },
      buttonPressed: {
        opacity: 0.5      
      },
      image: {
        width: '100%',
        height: 200,   
      },
      tag: {
          backgroundColor: '#3F0686',
          overflow: 'hidden',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 14,
          height: 20,
          width: 45,
          textAlign: 'center',
         
          marginRight: 5,
          position: 'absolute',
          right: 0,
          top: 0
      }
  });

export default Grid