import { Context } from "@/app/Context";
import { database } from "@/Data/FConfig";
import { Link } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function EditProfile() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { userId } = context;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tp, setTp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const userRef = doc(database, "users", userId);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || "");
            setAddress(userData.address || "");
            setEmail(userData.email || "");
            setTp(userData.tp || "");
            setPassword(userData.password || "");
            setLoading(false);
          } else {
            console.log("No user found with id:", userId);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleUpdate = async () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const userRef = doc(database, "users", userId);
      setLoading(true);
      await updateDoc(userRef, {
        name,
        address,
        email,
        tp,
        password,
      });
      setLoading(false);
      console.log("Profile updated successfully!");
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <View
            style={{
              zIndex: 999,
              position: "fixed",
              top: hp(50),
            }}
          >
            {/* <Text>loading...</Text> */}
            <SkypeIndicator />
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.headerTxt}>Edit Profile</Text>
            </View>

            <View style={styles.main}>
              <View>
                <Text style={styles.txt}>Name :</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View>
                <Text style={styles.txt}>Address :</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <View>
                <Text style={styles.txt}>Email :</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text style={styles.txt}>Mobile No :</Text>
                <TextInput
                  style={styles.input}
                  value={tp}
                  onChangeText={setTp}
                />
              </View>

              <View>
                <Text style={styles.txt}>Password :</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdate}
              >
                <Text style={styles.btn}>Update Profile</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", marginTop: hp(5) }}>
                <Link href="/profile">
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="arrow-back" size={hp(3)} color="blue" />
                    <Text
                      style={{ fontSize: wp(4), color: "blue", marginLeft: 5 }}
                    >
                      Back
                    </Text>
                  </View>
                </Link>
              </View>
            </View>
          </>
        )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    paddingLeft: wp(5),
    paddingTop: hp(5),
  },
  txt: {
    fontSize: wp(4),
    marginBottom: hp(1),
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
    borderBottomWidth: 2,
    fontSize: wp(4),
    marginBottom: hp(2),
    paddingVertical: hp(1),
  },
  updateButton: {
    width: wp(80),
    marginTop: hp(5),
    alignItems: "center",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#228008",
    width: "100%",
    textAlign: "center",
    paddingVertical: hp(1.5),
    borderRadius: hp(1),
    color: "white",
    fontSize: wp(5),
  },
});
