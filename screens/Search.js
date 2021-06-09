import React from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilmList from '../Components/FilmList';
import { getFilmsByText } from  '../API/TMDB';
import { useState } from 'react';
//import { connect } from 'react-redux';
import { useEffect } from 'react';

var page = 0;
var totalPages = 0;
var searchedText = '';
var search = false;

function Search(props) {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function _loadFilms() {
        if (searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            setIsLoading(true);
            getFilmsByText(searchedText, page + 1).then(data => {
                page = data.page;
                totalPages = data.total_pages;
                setFilms([...films, ...data.results]);
                setIsLoading(false);
            })
        }
    }

    useEffect(_loadFilms, [search]);
    function _displayLoading() {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color='#12ad91' />
                    {/* Le component ActivityIndicator possède une propriété 
                size pour définir la taille du visuel de chargement : small ou large. 
                Par défaut size vaut small, on met donc large pour que le chargement soit 
                bien visible */
                    }
                </View>
            )
        }
    }

    function _searchTextInputChanged(text) {
        searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    }
    /*
        _displayDetailForFilm = (idFilm) => {
            //console.log("Display film with id " + idFilm);
            props.navigation.navigate("FilmDetails", { idFilm: idFilm });
        }
    */
    function _searchFilms() {
        page = 0;
        totalPages = 0;
        console.log('initalisatione - nouvelle recherche')
        setFilms([]);
        if (search) {
            search = false;
        } else {
            search = true;
        }

    }
    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchBar}
                    placeholder='Titre du film'
                    onChangeText={(text) => _searchTextInputChanged(text)}
                    onSubmitEditing={() => _searchFilms()}
                    blurOnSubmit={true}
                />
                <TouchableOpacity onPress={() => _searchFilms()}>
                    <Text style={styles.purpleButton}>Rechercher</Text>
                </TouchableOpacity>
            </View>
            <FilmList
                films={films}
                navigation={props.navigation}
                page={page}
                totalPages={totalPages}
                loadFilms={_loadFilms}
                favoriteList={false}
            />
            {_displayLoading()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1
    },
    searchView: {
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    searchBar: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 10,
        marginTop: 10
    },
    purpleButton: {
        padding: 15,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#12ad91',
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: 'center'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 180,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
/*
const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
}
  */

//export default connect(mapStateToProps)(Search);

export default Search;