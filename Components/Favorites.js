import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import FilmList from './FilmList';
import Avatar from './Avatar';
import ImagePicker from 'react-native-image-picker'

function Favorites (props) {

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.avatar_container}>
                <Avatar/>
            </View>
            <FilmList
            films = { props.favoritesFilm }
            navigation = { props.navigation }
            favoriteList = { true } 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe:{
        flex:1
    },  
    avatar_container: {
        alignItems: 'center'
    },
});

const mapStateToProps = state => {
    return {
      favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites);
