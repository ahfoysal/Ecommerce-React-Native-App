import {
    
    StyleSheet,
   
    View,
   
    Animated,
    Easing,
    Image,
  } from 'react-native';
  import React from 'react';
  
  
  const SlideItem = ({item}) => {
    
    return (
      <View style={styles.container}>
        <Image
        
          source={{uri: item.src}}
          
          style={[
            styles.image,
           
          ]}
        />
  
      
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width: 380,
      height: 375,
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      flex: 1,
      width: '100%',
    }
  });