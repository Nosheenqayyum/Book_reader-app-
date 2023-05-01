import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import backarrow from "../../assets/arrowBack.png";
import PhoneInput from "react-native-phone-number-input";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";
 import MaterialIcon from 'react-native-vector-icons/MaterialIcons';



export const ForgotPassword = ({ navigation }) => {
  const [mobile, setMbl] = useState("");
  const [errors, setErrors] = useState([]);
  const [mob, setMobile] = useState("");
  const [email, setEmail] = useState("");

  function handleOnChangePhoneNumber(number) {
    setMobile(number);
  }
  var data = {
    To_Number: mobile,
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.TestView}>
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
          <View style={styles.TextBox}>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 5 }}>
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
          <View style={styles.fieldContainer}>
            <View style={styles.Flagcontainer}>
              {/* <MaterialIcons size='20' color='black' name="smartphone"
              /> */}
              <PhoneInput
                defaultCountry="PK"
                value={mobile}
                onChangePhoneNumber={handleOnChangePhoneNumber}
                containerStyle={styles.inputContainer}
                textInputStyle={styles.input}
                flagStyle={styles.flag}
                textProps={{ placeholder: "Enter phone number" }}
              />
            </View>
          </View>
        </View>
        <TextInput
            value={email}
            style={styles.txtinput}
            placeholder="Email Address"
            onChangeText={(e) => setEmail(e)}
            leftIcon={<MaterialIcon name="smartphone" size={10} />}
          />
          
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
 
  TextBox: {
    marginTop: "20%",
    width: "90%",
    paddingHorizontal: 4,
    alignSelf: "flex-start",
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
    marginTop: 5,
    padding: 17,
    width:'82%',
    borderRadius: 10,
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
    right:4
  },
  Flagcontainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
    width:'100%',
    // alignSelf: "center",
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    padding: 2,
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    borderColor: "rgba(81, 122, 149, 1)",
  },

  flag: {
    padding: 0,
    marginLeft: 10,
  },

  BackIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  backBox: {
    // borderWidth: 1,
    marginLeft: 14,
    padding: 5,
  },
  input: {
    paddingLeft: 20,
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
  },
  btn: {
    width: 350,
    height: 56,
    marginBottom: 30,
    paddingVertical: 5,
    backgroundColor: "#517A95",
    fontFamily: "Outfit",
    alignSelf: "center",
    borderRadius: 10,
  },
});
