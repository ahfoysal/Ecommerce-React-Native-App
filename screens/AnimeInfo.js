import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import {  Dimensions, FlatList, StyleSheet, Text, Button, View, Pressable } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { Video, AVPlaybackStatus } from 'expo-av';





function AnimeInfo({route}) {
    const animeID = route.params.animeId
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const DimensionsScreen = Dimensions.get('screen')

    

const [details, setDetails] = useState('')
const [isLoading, setLoading] = useState(true);
const [youtubeEmbed, setYoutubeEmbed] = useState(true);
const [animePlaying, setAnimePlaying] = useState(true);
const [src, setSrc] = useState('https://wwwx15.gofcdn.com/videos/hls/U5UQhjO0YphZkRHzCCwypg/1677102344/10624/a80af13ae85820b664b87e68fa55f4c8/ep.1.1657688883.480.m3u8');


    const getArticlesFromApi = async () => {
        try {
          let response = await fetch(
            `https://api.consumet.org/meta/anilist/info/${animeID}`
          );
          let json = await response.json();
        //   console.log(json)
          setDetails(json)
          setLoading(false)
          console.log(json.episodes[0].id)
          getSrc(json.episodes[0].id)
        } catch (error) {
           console.error(error);
           
        }
      };

      const getSrc = async (id) => {
        try {
          let response = await fetch(
            `https://api.consumet.org/meta/anilist/watch/${id}?dub=false`
          );
          let json = await response.json();
          console.log(json.sources[1].url)
        setSrc(json.sources[1].url)
          setAnimePlaying(true)
          setYoutubeEmbed(false)
        } catch (error) {
           console.error(error);
        }
      };
      
      
      useEffect(() => {
        getArticlesFromApi()
        // getSrc()
       
    }, [])
    function renderEpisodes( itemData ) {
            return(
                <View style={styles.container} >
                <Pressable>
                    <View style={styles.flexRow}>
                        
                        <View>
                        <Text>Image here</Text>
                        </View>
                        <View>
                        <Text style={{color: 'red'}}> {itemData?.item?.number}. {itemData?.item?.title}</Text>
                        </View>
                    </View>
                    <Text> {itemData?.item?.description}</Text>
              </Pressable>
                </View>
            )
    }

    return (
         <View >
           {isLoading ? <Text>Loading...</Text> : 
      ( 
        <View>
        
        {animePlaying ? <View>
       
          
          <Video
        ref={video}
        style={{ height: 300, width: '100%', backgroundColor: "black" }}
            shouldPlay={true}
        source={{
          uri: src,
        }}
        useNativeControls
        
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    

      <View >
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
   </View>
          
        </View> :
         <View>
         </View>
         }
      
     {details?.trailer?.id ?  (
         <>
         {youtubeEmbed ?  <YoutubeIframe 
            height={220}
            width={DimensionsScreen.width}
            play={true}
            videoId={details?.trailer?.id}
        /> : 
        <>
        </>}
        </>
        
        ) : <Text>No Trailer</Text> }
        <Text >   {details?.title?.english}</Text>
        
        <FlatList data={details.episodes} 
        keyExtractor={(item) => item.id}
        renderItem={renderEpisodes}
        />
       
        
      
    
        </View>
        
      )}
         </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1, 
        padding: 0
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1,
        height: 125,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
})
export default AnimeInfo