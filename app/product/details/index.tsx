import Footer from "@/components/Footer";
import { Link } from "expo-router";
import React from "react";
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

import ProductCard from "../../../components/ProductCard";

import { seeds, tools } from "@/Data/Data";
import { useGlobalSearchParams } from "expo-router";
const { height, width } = Dimensions.get("window");

export default function Seeds({ route }: { route: any }) {

  const { title, para, price } = useGlobalSearchParams();

  return (
    <ScrollView style={detailsStyles.container}>
    <Image
      source={require("../../../assets/images/im.jpg")}
      style={detailsStyles.image}
      resizeMode="contain"
    />
    <Text style={detailsStyles.title}>{title}</Text>
    <Text style={detailsStyles.para}>{para}</Text>
    <Text style={detailsStyles.price}>{price}</Text>

    <View style={detailsStyles.buttonContainer}>
      <TouchableOpacity style={detailsStyles.button}>
        <Text style={detailsStyles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={detailsStyles.buttonBuyNow}>
        <Text style={detailsStyles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: height,
    flex: 1,
    backgroundColor: "#E9F2E6",
  },
  header: {
    height: hp(10),
    paddingTop: hp(1),
    padding: wp(2),
  },
  headerText: {
    fontSize: wp(7),
    textAlign: "left",
    fontWeight: "bold",
  },
  headerPara: {
    fontSize: wp(3.2),
    textAlign: "left",
    marginLeft: wp(1),
  },
  main: {
    // height: hp(90),
    flex: 1,
    // paddingHorizontal: hp(3),
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    marginVertical: hp(1),
  },
  HStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fimg: {
    width: wp(17),
    height: hp(10),
    borderRadius: wp(50),
  },
  para: {
    fontSize: wp(4),
    marginLeft: wp(4),
    width: wp(70),
  },
  quote: {
    backgroundColor: "#E9F2E6",
    borderRadius: 20,
    padding: wp(5),
    marginVertical: hp(1),
  },
  qH: {
    fontSize: wp(4.2),
  },

  containero: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // padding: wp(1),
  },
  gridItem: {
    width: "48%",
    marginBottom: hp(1),
    backgroundColor: "#f7f9f7",
    borderRadius: 10,
    overflow: "hidden", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
    padding: wp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  gridText: {
    color: "white",
    fontSize: wp(4),
  },
});
const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: "#fff",
  },
  image: {
    width: wp(80),
    height: hp(30),
    alignSelf: "center",
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(6),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
    textAlign: "center",
  },
  para: {
    fontSize: wp(4.5),
    color: "#666",
    marginBottom: hp(2),
    textAlign: "justify",
  },
  price: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#228008",
    textAlign: "center",
    marginBottom: hp(2),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(2),
  },
  button: {
    backgroundColor: "#228008",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  buttonBuyNow: {
    backgroundColor: "#007BFF",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(4.5),
    textAlign: "center",
  },
});