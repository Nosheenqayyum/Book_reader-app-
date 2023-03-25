import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useFonts } from 'expo-font'
import PhoneInput from "react-native-phone-number-input";
import React, { useState, useRef, useEffect } from 'react';
import window from '../../../utils/window';
import colors from '../../../utils/colors';
import logo from '../../assets/logo.png';
import { Button } from 'react-native-paper';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import backarrow from '../../assets/arrowBack.png'
import open from "../../assets/eyeOpen.png"
import close from "../../assets/eyeClose.png"
import AuthMiddleware from '../../commonRedux/auth/middleware';
import mailService from '../../middlewares/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';


export default function Profile({ navigation, route }) {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitRegular: require('../../../assets/Outfit/static/Outfit-Regular.ttf'),
    })
    const [isUser, SetIsUser] = useState(false)

    useEffect(() => {
        if (route.params.user !== null) {
            SetIsUser(true)

        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: '5%' }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBox}
                >
                    <Image source={backarrow} style={styles.BackIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.avatar}>
                {
                    isUser && <Text style={styles.avatarText}>
                        {
                            route.params.user?.Full_Name.split(" ").map(item => item.toUpperCase().substring(0, 1)).join('')
                        }
                    </Text>
                }
                {
                    !isUser && <Text style={styles.avatarText}>
                        {
                            "Guest User".split(" ").map(item => item.toUpperCase().substring(0, 1)).join('')
                        }
                    </Text>
                }

            </View>
            <View style={{ marginTop: '10%', marginBottom: "10%" }}>
                {
                    isUser && <Text style={{...styles.label, fontFamily : 'OutfitSemiBold'}}>{route.params.user.Full_Name}</Text>
                }
                {
                    !isUser && <Text style={{...styles.label, fontFamily : 'OutfitSemiBold'}}>Guest User</Text>
                }

            </View>

            <View>
                {
                    isUser && <Text style={{...styles.label, color : "#a1a1a1"}}>{route.params.user.Email}</Text>
                }
                {
                    !isUser && <Text style={{...styles.label, color : "#a1a1a1"}}>Guest User</Text>
                }

            </View>
            <View style={{ marginTop: 16, marginBottom: 24 }}>
                {
                    isUser && <Text style={{...styles.label, color : "#a1a1a1"}}>{route.params.user.Phone_Num || "No Contact Info"} </Text>
                }
                {
                    !isUser && <Text style={{...styles.label, color : "#a1a1a1"}}>Guest User</Text>
                }

            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    avatar: {
        width: 120,
        height: 120,
        elevation: 3,
        borderWidth: 4,
        borderRadius: 24,
        borderColor: '#3b5f76',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a6bcc9',
    },
    avatarText: {
        fontSize: 32,
        color: 'white',
        fontFamily: 'OutfitExtraBold',
    },
    PageContainer: {
        textAlign: 'center',
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
    pass: {
        width: 32,
        height: 32,
        position: 'absolute',
        right: 25,
        bottom: 15
    },
    label: {
        fontSize: 18,
        fontFamily: 'OutfitRegular',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',

    },
    button: {
        width: 250,
        borderRadius: 100,
        marginVertical: 30,
        paddingVertical: 5,
        marginLeft: 40,
        backgroundColor: colors.primary,
    },
    SendEmailBtn: {
        backgroundColor: colors.primary,
        position: 'absolute',
        right: 0,
        top: 15,
        height: 40,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 0,



    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    iconBox: {
        width: 80,
        height: 60,
        borderWidth: 1,
        borderRadius: 100,
        alignItems: 'center',
        borderColor: 'gainsboro',
        justifyContent: 'center',
    },
    socialLogos: {
        marginBottom: 30,
        flexDirection: 'row',
    },
    input: {
        height: 60,
        marginTop: 15,
        borderWidth: 1,
        paddingLeft: 20,
        borderRadius: 30,
        borderColor: 'gainsboro',
        backgroundColor: 'white',
        width: window.width * 0.9,
        fontFamily: 'OutfitRegular'
    },
    input1: {
        height: 58,
        marginTop: 0,
        borderWidth: 0,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        borderColor: 'gainsboro',
        backgroundColor: 'white',
        fontSize: 10,
        fontFamily: 'OutfitSemiBold'
    },
    input2: {
        height: 50,
        marginTop: 0,
        borderWidth: 0,
        paddingLeft: 20,
        borderColor: 'gainsboro',
        backgroundColor: 'white',
        paddingRight: 20,
        marginRight: 20,

    },
    accountTxt: {
        fontSize: 13,
        marginLeft: 60,
    },
    boldTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.7
    },
    errorTxt: {
        fontSize: 13,
        color: 'red',
        marginTop: 5,
        textAlign: 'right',
        fontFamily: 'OutfitThin'
    },
    RendererrorTxt: {
        fontSize: 15,
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'OutfitThin'
    },
});
