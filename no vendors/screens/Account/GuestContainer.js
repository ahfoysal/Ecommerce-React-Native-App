import {  Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../util/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 




function GuestContainer({navigation}) {

  

    
    
    return (

        <View style={[styles.innerContainer, {backgroundColor:   GlobalStyles.colors.darkTheme100 }]}> 
  <Text style={{fontSize: 17, color: GlobalStyles.colors.lightTheme, fontWeight: 'bold',  margin: 20}}>My Orders</Text>

  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

  <Pressable style={styles.inner}  onPress={() =>    navigation.navigate('Login')} >
     
     <Ionicons name="ios-receipt-outline" size={30} color={GlobalStyles.colors.gray100}/>
     
     <Text style={styles.text}>All Orders</Text>

     </Pressable>
     
  <Pressable  style={styles.inner} onPress={() =>    navigation.navigate('Login')}>

        <Ionicons name="card-outline" size={30} color={GlobalStyles.colors.gray100} />
        <Text style={styles.text}>To Pay  </Text>
        </Pressable>

        <Pressable style={styles.inner} onPress={() =>   navigation.navigate('Login')}>
      
            <MaterialCommunityIcons name="truck-fast-outline" size={30} color={GlobalStyles.colors.gray100} />
            <Text style={styles.text}>To Received</Text>
         </Pressable>

         <Pressable style={styles.inner} onPress={() => navigation.navigate('Login')}>
       
         <MaterialCommunityIcons name="archive-remove-outline" size={30} color={GlobalStyles.colors.gray100}/>
     <Text style={styles.text}>Cancelled</Text>
     </Pressable>

     

      </View>

         </View>
    )
}
export default GuestContainer

const styles = StyleSheet.create({
    
    innerContainer: {
        // flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: GlobalStyles.colors.darkTheme100, 
        // height: 200,
       
        borderRadius: 8,

        // justifyContent: 'space-evenly',
        // alignItems: 'center'
    }, 
    text: {fontSize: 14, color: GlobalStyles.colors.lightTheme, marginVertical: 8},
    inner: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    }
})