
import {  View, Text, FlatList, StyleSheet } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";




function Ca({pro, onPress}) {


  const ctgName =  pro.map(product => {
    return product.categories.map(categories => ( categories.name))})
    const merged = [].concat.apply([], ctgName);
    let uniqueChars = [...new Set(merged)];

 

  
    function renderPopularItem(itemData) {
 
      
        return <> 
        <Pressable style={styles.itemCon} onPress={ () => {onPress(itemData.item)}}>
       
        <View style={styles.innerContainer}>
        <Text style={[styles.whiteText, {paddingHorizontal: 5}]}>{itemData.item}</Text>

        </View>
        
        </Pressable>
        </>
        }
  
  



    return (
         <View style={{flexDirection: 'row'}}>
       
        <Pressable style={{   marginTop: 12,
      marginBottom: 12,
      marginLeft: 6,
      marginRight:  6,
      borderRadius: 8,
      height: 40,
      padding: 10,
     width: 60,
      backgroundColor: '#212529', 
   
      }}  onPress={ () => {onPress('all')}}>
       
        <View >
        <Text style={styles.whiteText}>All</Text>

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
      marginTop: 12,
      marginBottom: 12,
      marginLeft: 6,
      marginRight:  6,
      borderRadius: 8,
      backgroundColor: '#212529',
      
      color: 'white',
     flex: 1,
     height: 40,
     
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

      padding: 6,
      justifyContent: 'center',
      

    },
  });