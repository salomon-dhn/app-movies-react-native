import React from 'react';
import { connect } from 'react-redux';
import {FlatList, StyleSheet} from 'react-native';
import FilmsItem from './FilmsItem';


function FilmList(props) {

    _displayDetailForFilm = (idFilm) => {
        //console.log("Display film with id " + idFilm);
        props.navigation.navigate("FilmDetails", { idFilm: idFilm });
    }

    return (
        <FlatList
        data= {props.films}
        extraData={props.favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flat}
        renderItem={({item}) => 
            <FilmsItem 
                film={item}
                // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} 
                displayDetailForFilm={_displayDetailForFilm}
            />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
            if (!props.favoriteList && props.page < props.totalPages) {
                // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                console.log('reached 0.5');
                props.loadFilms();
              }
        }}
    /> 
    );
}
const styles =StyleSheet.create({
    flat:{
        marginTop:5
    }
})
// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search

const mapStateToProps = state => {
    return {
      favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
  

export default connect(mapStateToProps)(FilmList);
