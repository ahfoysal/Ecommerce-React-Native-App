import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../util/styles";
import OrdersItemContainer from './OrdersItemContainer';
import { openBrowserAsync } from 'expo-web-browser';



function renderOrderItem(itemData) {

    return (
      <OrdersItemContainer image={itemData.item.image.src}  price={itemData.item.price} 
      
      name={itemData.item.name}  quantity={itemData.item.quantity} item={itemData.item}/>
    
    )
}

export default function RenderPopularItem({itemData, navigation}) {

    const items = itemData.item
    // console.log(items)
   
    return (
        // <CartItemContainer image={pro.item.image.src}  price={pro.item.price} 
      
        // name={pro.item.name}  quantity={pro.item.quantity} item={pro.item}/>
     <Pressable style={styles.innerContainer} onPress={() =>navigation.navigate('SingleOrder', {orderID: items.id})}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginHorizontal: 10}}>
      <View>
      <Text style={{color: GlobalStyles.colors.error50}}> Order  #{items.id} </Text>
        <Text style={{color: GlobalStyles.colors.gray100}}> Placed on {new Date(items.date_created).toLocaleString()}</Text>
       </View>
       <Text style={{color: GlobalStyles.colors.pink200, fontWeight: 'bold'}}> {items.status}</Text>
      </View>
        <FlatList
            data={items.line_items}
            keyExtractor={(item, index) => index}
            renderItem={renderOrderItem}
            horizontal
         
           
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 20, marginBottom: 5 }}>
            <Text style={{color: 'white'}}>Total: {items.total}</Text>
           {items.needs_payment && <Pressable  onPress={() => console.log('cancel')}  style={{borderColor: GlobalStyles.colors.orange400 ,borderWidth: 1, width: 100, borderRadius: 8, marginLeft: 20}} >
          <Text  style={{   padding: 4,         color: 'white'  , textAlign: 'center',     }}>Cancel</Text>
            </Pressable>}
            {items.needs_payment && <Pressable  onPress={() => openBrowserAsync(`https://sslcommerz-gateway.vercel.app/ssl-request/${items.total}/${items.id}`)}  style={{backgroundColor: GlobalStyles.colors.orange400 , width: 100, borderRadius: 8, marginLeft: 20}} >
          <Text  style={{   padding: 4,         color: 'white'  , textAlign: 'center',      }}>Pay Now</Text>
            </Pressable>}

          </View>
      </Pressable>
    )
}
const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    tabBar: {
      backgroundColor: GlobalStyles.colors.darkTheme,
    },
    tabStyle: {
      width: 'auto',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    labelStyle: {
      fontSize: 12,
      
      margin: 2,
      fontWeight: 'bold',
      color: GlobalStyles.colors.orange400,
    },
    indicator: {
      backgroundColor: GlobalStyles.colors.orange400,
      
    },
    container : {
      flex: 1, 
    
  },
  innerContainer: {
      margin: 6,
      backgroundColor: GlobalStyles.colors.darkTheme100, 
      
  }
  });

