import * as React from 'react';
import {Text, Image, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


function MailLogin({navigation}){
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.logoView}>
                <Image source={require('../assets/logo.png')} />
            </View>
            <View style={styles.princView}>
                <Text style={styles.textView}>Connectez-vous</Text>

                <TextInput style={styles.textInput} placeholder='Adresse e-mail'/>

                <TextInput style={styles.textInput} placeholder='Mot de passe'/>
                <TouchableOpacity>
                <Text style={styles.textForget}>Mot de passe oublié?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>{navigation.navigate('BottomNavigator')}}>
                <Text style={styles.purpleButton}>Se Connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.blankButton}>Se connecter avec un numéro</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    safe:{
        flex:1,
        //backgroundColor:'#ade'
    },
    logoView:{
        width:'100%',
        flex:1/11,
        //backgroundColor:'#cda',
        alignItems:'center',
        justifyContent:'space-around'
    },
    princView:{
        width:'100%',
        flex:5/11,
        //backgroundColor:'#5de',
        alignItems:'stretch',
        justifyContent:'space-evenly'
    },
    textView:{
        width:'100%',
        fontWeight:"600",
        fontSize:22,
        paddingTop:30,
        textAlign:'center'
    },
    textInput:{
        borderColor: 'gray', 
        borderWidth: 0.5,
        borderRadius:10,
        marginHorizontal:20,
        height: 50,
        padding:10
    },
    textForget:{
        textAlign:'right',
        marginHorizontal:20
    },
    buttonView:{
        width:'100%',
        flex:5/11,
        //backgroundColor:'#45e',
        alignItems:'stretch',
        justifyContent:'flex-start',
        
    },
    blankButton:{
      padding: 15, 
      borderRadius: 10, 
      backgroundColor: '#fff',
      borderColor: '#12ad91',
      borderWidth:1,
      marginTop:10,
      marginHorizontal:20
    },
    purpleButton:{
      padding: 15, 
      borderRadius: 10, 
      borderColor: '#fff',
      backgroundColor: '#12ad91',
      borderWidth: 1,
      marginTop:10,
      marginHorizontal:20
      
    }
});

export default MailLogin;