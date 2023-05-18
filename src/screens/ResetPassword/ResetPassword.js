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
import close from "../../assets/eyeClose.png";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import open from "../../assets/eyeOpen.png";

export const ResetPassword = ({ navigation }) => {
      const [psw, setPsw] = useState("");
      const [psw2, setPsw2] = useState("");
      const [showPsw, setShowPsw] = useState(false);
      const [showConfirmPsw, setShowConfirmPsw] = useState(false);
      const [errors, setErrors] = useState([]);
      const [isLoad, setIsLoad] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
     
      <View style={styles.container}>
        {/* <View style={styles.TestView}> */}
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
            Update!
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
            Your{" "}
            <Text style={{ color: "#517A95", fontSize: 30 }}>Password!</Text>
          </Text>
          <Text style={{ fontSize: 17, color: "#474747", marginBottom: 10 }}>
            No need to worry about! Just change your password now!{" "}
          </Text>
        </View>
        <View style={{ position: "relative", width:"90%",}}>
          <TextInput
            value={psw}
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={"#AFC2CF"}
            secureTextEntry={showPsw == true ? false : true}
            onChangeText={(e) => setPsw(e)}
          />
          <TouchableOpacity
            onPress={() => setShowPsw(!showPsw)}
            style={{ ...styles.pass, justifyContent: "center",alignSelf:"flex-end",bottom:"50%",marginRight:15}}
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
        {/* {errors.password && (
          <Text style={styles.errorTxt}>{errors.password}</Text>
        )} */}
        {errors.Password && (
          <Text style={styles.errorTxt}>{errors.Password}</Text>
        )}
        <View style={{ position: "relative", width:"90%",bottom:5 }}>
          <TextInput
            value={psw2}
            style={styles.input}
            placeholder="Re Enter Password"
            placeholderTextColor={"#AFC2CF"}
            secureTextEntry={showConfirmPsw == true ? false : true}
            onChangeText={(e) => setPsw2(e)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPsw(!showConfirmPsw)}
            style={{ ...styles.pass, justifyContent: "center",alignSelf:"flex-end",bottom:"50%",marginRight:15}}
          >
            <Image
              source={showConfirmPsw == true ? close : open}
              style={{
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
          Change Password
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
    marginTop: "20%",
    width: "90%",
    paddingHorizontal: 8,
    alignSelf: "center",
    marginBottom: 35,
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
  input: {
    borderWidth: 1,
    borderColor: "rgba(81, 122, 149, 1)",
    
    padding: 15,
    // width: "86%",
    borderRadius: 12,
    backgroundColor: "white",
    fontFamily: "OutfitRegular",
    height: 50,
    // marginVertical: 2,
  },
  errorTxt: {
    fontSize: 13,
    color: "red",
    marginTop: 5,
    textAlign: "right",
    fontFamily: "OutfitThin",
  },
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    borderWidth: 1,
    height: 55,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 0,
    // paddingHorizontal: 8,
    borderColor: "rgba(81, 122, 149, 1)",
    marginBottom: 7,
    paddingVertical: 0,
  },
});
