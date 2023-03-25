import React, { useState, useEffect, useRef } from 'react'
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
import { Button } from 'react-native-paper'
import colors from '../../../utils/colors';
import OTPTextInput from 'react-native-otp-textinput';
import AuthMiddleware from '../../commonRedux/auth/middleware';
import { useDispatch } from 'react-redux'

export default function OtpScreen({ navigation, route }) {
    const dispatch = useDispatch();
    const [otpInp, setOtpInp] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const [errors, setErrors] = useState([]);
    const [serverError, setServerError] = useState([]);
    const data1 = route.params.data;
    const response = route.params.response;




    const renderServerError = () => {
        if (serverError != null && serverError.length > 0) {
            return (

                <View >
                    <Text style={styles.RendererrorTxt}> {serverError[0].msg}</Text>
                </View>


            )
        }
    }

    const _onFinishCheckingCode1 = () => {
        setIsLoad(true)
        var data = {
            "Email": data1?.Email,
            "Password": data1?.Password,
            "Password2": data1?.Password2,
            "Full_Name": data1?.Full_Name,
            "Otp": otpInp,
            "Date_Of_Birth": data1?.Date_Of_Birth,
            "Country": data1?.Country,
            "To_Number": data1?.To_Number
        }

        dispatch(AuthMiddleware.doRegister(data))
            .then((user) => {
                setIsLoad(false)
                navigation.navigate(`home`)
            })
            .catch(() => {
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
            <View style={styles.forgetTxtWrapper}>
                <Text style={styles.verificationTxt}>Verification Code</Text>
            </View>


            <OTPTextInput
                // ref={e => (otpInput = e)}
                tintColor="#3b5f76"
                inputCount={4}
                handleTextChange={(e) => {
                    setOtpInp(e)
                }}
                
            />

            {renderServerError()}


            {isLoad && <ActivityIndicator size="large" color={colors.primary} />}

            <View style={styles.LowerPart}>
                <View style={{display : 'flex',flexDirection : 'row', justifyContent : 'center'}}>
                    <Button
                        mode="contained"
                        uppercase={false}
                        style={styles.button}
                        onPress={() => _onFinishCheckingCode1()}>
                        Verify
                    </Button>
                    
                </View>
                <View>
                    <Text style={styles.accountTxt}>
                        Didn't receive code?
                        <Text style={styles.boldTxt} > Resend</Text>

                    </Text>
                </View>
                <View>
                    <Text style={styles.lastTxt} >The verification code is sent over your cell number
                        that is input previously, kindly check you mobile phone
                        for the 4-digit verification code.</Text>
                </View>
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

    logo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
    },
    button: {
        width: 250,
        marginTop : 30,
        marginBottom: 30,
        borderRadius: 100,
        paddingVertical: 5,
        backgroundColor: colors.primary,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    iconBox: {
        width: 80,
        height: 60,
        margin: 10,
        borderWidth: 1,
        borderRadius: 100,
        alignItems: 'center',
        borderColor: 'gainsboro',
        justifyContent: 'center',
    },
    socialLogos: {
        marginTop: 50,
        flexDirection: 'row',
    },
    inputContainer: {
        flexDirection: 'row',

    },
    input: {
        height: 73,
        marginTop: 20,
        borderWidth: 1,
        paddingLeft: 20,
        borderRadius: 10,
        borderColor: 'gainsboro',
        backgroundColor: 'white',
        width: 60,
        fontSize: 33,
        margin: 7,
        color: colors.primary,

    },
    forgetTxtWrapper: {
        marginVertical: 10,
        paddingVertical: 10,
    },
    accountTxt: {
        fontSize: 13,
        textAlign: 'center',
        color: colors.primary,
        marginTop: 10
    },
    verificationTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    boldTxt: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#979797',
        textDecorationLine: 'underline',
    },
    lastTxt: {
        fontSize: 11,
        textAlign: 'center',
        padding: 30
    },
    LowerPart: {
        marginTop: 10,
    }
});
