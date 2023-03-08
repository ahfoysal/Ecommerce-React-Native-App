import {  StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles";


function Detail({strippedString2, strippedString, isDark }) {
return (
    <View style={[styles.variationContainer, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
    }]}>
<Text style={styles.description}>Description</Text>
{strippedString && <Text style={{color: 'white'}}>{strippedString} </Text>}
{strippedString2 && <Text style={{color: 'white'}}>{strippedString2} </Text>}

 </View>
 
)
}

export default Detail

const styles = StyleSheet.create({
    innerContainer: {
        marginVertical: 15,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 8
      },
      title: {
        color: 'white',
        fontSize: 18,
        marginVertical: 5,
      },
        price: {
          color: GlobalStyles.colors.text500,
          fontWeight: '600',
          fontSize: 24,
          marginVertical: 10
          
        },
        variationContainer: {
      padding: 15,
      paddingVertical: 15,
      marginVertical: 10,
      borderRadius: 8

    },
    attSize: {
      color: 'white',
      fontSize: 10,
      textAlign: 'center'
    },
    description: {
      fontSize: 16 , color: GlobalStyles.colors.gray100,
      borderBottomWidth: .5, 
      borderBottomColor: '#C8C8C8',
      paddingBottom: 5,
      marginBottom: 8
    },
    des: {
      fontSize: 16 , color: GlobalStyles.colors.gray100,
      textAlign: 'center',
      paddingBottom: 5,
      marginBottom: 8
    }



        
})