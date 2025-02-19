import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-vector-icons/Icon";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { database } from "../../Data/FConfig";

const { height, width } = Dimensions.get("window");

export default function Signup() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tp, setTp] = useState("");
  const [password, setPassword] = useState("");
  const [retype, setRetype] = useState("");

  // Add a new data
  function addData() {
    addDoc(collection(database, "users"), {
      name: name,
      address: address,
      email: email,
      tp: tp,
      password: password,
    })
      .then(() => {
        Alert.alert("data added.");
        setName("");
        setAddress("");
        setEmail("");
        setTp("");
        setPassword("");
        setRetype("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>Sign-up</Text>
        </View>

        <View style={styles.main}>
          <View>
            <Text style={styles.txt}>Name :</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(name) => {
                setName(name);
              }}
            />
          </View>

          <View>
            <Text style={styles.txt}>Address :</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(address) => {
                setAddress(address);
              }}
            />
          </View>

          <View>
            <Text style={styles.txt}>Email :</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(email) => {
                setEmail(email);
              }}
            />
          </View>

          <View>
            <Text style={styles.txt}>Mobile No :</Text>
            <TextInput
              style={styles.input}
              value={tp}
              onChangeText={(tp) => {
                setTp(tp);
              }}
            />
          </View>

          <View>
            <Text style={styles.txt}>Password :</Text>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => {
                setPassword(password);
              }}
            />
          </View>

          <View>
            <Text style={styles.txt}> Re Type Password :</Text>
            <TextInput
              style={styles.input}
              value={retype}
              secureTextEntry={true}
              onChangeText={(retype) => {
                setRetype(retype);
              }}
            />
          </View>

          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.btn} onPress={addData}>
              Sign up
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              position: "relative",
              left: wp(55),
              top: hp(5),
            }}
          >
            <Link href="/">
              <View style={{ marginTop: 10 }}>
                <Ionicons name="arrow-back" size={24} color="blue" />
              </View>
              <Text
                style={{
                  fontSize: wp(4),
                  color: "blue",
                  marginLeft: wp(50),
                }}
              >
                back to login
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: "#E9F2E6",
  },
  header: {
    height: hp(8),
    backgroundColor: "white",
  },
  main: {
    height: hp(92),
    paddingLeft: wp(5),
    paddingTop: hp(5),
    display: "flex",
  },
  section1: {
    flex: 1,
    backgroundColor: "orange",
  },
  txt: {
    fontSize: wp(4),
  },
  headerTxt: {
    fontSize: wp(5),
    paddingTop: hp(2),
    paddingLeft: wp(3),
    letterSpacing: 7,
  },
  input: {
    width: wp(90),
    borderBottomColor: "#111",
    borderStyle: "solid",
    borderBottomWidth: 2,
    fontSize: wp(4),
    marginBottom: hp(2),
    paddingVertical: hp(1),
  },
  signupButton: {
    width: wp(80),
    marginTop: hp(5),
    display: "flex",
    alignItems: "center",
    marginLeft: wp(4),
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
});
