import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Intro from '../screens/intro';
import MailLogin from '../screens/loginMail';
import Search from '../screens/Search';
import FilmDetails from '../Components/FilmDetails';
import Favorites from '../Components/Favorites';
import News from '../Components/News';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

//import Ionicons from '@expo/vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

const Stack = createStackNavigator();
const SearchStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const MoviesTabNavigator = createBottomTabNavigator();
var numberFavorite = 0;

function BottomNavigator() {
  return (
    <MoviesTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'SearchScreen') {
            iconName = focused
              ? 'md-search-circle'
              : 'md-search-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'md-heart-circle' : 'md-heart-circle-outline';
          }else if (route.name === 'News'){
            iconName = focused ? 'md-newspaper' : 'md-newspaper-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#12ad91',
        inactiveTintColor: 'gray',
      }}
    >
      <MoviesTabNavigator.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Rechercher' }} />
      <MoviesTabNavigator.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoris', tabBarBadge: numberFavorite}} />
      <MoviesTabNavigator.Screen name='News' component={News} options={{title: 'News', }} />
    </MoviesTabNavigator.Navigator>
  );
}

function SearchScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="FilmDetails"
        component={FilmDetails}
        options={{ headerTitle: 'Détails', headerShown: true }}
      />
    </SearchStack.Navigator>
  );
}

function FavoritesScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} options={{ headerTitle: 'Favoris', headerShown: true }} />
      <FavoritesStack.Screen
        name="FilmDetails"
        component={FilmDetails}
        options={{ headerTitle: 'Détails', headerShown: true }} />
    </FavoritesStack.Navigator>
  );

}

export function Navigation({ favoritesFilm }) {
  
  console.log('favo'+favoritesFilm.length)
  
  if(numberFavorite!=favoritesFilm.length){
    numberFavorite=favoritesFilm.length;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={MailLogin} options={{ headerShown: false }} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}
export default connect(mapStateToProps)(Navigation);