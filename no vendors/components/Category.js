
import {  View, Text, FlatList, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { GlobalStyles } from "../util/styles";




function Ca({pro, onPress, setActive,active}) {


  const ctgName =  pro.map(product => {
    return product.categories.map(categories => ( categories.name))})
    const merged = [].concat.apply([], ctgName);
    let uniqueChars = [...new Set(merged)];

 

  
    function renderPopularItem(itemData) {
 
      
        return <> 
        <Pressable style={[styles.itemCon, {      backgroundColor: active == itemData.item ? GlobalStyles.colors.orange400 : '#212529', }]} onPress={ () => {onPress(itemData.item)}}>
       
        <View style={styles.innerContainer}>
        <Text style={[styles.whiteText, {paddingHorizontal: 5}]}>{itemData.item}</Text>

        </View>
        
        </Pressable>
        </>
        }
  
  



    return (
         <View style={{flexDirection: 'row'}}>
             

        <Pressable style={{ 
     height: 30,
     margin: 6,
     marginTop: 8,
      borderRadius: 8,
      
     width: 60,
  backgroundColor: active == 'all' ? GlobalStyles.colors.orange400 : '#212529', 
   
      }}  onPress={ () => {onPress('all')}}>
       
        <View >
        <Text style={[styles.whiteText, { paddingTop: 7}]}>All</Text>

        </View>
        
        </Pressable>
        
       <FlatList
            data={uniqueChars}
            keyExtractor={(item, index) => index}
            renderItem={renderPopularItem}
            horizontal
            showsHorizontalScrollIndicator={false}

          />
        
       
         </View>
    )
}

export default Ca


const styles = StyleSheet.create({
  itemCon: {
      marginTop: 8,
      margin: 6,
      borderRadius: 8,
      
      color: 'white',
     flex: 1,
     height: 30,
     
     overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
     elevation: 4,
     shadowColor: 'black',
     shadowOpacity: 0.25,
     shadowOffset: { width: 0, height: 2}
     


    },
    whiteText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 12,
      
      textAlign: 'center'
      
    },
    innerContainer: {
      flex: 1,
      borderRadius: 8,

      paddingHorizontal: 6,
      justifyContent: 'center',
      

    },
  });