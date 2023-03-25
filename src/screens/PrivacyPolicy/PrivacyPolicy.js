import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,

} from 'react-native';
import { useFonts } from 'expo-font'
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import backarrow from '../../assets/arrowBack.png';



export default function PrivacyPolicy({ navigation, route }){
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf')
    })

    const [Visible, setVisible] = useState(true);



    const hideSpinner = () => {
        setVisible(false)
    }



    return (
        <>
            <View style={styles.itemRow}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBox}
                >
                    <Image source={backarrow} style={styles.BackIcon} />

                </TouchableOpacity>
                <Text style={styles.heading}>Privacy Policy </Text>

            </View>
            <WebView
                onLoad={() => hideSpinner()}
                source={{ uri: 'https://littlebookcompany.net/privacy' }}
            />

            {Visible && (

                <ActivityIndicator
                    style={{ position: "absolute", top: 320, alignSelf: 'center', }}
                    size="large"
                />
            )}
        </>

    );
};

const styles = StyleSheet.create({
    itemRow: {
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor : 'white'
    },
    BackIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    backBox: {
        marginLeft: 15,
        padding: 10,
    },
    heading: {
        marginTop: 50,
        fontSize: 24,
        marginLeft: 10,
        fontFamily : 'OutfitSemiBold',
        color : '#3B5F76'
    },

});