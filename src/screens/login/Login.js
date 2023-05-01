import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import AuthMiddleware from "../../commonRedux/auth/middleware";
import showToast from "../../components/Toast";
import colors from "../../../utils/colors";
import window from "../../../utils/window";
import logo from "../../assets/logo.png";
import { Button } from "react-native-paper";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import open from "../../assets/eyeOpen.png";
import close from "../../assets/eyeClose.png";
import backarrow from "../../assets/arrowBack.png";
import Input from "../../components/inputs/Input";

export default function Login({ navigation }) {
  const [fontsLoaded] = useFonts({
    Outfit: require("../../../assets/Outfit/static/Outfit-Black.ttf"),
    OutfitThin: require("../../../assets/Outfit/static/Outfit-Thin.ttf"),
    OutfitSemiBold: require("../../../assets/Outfit/static/Outfit-SemiBold.ttf"),
    OutfitRegular: require("../../../assets/Outfit/static/Outfit-Regular.ttf"),
  });
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [showPsw, setShowPsw] = useState(false);
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isaccountDeactive, setIsAccountDeactive] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setIsAccountDeactive(false);
    };
  }, []);
  useEffect(() => {
    if (serverError !== null && serverError.length > 0) {
      serverError.forEach((el) => {
        if (el.msg == "User is deactivated") {
          setIsAccountDeactive(true);
        }
      });
    }
  }, [serverError]);
  // const renderServerError = () => {
  //     if (serverError != null && serverError.length > 0) {
  //         return <View>
  //             <Text style={styles.RendererrorTxt}> Server Error </Text>
  //         </View>
  //     }
  // }
  const renderValidationError = () => {
    if (serverError.length > 0) {
      return serverError.map((el) => {
        return (
          <View>
            <Text style={styles.RendererrorTxt}>
              {el.msg == "User is deactivated"
                ? "Your account has been deactivated contact support"
                : el.msg}
            </Text>
          </View>
        );
      });
    }
  };

  const login = () => {
    setIsLoad(true);
    var data = {
      email: email,
      password: psw,
    };

    dispatch(AuthMiddleware.doLogin(data))
      .then((user) => {
        console.log("MESS", user);

        showToast("Login Successfully");
        setIsLoad(false);

        navigation.navigate("home");
      })
      .catch((err) => {
        console.log("In Validation", err);
        var validationError = {};
        var serverError = [];
        if (err.hasOwnProperty("validation")) {
          console.log("HERE");
          err.validation.map((obj) => {
            if (obj.hasOwnProperty("param")) {
              validationError[obj["param"]] = obj["msg"];
            } else {
              serverError = [...serverError, obj];
            }
          });
          setErrors(validationError);
          setServerError(serverError);
        }
        setIsLoad(false);
        //showToast('Something went wrong');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isaccountDeactive &&
        Alert.alert(
          "Contact Support",
          "Your account has been deactivated contact support littlebookcompanypk@gmail.com",
          [{ text: "Cancel", onPress: () => setIsAccountDeactive(false) }],
          { cancelable: false }
        )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          position: "absolute",
          top: "5%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBox}
        >
          <Image source={backarrow} style={styles.BackIcon} />
        </TouchableOpacity>
      </View>

      <Image source={logo} style={styles.logo} />
      {renderValidationError()}
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(e) => setEmail(e)}
      />
      {errors.email && <Text style={styles.errorTxt}>{errors.email}</Text>}
      <View style={{ position: "relative" }}>
        <TextInput
          value={psw}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={showPsw == true ? false : true}
          onChangeText={(e) => setPsw(e)}
        />
        <TouchableOpacity
          onPress={() => setShowPsw(!showPsw)}
          style={{ ...styles.pass, justifyContent: "center" }}
        >
          <Image
            source={showPsw == true ? close : open}
            style={{
              width: 16,
              height: 16,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorTxt}>{errors.password}</Text>
      )}
      <View style={styles.forgetTxtWrapper}>
        <TouchableOpacity style={{marginTop:2}} onPress={() => navigation.navigate('ForgotPassword')}>
          {/* <Text style={styles.accountTxt} onPress={() => navigation.navigate('forgetpassword')}>Forget your Password?</Text> */}
        <Text style={styles.accountTxt}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {isLoad && <ActivityIndicator size="large" color={colors.primary} />}

      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        //onPress={() => navigation.navigate('home')}
        onPress={() => login()}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Button>
      <Text style={styles.accountTxt}>
        Don't have an Account?
        <Text
          style={styles.boldTxt}
          onPress={() => navigation.navigate("register")}
        >
          {" "}
          Create Account
        </Text>
      </Text>
      {/* <View style={styles.contiueAsGuest}>
                <Text style={{ ...styles.accountTxt, color: '#a1a1a1' }}>
                    <Text style={styles.boldTxt} onPress={() => navigation.navigate('home')}> Continue as a guest</Text>
                </Text>
            </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  BackIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  backBox: {
    marginLeft: 15,
    padding: 10,
  },
  pass: {
    width: 32,
    height: 32,
    position: "absolute",
    right: 25,
    bottom: 10,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },
  button: {
    width: 250,
    marginBottom: 30,
    borderRadius: 100,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    fontFamily: "Outfit",
  },
  loginButtonText: {
    fontFamily: "OutfitSemiBold",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconBox: {
    width: 80,
    height: 60,
    margin: 10,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    borderColor: "gainsboro",
    justifyContent: "center",
  },
  socialLogos: {
    marginTop: 50,
    flexDirection: "row",
  },
  input: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 30,
    borderColor: "gainsboro",
    backgroundColor: "white",
    width: window.width * 0.9,
    fontFamily: "OutfitRegular",
  },
  forgetTxtWrapper: {
    marginVertical: 10,
    paddingVertical: 10,
    // alignItems: 'flex-end',
    // width: window.width * 0.85,
    fontFamily: "OutfitSemiBold",
    alignSelf: "flex-end",
    width: "35%",

  },
  accountTxt: {
    fontSize: 13,
    color:'#000000'  
  },
  errorTxt: {
    fontSize: 13,
    color: "red",
    marginTop: 10,
    textAlign: "right",
  },
  RendererrorTxt: {
    fontSize: 16,
    color: "red",
  },
  boldTxt: {
    fontSize: 15,
    fontFamily: "OutfitSemiBold",
  },
  contiueAsGuest: {
    position: "absolute",
    bottom: 50,
    fontFamily: "OutfitSemiBold",
  },
});
