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
  ScrollView,
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
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { SvgXml } from "react-native-svg";
import { lockPassword } from "../../assets/svg/modalSvg";

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
        console.log("response of login ??????", data);
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
      <ScrollView style={{  flex: 1 }}>
        {isaccountDeactive &&
          Alert.alert(
            "Contact Support",
            "Your account has been deactivated contact support littlebookcompanypk@gmail.com",
            [{ text: "Cancel", onPress: () => setIsAccountDeactive(false) }],
            { cancelable: false }
          )}

        <View style={styles.TextBox}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Let's</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
            Get <Text style={{ color: "#517A95", fontSize: 30 }}>Started!</Text>
          </Text>
          <Text style={{ fontSize: 17, color: "#474747", marginBottom: 15 }}>
            Login to your account and start reading your favourite books!{" "}
          </Text>
        </View>

        {renderValidationError()}
        <View style={{  }}>
          <View>
            <Ionicons
              name="ios-person-outline"
              size={18}
              color="#517A95"
              style={{
                position: "absolute",
                bottom: "23%",
                zIndex: 10,
                left: "7%",
                
              }}
            />
            <TextInput
              zIndex={5}
              value={email}
              style={styles.input}
              placeholder="Enter Email/Phone No"
              onChangeText={(e) => setEmail(e)}
              placeholderTextColor="#AFC2CF"
            />
            {errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}
          </View>
          <View>
            <View>
              <SvgXml
                xml={lockPassword}
                style={{
                  position: "absolute",
                  top: "48%",
                  zIndex: 10,
                  left: "6%",
                }}
              />
              <TextInput
                value={psw}
                style={styles.input}
                placeholder="Password"
                onChangeText={(e) => setPsw(e)}
                placeholderTextColor="#AFC2CF"
              />
            </View>
            <TouchableOpacity
              onPress={() => setShowPsw(!showPsw)}
              style={{ ...styles.pass, justifyContent: "center" }}
            >
              <Image
                source={showPsw == true ? close : open}
                style={{
                  // right:15,
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
            <TouchableOpacity
              style={{ marginTop: 2 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              {/* <Text style={styles.accountTxt} onPress={() => navigation.navigate('forgetpassword')}>Forget your Password?</Text> */}
              <Text style={styles.accountTxt}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoad && <ActivityIndicator size="large" color={colors.primary} />}
      </ScrollView>

      {/* <TouchableOpacity
        style={styles.btn}
        // onPress={() => console.log("pressed")}
        onPress={() => navigation.navigate("ResetPassword")}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            justifyContent: "center",
            top: 10,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Change Password
        </Text>
      </TouchableOpacity> */}
      <View>
        <Button
          mode="contained"
          uppercase={false}
          style={styles.button}
          //onPress={() => navigation.navigate('home')}
          onPress={() => login()}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Button>
        <View style={{ bottom: 15 }}>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  BackIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  btn: {
    width: "90%",
    height: 56,
    marginBottom: 30,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 12,
    left: 2,
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
  TextBox: {
    marginTop: "20%",
    width: "90%",
    paddingHorizontal: 4,
    alignSelf: "flex-start",
  },
  button: {
    width: "95%",
    height: 56,
    marginBottom: 30,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 12,
  },
  loginButtonText: {
    fontFamily: "OutfitSemiBold",
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    top: 10,
    fontWeight: "bold",
    fontSize: 18,
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
    height: 55,
    marginTop: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingLeft: 60,
    borderRadius: 10,
    borderColor: "gainsboro",
    backgroundColor: "white",
    width: window.width * 0.9,
    fontFamily: "OutfitRegular",
    width: "95%",
    alignSelf: "center",
    borderColor: "rgba(81, 122, 149, 1)",
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
    color: "#000000",
    alignSelf: "center",
  },
  errorTxt: {
    fontSize: 13,
    color: "red",
    marginTop: 10,
   left:20
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
