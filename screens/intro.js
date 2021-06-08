import * as React from 'react';
import { useState } from 'react';
import { Image, Text, ImageBackground, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



function Intro({navigation}) {
    return (

        <ImageBackground style={styles.imageBack} source={require('../assets/background.png')}>
            <SafeAreaView style={styles.fl}>
                <View style={styles.logoView}>
                    <Image source={require('../assets/icon-white.png')}
                        style={{ marginTop: 10, marginLeft: 10 }} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        Lancez {'\n'}
                    votre {'\n'}
                    carrière {'\n'}
                    maintenant !{'\n'}
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                        <Text style={styles.buttonBlank}>CONNEXION</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.buttonPurple}>INSCRIPTION</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    fl: {
        flex: 1,
        width: '100%'
    },
    imageBack: {
        flex: 1,
        width: '100%'
    },
    logoView: {
        width: '100%',
        flex: 0.1
    },
    textView: {
        width: '100%',
        flex: 0.7,
        justifyContent: 'flex-end'
    },
    text: {
        textTransform: 'uppercase',
        width: '100%',
        paddingLeft: 20,
        fontSize: 38,
        fontStyle: 'normal',
        lineHeight: 49,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#ffffff'
    },
    buttonView: {
        width: '100%',
        flex: 0.2,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly'
    },
    buttonBlank: {
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal:42,
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 15
    },
    buttonPurple:{
        textAlign: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#12ad91',
        borderWidth: 1,
        paddingVertical: 20,
        paddingHorizontal:42,
        fontStyle: 'normal',
        fontSize: 12,
        color: '#ffffff'
    }
});

export default Intro;