import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get("window");

export default function Welcome() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter(); 

  const handleTouch = () =>{
    router.push("/home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.halfHeightContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/a.png")}
          />
        <Text style={styles.logoName}>FarmOwn</Text>
        </View>


        <View style={styles.linkContainer}>
          <View style={styles.HStack}>
            <Link style={styles.linkStyle} href="/">
              <Text style={styles.textBorderBottom} >Login</Text>
            </Link>
            <Link style={styles.linkStyle} href="/signup">
              <Text >Sign-up</Text>
            </Link>
          </View>
        </View>
      </View>

      <View style={styles.container2}>
        <View>
          <Text style={styles.inputLabel}>Email address / Username :</Text>
          <TextInput style={styles.input} placeholder=" johndoe@gmail.com" />
        </View>

        <View style={styles.passwordSection}>
          <Text style={styles.inputLabel}>Password :</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder=" Enter your password"
              secureTextEntry={!passwordVisible}
            />
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="black"
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            />
          </View>
        </View>

        <Text style={styles.forgotPassText}>Forgot passcode ?</Text>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleTouch}>
            <Text style={styles.btn}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: "#E9F2E6",
  },
  halfHeightContainer: {
    height: hp(35),
    padding: wp(5),
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "white",
  },
  container2: {
    height: hp(65),
    padding: wp(5),
    paddingTop: hp(7),
  },
  imageContainer: {
    width: wp(50),
    height: hp(25),
    // backgroundColor:'grey',
    
  },
  logo: {
    position: "relative",
    top: hp(-14),
    width: wp(50),
    height: hp(50),
    resizeMode: "contain",
  },
  linkContainer: {
    position: "relative",
    top: hp(2),
  },
  HStack: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(60),
    justifyContent: "space-between",
  },
  linkStyle: {
    fontSize: wp(5),
  },
  textBorderBottom: {
   
    paddingBottom: hp(0.2),
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  inputLabel: {
    fontSize: wp(4),
    marginBottom: hp(1),
  },
  input: {
    width: wp(90),
    borderBottomColor: "#C2C2B9",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: wp(4),
    marginBottom: hp(2),
    paddingVertical: hp(1),
  },
  passwordSection: {
    paddingTop: hp(3),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(100),
    justifyContent: "space-between",
  },
  eyeIcon: {
    position: "relative",
    left: wp(-10),
    top: hp(-1),
  },
  forgotPassText: {
    paddingTop: hp(5),
    color: "#228008",
    fontWeight: "bold",
    fontSize: wp(4.5),
    cursor: 'pointer',
  },
  loginButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    width: wp(80),
    marginTop: hp(5),
  },
  btn: {
    backgroundColor: "#228008",
    width: "100%",
    textAlign: "center",
    lineHeight: hp(6),
    borderRadius: hp(2),
    color: "white",
    fontSize: wp(5),
  },
  logoName:{
    fontSize: wp(6),
    color:'#228008',
    fontWeight:'bold',
    position:'relative',
    bottom:hp(32),
    left:wp(11.3),

  }
});
