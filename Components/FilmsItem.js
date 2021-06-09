import React, { useRef, useEffect } from 'react';
import { View, StyleSheet,Image, Text, Animated, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getImageFromApi } from '../API/TMDB';
import FadeIn from '../Animations/FadeIn';

function FilmsItem(props){
    const {film, displayDetailForFilm }=props;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  

  function _displayFavoriteImage() {
    if (props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }

    return(
       //<FadeIn>
        <TouchableOpacity style={styles.mainContainer} onPress={()=> displayDetailForFilm(film.id)}>
            <Image source={{uri: getImageFromApi(film.poster_path)}} style={styles.imageContainer}/>
            <View style={styles.box}>
                <View style={styles.header}>
                    <View style={styles.top}>
                    {_displayFavoriteImage()}
                    <Text style={styles.title}>{film.title}</Text>
                    </View>
                    <Text style={styles.voteText}>{film.vote_average}</Text>
                    
                </View>
                <View style={styles.body}>
                    <Text style={styles.descText} numberOfLines={6}>{film.overview}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.release}>{film.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
       //</FadeIn>
    );
}

const styles= StyleSheet.create({
    mainContainer:{
        height:190,
        flexDirection:'row'
    },
    imageContainer:{
        height:180,
        width:120,
        margin:5
    },
    box:{
        height:180,
        margin:5,
        flex:1
    },
    title:{
        fontStyle:'normal',
        fontWeight:'bold',
        //fontSize:40,
        
    },
    voteText:{
        fontStyle:'italic',
        alignItems:'flex-end',
        flex: 1/10
        //fontSize:30
    },
    descText:{
        textAlign:'justify',
        flexWrap:'wrap'
    },
    release:{
        fontStyle:'italic'
    },
    header:{
        flexDirection:'row',
        flex:2/8,
        justifyContent: 'space-evenly'

    },
    top:{
        flexDirection:'row',
        flex:9/10,
        justifyContent: 'flex-start'

    },
    body:{
        flex:5/8

    },
    footer:{
        flex:1/8,
        alignItems:'flex-end'
    },
    favorite_image: {
        //flexDirection:'row',
        //flex:1/10,
        width: 20,
        height: 20
    }
});

export default FilmsItem;