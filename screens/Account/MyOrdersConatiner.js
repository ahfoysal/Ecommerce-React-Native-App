import {  Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../util/styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 




function MyOrder({orders, navigation}) {

  
       const ToPay = orders?.map((all) => {
            return all?.needs_payment })?.filter(word => word == true)

    const ToReceive = orders?.map((all) => {
                return all?.status })?.filter(word => word == 'processing')

      const Cancelled = orders?.map((all) => {
                    return all?.status })?.filter(word => word == 'cancelled')

    
    
    return (

        <View style={[styles.innerContainer, {backgroundColor:   GlobalStyles.colors.darkTheme100 }]}> 
  <Text style={{fontSize: 17, color: GlobalStyles.colors.lightTheme, fontWeight: 'bold',  margin: 20}}>My Orders</Text>

  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

  <Pressable style={styles.inner}  onPress={() =>    navigation.navigate('OrderList', {itemId: 0, orders: orders })} >
     
     <Ionicons name="ios-receipt-outline" size={30} color={GlobalStyles.colors.gray100}/>
     { orders?.length > 0 && <View style={{ position: 'absolute', top: -4, left: 43,backgroundColor: GlobalStyles.colors.orange400, padding: 2,paddingRight: 5 , borderRadius: 25}}>
       <Text > {orders?.length}
       </Text>
       </View>}
     <Text style={styles.text}>All Orders</Text>

     </Pressable>
     
  <Pressable  style={styles.inner} onPress={() =>    navigation.navigate('OrderList', {itemId: 1 , orders: orders})}>
{ ToPay?.length > 0 && <View style={{ position: 'absolute', top: -4, left: 35,backgroundColor: GlobalStyles.colors.orange400, padding: 2,paddingRight: 5 , borderRadius: 25}}>
       <Text > {ToPay?.length}
       </Text>
       </View>}
        <Ionicons name="card-outline" size={30} color={GlobalStyles.colors.gray100} />
        <Text style={styles.text}>To Pay  </Text>
        </Pressable>

        <Pressable style={styles.inner} onPress={() =>    navigation.navigate('OrderList', {itemId: 2, orders: orders })}>
        { ToReceive?.length > 0 && <View style={{ position: 'absolute', top: -4, left: 50,backgroundColor: GlobalStyles.colors.orange400, padding: 2,paddingRight: 5 , borderRadius: 25}}>
       <Text > {ToReceive?.length}
       </Text>
       </View>}
            <MaterialCommunityIcons name="truck-fast-outline" size={30} color={GlobalStyles.colors.gray100} />
            <Text style={styles.text}>To Received</Text>
         </Pressable>

         <Pressable style={styles.inner} onPress={() =>    navigation.navigate('OrderList', {itemId: 3 , orders: orders})}>
         { Cancelled?.length > 0 && <View style={{ position: 'absolute', top: -4, left: 43,backgroundColor: GlobalStyles.colors.orange400, padding: 2,paddingRight: 5 , borderRadius: 25}}>
       <Text > {Cancelled?.length}
       </Text>
       </View>}
         <MaterialCommunityIcons name="archive-remove-outline" size={30} color={GlobalStyles.colors.gray100}/>
     <Text style={styles.text}>Cancelled</Text>
     </Pressable>

     

      </View>

         </View>
    )
}
export default MyOrder

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