import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => router.push("/home")}
      >
        <Icon name="home" size={hp(3)} color="#228008" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => router.push("/signup")}
      >
        <Icon name="tree" size={hp(3)} color="#228008" />
        <Text style={styles.footerText}>SWL</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={require('../assets/images/a.png')} style={{width:wp(14), height:hp(10) }}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => router.push("/product")}
      >
        <Icon name="basket" size={hp(3)} color="#228008" />
        <Text style={styles.footerText}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => router.push("/profile")}
      >
        <Icon name="account" size={hp(3)} color="#228008" />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: hp(8),
    paddingHorizontal: wp(3),
    overflow:'hidden',
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#228008",
    fontSize: wp(3.5),
    marginTop: hp(0.5),
  },
});
