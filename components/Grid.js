import { Pressable, StyleSheet, Text, View, Platform, Image } from 'react-native';


function Grid ({title, imageUrl, price, onPress,category,salePrice, regularPrice}) {
  
    return (

        
        <View style={styles.itemCon} >  
        <Pressable android_ripple={{color: '#ccc'}}  style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
        >
        <View style={[styles.innerContainer]}>
        {/* {salePrice &&         <Text style={styles.whiteText}>
        Sale</Text>} */}
        <Image style={styles.image} source={{uri: imageUrl}}/>
        <Text style={styles.whiteText}>{category}</Text>

        <Text style={styles.whiteText}>{title}</Text>
        <Text style={styles.whiteText}>{price}</Text>

        {salePrice &&         <Text style={styles.whiteText}>{regularPrice}</Text>}


        </View>
        </Pressable>
       
       
        </View>
        
    )

}
const styles = StyleSheet.create({
    itemCon: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 6,
        marginRight:  6,
        borderRadius: 8,
        backgroundColor: '#212529',
        
        color: 'white',
       flex: 1,
       height: 300,
       overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
       elevation: 4,
       shadowColor: 'black',
       shadowOpacity: 0.25,
       shadowOffset: { width: 0, height: 2}
       


      },
      whiteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        
      },
      button: {
        flex: 1,

      },
      innerContainer: {
        flex: 1,
        borderRadius: 8,

        padding: 6,
        justifyContent: 'center',
        

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