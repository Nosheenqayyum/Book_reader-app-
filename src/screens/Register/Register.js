import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import PhoneInput from "react-native-phone-number-input";
import React, { useState, useRef } from "react";
import window from "../../../utils/window";
import colors from "../../../utils/colors";
import logo from "../../assets/logo.png";
import { Button } from "react-native-paper";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import backarrow from "../../assets/arrowBack.png";
import open from "../../assets/eyeOpen.png";
import close from "../../assets/eyeClose.png";
import AuthMiddleware from "../../commonRedux/auth/middleware";
import mailService from "../../middlewares/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { SvgXml } from "react-native-svg";
import { lockPassword } from "../../assets/svg/modalSvg";
import { EmailFS, PhoneFS } from "../../assets/svg/modalSvg";

export default function Register({ navigation }) {
  const [fontsLoaded] = useFonts({
    Outfit: require("../../../assets/Outfit/static/Outfit-Black.ttf"),
    OutfitThin: require("../../../assets/Outfit/static/Outfit-Thin.ttf"),
    OutfitSemiBold: require("../../../assets/Outfit/static/Outfit-SemiBold.ttf"),
    OutfitRegular: require("../../../assets/Outfit/static/Outfit-Regular.ttf"),
  });
  const [psw, setPsw] = useState("");
  const [psw2, setPsw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPsw, setShowPsw] = useState(false);
  const [showConfirmPsw, setShowConfirmPsw] = useState(false);
  const phoneInput = useRef("");
  const [country, setCountry] = useState("Null");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [serverError, setServerError] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const renderServerError = () => {
    if (serverError != null && serverError.length > 0) {
      return (
        <View>
          <Text style={styles.RendererrorTxt}> {serverError[0].msg}</Text>
        </View>
      );
    }
  };
  const handleOnChangePhoneNumber = (mobile) => {
    setMobile(mobile);
  };
  const register = () => {
    setIsLoad(true);

    var data = {
      Email: email,
      Password: psw,
      Password2: psw2,
      Full_Name: name,
      Date_Of_Birth: "12",
      Country: country,
      To_Number: mobile,
    };
    console.log("above", data);

    dispatch(AuthMiddleware.checkRegister(data))
      .then((user) => {
        console.log("AbC", data);

        setIsLoad(false);
        navigation.navigate(`otpscreen`, { data: data, response: user });
      })
      .catch((err) => {
        var validationError = {};
        var serverError = [];
        if (err.hasOwnProperty("validation")) {
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
        console.log("In error", errors);
        setIsLoad(false);
      });
  };

  console.log("above", mobile);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          top: "5%",
          left: "1%",
          marginTop: 20,
          marginBottom: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBox}
        >
          <Image source={backarrow} style={styles.BackIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.TextBox}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 20 }}>
          Hello!
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
          Create
          <Text style={{ color: "#517A95", fontSize: 30 }}> Account!</Text>
        </Text>
        <Text style={{ fontSize: 17, color: "#474747", marginBottom: 15 }}>
          Start reading your favourite books!{" "}
        </Text>
      </View>
    
      <ScrollView alignSelf={"center"} style={styles.PageContainer}>
        <View>
          <Ionicons
            name="ios-person-outline"
            size={18}
            color="#517A95"
            style={{
              position: "absolute",
              top: "35%",
              zIndex: 10,
              left: "6%",
            }}
          />

          <TextInput
            value={name}
            placeholder="Name"
            style={styles.input}
            placeholderTextColor={"#AFC2CF"}
            onChangeText={(e) => setName(e)}
          />
          {errors.Full_Name && (
            <Text style={styles.errorTxt}>{errors.Full_Name}</Text>
          )}
        </View>
        <View>
          <SvgXml
            xml={EmailFS}
            style={{
              position: "absolute",
              top: "34%",
              zIndex: 10,
              left: "6%",
            }}
          />
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={"#AFC2CF"}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View
          style={{
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <SvgXml
            xml={PhoneFS}
            style={{
              zIndex: 10,
              right: "41%",
              top: 30,
            }}
          />

          <PhoneInput
            defaultCode="PK"
            value={mobile}
            onChangePhoneNumber={handleOnChangePhoneNumber}
            containerStyle={styles.inputContainer}
            textInputStyle={styles.in}
            flagStyle={styles.flag}
            textProps={{
              placeholder: "Enter phone number",
              placeholderTextColor: "#AFC2CF",
            }}
            countryPickerButtonStyle={{ width: "20%" }}
            codeTextStyle={{ marginLeft: 30 }}
          />
        </View>

        <View style={{ position: "relative" }}>
          <SvgXml
            xml={lockPassword}
            style={{
              position: "absolute",
              top: "35%",
              zIndex: 10,
              left: "5%",
            }}
          />
          <TextInput
            value={psw}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#AFC2CF"}
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
                bottom: 5,
                width: 16,
                height: 16,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      
        {errors.Password && (
          <Text style={styles.errorTxt}>{errors.Password}</Text>
        )}
        <View style={{ position: "relative" }}>
          <SvgXml
            xml={lockPassword}
            style={{
              position: "absolute",
              top: "35%",
              zIndex: 10,
              left: "5%",
            }}
          />
          <TextInput
            value={psw2}
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"#AFC2CF"}
            secureTextEntry={showConfirmPsw == true ? false : true}
            onChangeText={(e) => setPsw2(e)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPsw(!showConfirmPsw)}
            style={{ ...styles.pass, justifyContent: "center" }}
          >
            <Image
              source={showConfirmPsw == true ? close : open}
              style={{
                bottom: 5,
                width: 16,
                height: 16,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </View>
        {errors.Password2 && (
          <Text style={styles.errorTxt}>{errors.Password2}</Text>
        )}
        {isLoad && <ActivityIndicator size="large" color={colors.primary} />}

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#B5322A" : undefined}
          />
          <View style={styles.checkBoxText}>
            <Text style={styles.paragraph}>
              I agree with the Terms & Conditions
            </Text>
          </View>
        </View>


        <View>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.btn}
            onPress={() => register()}
          >
            <Text style={styles.loginButtonText}>Create Account</Text>
          </Button>
        </View>

        <Text style={styles.accountTxt}>
          Already have an Account?
          <Text
            style={styles.boldTxt}
            onPress={() => navigation.navigate("login")}
          >
            {" "}
            Login Now!
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    alignSelf: "center",
    width: "100%",
  },
  PageContainer: {
    width: "86%",
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
    bottom: 15,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    height: 55,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 14,
    padding: 0,
    borderColor: "rgba(81, 122, 149, 1)",
    marginBottom: 9,
    paddingHorizontal: 10,
    bottom: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 15,
  },
  checkBoxText: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  in: {
    fontFamily: "OutfitRegular",
    top: 1,
    placeholderTextColor: "#AFC2CF",
    width: "90%",
    left: "5%",
  },

  TextBox: {
    width: "90%",
    paddingHorizontal: 8,
    alignSelf: "center",
  },

  SendEmailBtn: {
    backgroundColor: colors.primary,
    position: "absolute",
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
    resizeMode: "contain",
  },
  iconBox: {
    width: 80,
    height: 60,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "center",
    borderColor: "gainsboro",
    justifyContent: "center",
  },
  socialLogos: {
    marginBottom: 30,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(81, 122, 149, 1)",
    paddingHorizontal: 20,
    paddingLeft: 60,
    borderRadius: 12,
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
    height: 50,
    marginVertical: 9,
  },
  accountTxt: {
    fontSize: 13,
    marginLeft: 60,
  },
  boldTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorTxt: {
    fontSize: 13,
    color: "red",
    marginTop: 5,
    left: 15,
    fontFamily: "OutfitThin",
  },
  RendererrorTxt: {
    fontSize: 15,
    color: "red",
    marginTop: 5,
    textAlign: "center",
    fontFamily: "OutfitThin",
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
  btn: {
    width: "100%",
    height: 56,
    marginBottom: 15,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 12,
    marginTop: 45,
  },
});
