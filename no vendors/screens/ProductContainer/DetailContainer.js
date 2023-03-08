import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { GlobalStyles } from "../../util/styles";


function Detail({name, price, isDark, sale_price, regular_price, total_sales}) {
return (
    <View style={[styles.innerContainer, {backgroundColor: isDark ? GlobalStyles.colors.darkTheme100 : GlobalStyles.colors.lightTheme
    }]}>
    
    <Text style={styles.title}>{name}</Text>
    <View style={{flexDirection : 'row'}}>
     <Text style={[styles.price, {fontSize: 18, paddingTop: 7, marginRight: 2}]}>৳</Text>
     <Text style={styles.price}>{price}</Text>
     {sale_price &&         <Text style={[styles.price , {fontSize: 15, paddingTop: 10, color: GlobalStyles.colors.pink200, marginLeft: 12,
     textDecorationStyle: 'solid', textDecorationLine: 'line-through'
     }]}>৳ {regular_price}</Text>}
     </View>
     <View style={{flexDirection: 'row', marginVertical: 10}}>
   <Ionicons name='star' size={16} color={GlobalStyles.colors.yellow200} />
   <Text style={{color: 'white', fontSize: 13, marginLeft: 10}}>0.00    ⋄    {total_sales} Sold</Text>


   </View>


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
          marginVertical: 10
  
        },
        attSize: {
          color: 'white',
          fontSize: 10,
          textAlign: 'center'
        },
})