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
        {salePrice &&   Platform.OS === 'android' &&      <Text  style={[
          styles.box,
          {
            transform: [{rotateX: '45deg'}, {rotateZ: '45deg'}],          },styles.tag
        ]}>
        Sale</Text>}
       
     </View>

       
        <View style={[styles.innerContainer]}>
        <Text style={styles.title}>{title}</Text>

        <View style={{flexDirection: 'row'}}>
        <Ionicons name='star' size={12} color={GlobalStyles.colors.yellow200} />
        <Text style={{color: GlobalStyles.colors.gray100, fontSize: 11, marginLeft: 2}}>0.00</Text>


        </View>

          <View style={{flexDirection : 'row'}}>
          <Text style={[styles.price, {fontSize: 12, paddingTop: 1}]}>৳</Text>

          <Text style={styles.price}>{price}</Text>

          {salePrice &&         <Text style={[styles.price , {fontSize: 11, paddingTop: 2, color: GlobalStyles.colors.pink200, marginLeft: 4,
          textDecorationStyle: 'solid', textDecorationLine: 'line-through'
          }]}>৳{regularPrice}</Text>}
          </View>
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
       maxWidth: 180,
       minWidth: 160
       


      },
      title: {
        color: 'white',
        fontWeight: '400',
        fontSize: 13,
        marginVertical: 12
        
      },
      innerContainer: {

        marginHorizontal: 10,
        // marginVertical: 10
    
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
          
          color: 'white',
          fontWeight: 'bold',
          fontSize: 14,
          
          
          textAlign: 'center',
         paddingHorizontal: 30,
         paddingVertical: 5,
          position: 'absolute',
        
          right: -20,
          top: 0
      },
      price: {
        color: GlobalStyles.colors.text500,
        fontWeight: '600',
        fontSize: 14,
        marginVertical: 10
        
      }
  });

export default Grid