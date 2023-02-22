import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Grid from "../components/Grid";



function Home({navigation}) {

  function renderPopularItem(itemData) {
 
    function pressHandler(){
navigation.navigate('Info', {
  animeId: itemData.item.id,
  animeTitle: itemData.item.title.english,
})
    }
    return (
        <Grid   
         title={itemData.item.title.english} 
         image={itemData.item.image} 
         color={itemData.item.color} 
        onPress={pressHandler}
        
         />
    )
}

  

const [details, setDetails] = useState('')
const [isLoading, setLoading] = useState(true);
    const getArticlesFromApi = async () => {
        try {
          let response = await fetch(
            'https://api.consumet.org/meta/anilist/popular?page=1&perPage=20'
          );
          let json = await response.json();
          console.log('rr')
          setDetails(json.results)
          setLoading(false)
        } catch (error) {
           console.error(error);
        }
      };
      useEffect(() => {
        getArticlesFromApi()
    }, [])

    return (
         <View>
            {isLoading ? <Text>Loading...</Text> : 
      ( 
          <FlatList
            data={details}
            keyExtractor={(item) => item.id}
            renderItem={renderPopularItem}
            numColumns={2}
          />
        
      )}
         </View>
    )
}

export default Home