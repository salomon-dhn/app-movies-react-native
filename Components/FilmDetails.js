import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, Image, TouchableOpacity, Platform, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDB';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';

//...


function FilmDetails(props) {
  const [film, setFilm] = useState(undefined); // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
  const [isLoading, SetIsLoading] = useState(true); // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
  const navigation = props.navigation;

  React.useEffect(() => {
    console.log('film: '+film);
    if (film != undefined && Platform.OS === 'ios') {
      console.log('ios');
      navigation.setOptions({
        headerRight:()=>( <TouchableOpacity
          style={styles.share_touchable_headerrightbutton}
          onPress={() => _shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.ios.png')} />
        </TouchableOpacity>
        )
      });
    }
  });
  useEffect(() => {

    getFilmDetailFromApi(props.route.params.idFilm).then(data => {
      console.log('une fois')
      setFilm(data);
      SetIsLoading(false);
      console.log(film);
    })
  }, []);

  function _displayFavoriteImage() {
    var sourceImage = require('../Images/ic_favorite_border.png')
    if (props.favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  function _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: film }
    props.dispatch(action)


  }

  function _displayFilm() {
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => _toggleFavorite()}>
            {_displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.title_text}>{film.title}</Text>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(film.release_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
            return genre.name;
          }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
            return company.name;
          }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  function _displayLoading() {
    if (isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color='#12ad91' />
        </View>
      )
    }
  }
  function _shareFilm() {
    Share.share({ title: film.title, message: film.overview });
  }

  function _displayFloatingActionButton() {
    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => _shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.android.png')} />
        </TouchableOpacity>
      );
      /*
      <Ionicons name="md-share-social-outline" size={24} color="white" />
      <Image
            style={styles.share_image}
            source={require('../Images/ic_share.png')} /> */
    }
  }

  return (
    <SafeAreaView style={styles.main_container}>
      {_displayLoading()}
      {_displayFilm()}
      {_displayFloatingActionButton()}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }, favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
  }, favorite_image: {
    width: 40,
    height: 40
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#12ad91',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails)
//export default connect(mapStateToProps)(FilmDetails);
//export default FilmDetails;