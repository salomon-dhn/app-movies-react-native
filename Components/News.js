import React, {useEffect, useState} from 'react';
import FilmList from './FilmList';
import {StyleSheet, View,  ActivityIndicator} from 'react-native';
import {getBestFilmsFromApi}  from  '../API/TMDB';
import { SafeAreaView } from 'react-native-safe-area-context';

var page = 0;
var totalPages= 0;
function News (props){
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState (false);

    

    function _loadFilms(){
        setIsLoading(true);
        getBestFilmsFromApi(page+1).then(data=>{
            console.log(data);
            page=data.page;
            totalPages= data.total_pages;
            setFilms(...films, ...data.results);
            setIsLoading(false);
        });
    }
    

    function _displayLoading(){
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
            );
        }
    }


    useEffect(_loadFilms, []);
    
    return (
        <SafeAreaView style={styles.safeView}>
        <FilmList
          films={films}
          navigation={props.navigation}
          loadFilms={_loadFilms}
          page={page}
          totalPages={totalPages}
          favoriteList={false}
        />
       {_displayLoading()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    },
    list:{
        flex: 1,
        backgroundColor: '#1ab',

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

export default News;