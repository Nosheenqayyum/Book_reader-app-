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
import React, { useState, useRef } from 'react';
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


export default function Register({ navigation }) {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitRegular: require('../../../assets/Outfit/static/Outfit-Regular.ttf'),
    })
    const [psw, setPsw] = useState('');
    const [psw2, setPsw2] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMbl] = useState('');
    const [showPsw, setShowPsw] = useState(false);
    const [showConfirmPsw, setShowConfirmPsw] = useState(false);
    const phoneInput = useRef('');
    const [country, setCountry] = useState('Null');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const dispatch = useDispatch();

    const renderServerError = () => {
        if (serverError != null && serverError.length > 0) {
            return (
                <View >
                    <Text style={styles.RendererrorTxt}> {serverError[0].msg}</Text>
                </View>
            )
        }
    }

    const register = () => {
        setIsLoad(true);

        var data = {
            "Email": email,
            "Password": psw,
            "Password2": psw2,
            "Full_Name": name,
            "Date_Of_Birth": "12",
            "Country": country,
            "To_Number": mobile
        }

        dispatch(AuthMiddleware.checkRegister(data))
            .then((user) => {
                console.log(user);
                setIsLoad(false)
                navigation.navigate(`otpscreen`, { "data": data, "response": user })
            })
            .catch((err) => {
                var validationError = {}
                var serverError = []
                if (err.hasOwnProperty('validation')) {
                    err.validation.map(obj => {
                        if (obj.hasOwnProperty('param')) {
                            validationError[obj["param"]] = obj["msg"]
                        } else {
                            serverError = [...serverError, obj]
                        }
                    });
                    setErrors(validationError);
                    setServerError(serverError);
                }
                console.log('In error', errors)
                setIsLoad(false)
            })
    }

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

            <View style={{ marginTop: '10%' }}>
                <Image source={logo} style={styles.logo} />
                {renderServerError()}
            </View>
            <ScrollView style={styles.PageContainer}>

                <TextInput
                    value={name}
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(e) => setName(e)}
                />
                {errors.Full_Name &&
                    <Text
                        style={styles.errorTxt}
                    >{errors.Full_Name}</Text>

                }
                <View >

                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Email Address"
                        onChangeText={(e) => setEmail(e)}

                    />

                </View>


                <View >

                    <PhoneInput
                        placeholder="Enter number"
                        international={true}
                        defaultCode="PK"
                        value={mobile}
                        withCountryCallingCode={true}
                        onChangeFormattedText={(e) => setMbl(e)}
                        textInputStyle={styles.input2}
                        containerStyle={styles.input}
                        textContainerStyle={styles.input1}
                    />
                    {errors.To_Number &&
                        <Text
                            style={styles.errorTxt}
                        >{errors.To_Number}</Text>

                    }
                </View>
                <View style={{ position: 'relative' }}>
                    <TextInput
                        value={psw}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={showPsw == true ? false : true}
                        onChangeText={(e) => setPsw(e)}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPsw(!showPsw)}
                        style={{...styles.pass, justifyContent : 'center'}}
                    >
                        <Image
                            source={showPsw == true ? close : open}
                            style={{ width: 16, height: 16, resizeMode: 'contain', alignSelf : 'center', }}
                        />
                    </TouchableOpacity>
                </View>
                {errors.Password &&
                    <Text
                        style={styles.errorTxt}
                    >{errors.Password}</Text>

                }
                <View style={{ position: 'relative' }}>
                    <TextInput
                        value={psw2}
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry={showConfirmPsw == true ? false : true}
                        onChangeText={(e) => setPsw2(e)}
                    />
                     <TouchableOpacity
                        onPress={() => setShowConfirmPsw(!showConfirmPsw)}
                        style={{...styles.pass, justifyContent : 'center'}}
                    >
                        <Image
                            source={showConfirmPsw == true ? close : open}
                            style={{ width: 16, height: 16, resizeMode: 'contain', alignSelf : 'center',}}
                        />
                    </TouchableOpacity>
                </View>
                {errors.Password2 &&
                    <Text
                        style={styles.errorTxt}
                    >{errors.Password2}</Text>

                }
                {isLoad && <ActivityIndicator size="large" color={colors.primary} />}

                <Button
                    mode="contained"
                    uppercase={false}
                    style={styles.button}
                    onPress={() => register()}>
                    Create Account
                </Button>
                <Text style={styles.accountTxt}>
                    Already have an Account?<Text style={styles.boldTxt} onPress={() => navigation.navigate('login')}> Login</Text>
                </Text>
            </ScrollView>

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
        width : 32,
        height : 32,
        position: 'absolute',
        right: 25,
        bottom: 15
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
