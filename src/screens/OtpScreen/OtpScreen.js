import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Button } from "react-native-paper";
import colors from "../../../utils/colors";
import OTPTextInput from "react-native-otp-textinput";
import AuthMiddleware from "../../commonRedux/auth/middleware";
import { useDispatch } from "react-redux";
import backarrow from "../../assets/arrowBack.png";
import Modal from "react-native-modal";
import { modalSvg, closeButton } from "../../assets/svg/modalSvg";
import { SvgUri, SvgXml } from "react-native-svg";

const CELL_COUNT = 4;
export default function OtpScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [otpInp, setOtpInp] = useState("");
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState([]);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);
  // const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  // const data1 = route.params.data;
  // const response = route.params.response;

  const renderServerError = () => {
    if (serverError != null && serverError.length > 0) {
      return (
        <View>
          <Text style={styles.RendererrorTxt}> {serverError[0].msg}</Text>
        </View>
      );
    }
  };

  const _onFinishCheckingCode1 = () => {
    setIsLoad(true);
    var data = {
      Email: data1?.Email,
      Password: data1?.Password,
      Password2: data1?.Password2,
      Full_Name: data1?.Full_Name,
      Otp: otpInp,
      Date_Of_Birth: data1?.Date_Of_Birth,
      Country: data1?.Country,
      To_Number: data1?.To_Number,
    };

    dispatch(AuthMiddleware.doRegister(data))
      .then((user) => {
        setIsLoad(false);
        navigation.navigate(`home`);
      })
      .catch(() => {
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%",
          position: "absolute",
          top: "4%",
          left: "7%",
          marginTop: 20,
          marginBottom: 5,
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
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Verification!</Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
          SMS <Text style={{ color: "#517A95", fontSize: 30 }}>OTP</Text>
        </Text>
        <Text style={{ fontSize: 17, color: "#474747", marginBottom: 10 }}>
          Enter OTP we just sent to your phone number.{" "}
        </Text>
      </View>

      <View style={{ height: "55%" }}>
        <CodeField
          ref={ref}
          {...props}
          onChangeText={setValue}
          autoCapitalize="none"
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text style={styles.accountTxt}>Time Remaining 2:00s</Text>
          <Text style={styles.boldTxt}> Resend</Text>
        </View>
      </View>
      <Button onPress={toggleModal}>
        <Text>Modal</Text>
      </Button>

      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => console.log("pressed")}
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
            Verify OTP Code
          </Text>
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          style={{ margin: 0, backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                height: "46%",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 1,
                }}
                onPress={closeModal}
              >
                <SvgXml xml={closeButton} />
              </TouchableOpacity>
              <SvgXml
                xml={modalSvg}
                style={{
                  alignSelf: "center",
                  marginTop: "15%",
                  marginBottom: "6%",
                }}
              />
              <Text
                style={{
                  color: "#0D1B2A",
                  fontSize: 24,
                  alignSelf: "center",
                }}
              >
                Congratulation!
              </Text>
              <Text
                style={{
                  color: "#0D1B2A",
                  fontSize: 17,
                  textAlign: "center",
                  marginTop: "5%",
                }}
              >
                Your password has been reset successfully! Now, Login & Enjoy
                Reading
              </Text>
            </View>
            <View style={{ backgroundColor: "#fff" }}>
              <View style={{ alignItems: "center", paddingBottom: 20 }}>
                <TouchableOpacity
                  style={styles.StartReading}
                  onPress={() => console.log("pressed")}
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
                    Start Reading
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: "space-around",
    marginHorizontal: 30,
  },
  cell: {
    width: 55,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    borderRadius: 10,
    textAlign: "center",
    padding: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
  backBox: {
    padding: 5,
    alignSelf: "center",
  },
  BackIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  TextBox: {
    width: "90%",
    paddingHorizontal: 8,
    alignSelf: "center",
    marginTop: "30%",
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: "contain",
  },

  btn: {
    width: "90%",
    height: 56,
    // marginBottom: 30,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 12,
    left: 2,
  },
  StartReading: {
    width: "90%",
    height: 56,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 12,
    left: 2,
    bottom: "40%",
   
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
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    height: 73,
    marginTop: 20,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: "gainsboro",
    backgroundColor: "white",
    width: 60,
    fontSize: 33,
    margin: 7,
    color: colors.primary,
  },

  accountTxt: {
    fontSize: 15,
    color: "#000000",
    alignSelf: "flex-start",
    width: "45%",
    right: 15,
  },
  boldTxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    width: "25%",
    left: 45,
  },
});
