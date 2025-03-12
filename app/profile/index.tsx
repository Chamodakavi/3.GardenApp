import Footer from "@/components/Footer";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ProductCard from "../../components/ProductCard";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { seeds, tools } from "@/Data/Data";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Context } from "../Context";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/Data/FConfig";

const { height, width } = Dimensions.get("window");

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [name, setName] = useState("");

  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { userId, setUserId, cart, setCart, order, setOrder } = context;

  const handleeditprofile = () => {
    router.push("/profile/editprofile");
  };

  const handleCart = () => {
    setCart(0);
    router.push("/cart");
  };

  const handleOrder = () => {
    setOrder(0);
    router.push("/order");
  };

  const logout = () => {
    setUserId("");
    router.replace("/");
  };

  useEffect(() => {
    if (data) {
      setData(data);
      setName(data.name);
    }
  }, [data]);
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const userRef = doc(database, "users", userId);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setData(docSnap.data() as any);
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

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/farmone.png")}
      resizeMode="stretch"
    >
      <ScrollView style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}>
        <View style={styles.header}>
          <View style={styles.HStack}>
            <View>
              <Image
                style={styles.headerImg}
                source={require("../../assets/images/profile.jpg")}
              />
            </View>
            <Text style={styles.headerText}>{name}</Text>
          </View>

          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={handleeditprofile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.main}>
          <Text style={styles.title}>My Orders</Text>

          <View style={styles.orderContainer}>
            <TouchableOpacity onPress={handleCart}>
              {cart > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cart}</Text>
                </View>
              )}

              <View style={styles.iconContainer}>
                <MaterialIcons
                  name="shopping-cart"
                  size={wp(10)}
                  color="#228008"
                />

                <Text style={styles.iconText}>Cart</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOrder}>
              {order > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{order}</Text>
                </View>
              )}
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name="clipboard-list"
                  size={wp(10)}
                  color="#228008"
                />
                <Text style={styles.iconText}>Orders</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F2E6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(4),
    backgroundColor: "#f7f9f7",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // Adds shadow for Android
  },
  HStack: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImg: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 10,
  },
  headerText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#333",
  },
  editProfileBtn: {
    backgroundColor: "#228008", // Green background
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Adds shadow for Android
  },
  editProfileText: {
    color: "#fff", // White text color
    fontSize: wp(4),
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    marginTop: hp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#228008",
    marginBottom: hp(2),
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f7f9f7",
    paddingVertical: hp(2),
    borderRadius: 15,
    marginVertical: hp(2),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // Adds shadow for Android
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    marginTop: hp(0.5),
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FF6F61", // Logout button in red
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(6),
    borderRadius: 25, // Rounded corners
    alignSelf: "center",
    marginVertical: hp(4), // Space from other content
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5, // Adds shadow for Android
  },
  logoutText: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#fff", // White text color
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: -2,
    backgroundColor: "red",
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5), // Makes it a perfect circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: wp(3),
    fontWeight: "bold",
  },
});
