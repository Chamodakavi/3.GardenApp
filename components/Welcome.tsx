import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { Context } from "@/app/Context";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const { height, width } = Dimensions.get("window");

export default function Welcome() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { setUserId } = context;
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Check by email
      const emailQuery = query(
        collection(getFirestore(), "users"),
        where("email", "==", emailOrUsername)
      );
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        const user = emailSnapshot.docs[0].data();
        if (user.password === password) {
          setUserId(emailSnapshot.docs[0].id);
          router.push("/home");
          return;
        } else {
          Alert.alert("Invalid Password");
          return;
        }
      }

      // Check by username
      const usernameQuery = query(
        collection(getFirestore(), "users"),
        where("username", "==", emailOrUsername)
      );
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        const user = usernameSnapshot.docs[0].data();
        if (user.password === password) {
          setUserId(usernameSnapshot.docs[0].id);
          router.push("/home");
        } else {
          Alert.alert("Invalid Password");
        }
      } else {
        Alert.alert("User not found");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("An error occurred", error.message);
      } else {
        Alert.alert("An error occurred", "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.main}>
        <View style={styles.section1}>
          <Text style={styles.txt}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            mollitia optio natus? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Deleniti consequuntur quam dolorem dicta! Cum
            dolorum nobis corrupti dolorem sapiente sit, omnis ea animi! Facere,
            fugiat ducimus. Nostrum nisi temporibus, eum animi pariatur ex
            officia ipsam explicabo distinctio quae error eveniet deleniti?
          </Text>
        </View>
        <View style={styles.section2}>
          <TextInput
            placeholder="johndoe@gmail.com"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          {loading ? (
            <ActivityIndicator testID="loading-indicator" />
          ) : (
            <Button title="Login" onPress={handleLogin} />
          )}
        </View>
      </View>

      <View style={styles.footer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  header: {
    height: hp(15),
    backgroundColor: "tomato",
  },
  main: {
    height: hp(70),
    display: "flex",
    flexDirection: "row",
  },
  section1: {
    flex: 2,
    backgroundColor: "orange",
  },
  section2: {
    flex: 1,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: hp(15),
    backgroundColor: "lightgreen",
  },
  txt: {
    fontSize: wp(4),
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
});
