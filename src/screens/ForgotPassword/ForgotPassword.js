import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import backarrow from "../../assets/arrowBack.png";
import PhoneInput from "react-native-phone-number-input";

export const ForgotPassword = () => {
  const [mobile, setMbl] = useState("");
  const [errors, setErrors] = useState([]);
  var data = {
    To_Number: mobile,
  };
  return (
    <View style={styles.container}>
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
      <Text style={{}}>Opss!</Text>
      <Text> Forget Password?</Text>
      <Text>No need to worry about! Just change your password now! </Text>

      <View >
        <PhoneInput
          placeholder="Enter number"
          international={true}
          defaultCode="PK"
          value={mobile}
          withCountryCallingCode={true}
          flagStyle={{ marginLeft: 10, marginRight: 10,borderWidth:1 }}
          onChangeFormattedText={(e) => setMbl(e)}
          textInputStyle={[
            styles.input2,
            // { borderLeftWidth: 1, borderColor: "#000", },
          ]}
          containerStyle={[
            styles.input,
            // { borderWidth: 1, borderColor: "#000" },
          ]}
          textContainerStyle={[
            styles.input1,
            {
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        />

        {/* {errors.To_Number &&
        <Text
        style={styles.errorTxt}
    >{errors.To_Number}</Text>

        } */}
      </View>
    </View>
  );
};

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
    input: {
      height: 60,
      marginTop: 15,
      borderWidth: 1,
      paddingLeft: 20,
      borderRadius: 30,
      borderColor: "gainsboro",
      backgroundColor: "white",
      // width: window.width * 0.9,
      fontFamily: "OutfitRegular",
    },
    input1: {
      height: 58,
      marginTop: 0,
      borderWidth: 0,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 30,
      borderColor: "gainsboro",
      backgroundColor: "white",
      backgroundColor: "white",
      fontSize: 10,
      fontFamily: "OutfitSemiBold",
    },
    // input2: {
    //   height: 50,
    //   marginTop: 0,
    //   borderWidth: 0,
    //   paddingLeft: 20,
    //   borderColor: "gainsboro",
    //   backgroundColor: "white",
    //   paddingRight: 20,
    //   marginRight: 20,
    // },
});
