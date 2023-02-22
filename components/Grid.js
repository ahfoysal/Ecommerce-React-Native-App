import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';


function Grid ({title, image, color, onPress,}) {
  
    return (

        
        <View style={styles.itemCon} >  
        <Pressable android_ripple={{color: '#ccc'}}  style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}
        onPress={onPress}
        >
        <View style={[styles.innerContainer, {backgroundColor: color}]}>
        <Text style={styles.whiteText}>{title}</Text>
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
       height: 200,
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
        alignItems: 'center',

      },
      buttonPressed: {
        opacity: 0.5
        
      }
  });

export default Grid