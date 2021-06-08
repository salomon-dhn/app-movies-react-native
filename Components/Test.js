// Components/Test.js

import React from 'react';
import { StyleSheet, View, Platform} from 'react-native';
import Hello from '../Hello/Hello';

function Test (){


    return (
      <View style={styles.main_container}>
        <View style={styles.subview_container}>
            <Hello />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 100,
        width: 50
      },
      android: {
        backgroundColor: 'blue',
        height: 50,
        width: 100
      }
    })
}

// Soit on teste la valeur de l'OS
/*
subview_container: {
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
    height: Platform.OS === 'ios' ? 100 : 50,
    width: Platform.OS === 'ios' ? 50 : 100
}*/
})

export default Test;