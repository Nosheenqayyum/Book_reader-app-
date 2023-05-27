import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import backarrow from "../../assets/arrowBack.png";
import PhoneInput from "react-native-phone-number-input";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SvgXml } from "react-native-svg";
import { EmailFS, PhoneFS } from "../../assets/svg/modalSvg";

export const ForgotPassword = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");

  function handleOnChangePhoneNumber(number) {
    setMobile(number);
  }
  var data = {
    To_Number: mobile,
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{ flex: 1, height: "100%", backgroundColor: "white" }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
              position: "absolute",
              top: "5%",
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
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 45 }}>
              Opss!
            </Text>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
              Forget{" "}
              <Text style={{ color: "#517A95", fontSize: 30 }}>Password?</Text>
            </Text>
            <Text style={{ fontSize: 17, color: "#474747", marginBottom: 15 }}>
              No need to worry about! Just change your password now!{" "}
            </Text>
          </View>
          <SvgXml
            xml={PhoneFS}
            style={{
              top: "9%",
              zIndex: 10,
              right: "34%",

            }}
          />
          <View>
            <PhoneInput
              defaultCode="PK"
              value={mobile}
              onChangePhoneNumber={handleOnChangePhoneNumber}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.input}
              flagButtonStyle={styles.test}
              textProps={{
                style: { marginRight: 10 },
              }}
            />
          </View>

          <View style={{ width: "86%" }}>
            <SvgXml
              xml={EmailFS}
              style={{
                position: "absolute",
                top: "34%",
                zIndex: 10,
                left: "7%",
              }}
            />
            <TextInput
              zIndex={5}
              value={email}
              style={styles.txtinput}
              placeholder="Email Address"
              onChangeText={(e) => setEmail(e)}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
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
            Verify Number
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  ButtonBox: {
    borderWidth: 1,
    margin: 15,
  },
  fieldContainer: {
    width: "90%",
    marginBottom: 10,
  },
  test: {
    right: 38,
  },

  TextBox: {
    marginTop: "20%",
    width: "90%",
    paddingHorizontal: 8,
    alignSelf: "center",
    marginBottom: 35,
  },
  Textcontainer: {
    borderWidth: 1,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "rgba(81, 122, 149, 1)",
  },
  txtinput: {
    borderWidth: 1,
    borderColor: "rgba(81, 122, 149, 1)",
    marginTop: 8,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
    height: 55,
    marginBottom: 10,
    paddingLeft: 60,
  },
  flag: {
    borderWidth: 1,
  },

  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    height: 55,
    backgroundColor: "#fff",
    width: "86%",
    borderRadius: 12,
    padding: 0,
    paddingHorizontal: 40,
    borderColor: "rgba(81, 122, 149, 1)",
    marginBottom: 7,
    paddingVertical: 0,
  },

  BackIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  backBox: {
    padding: 5,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
    top: 1,
    width:'100%',
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
});
