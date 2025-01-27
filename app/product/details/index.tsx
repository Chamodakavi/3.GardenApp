import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link } from "expo-router";

// Define the prop types using an interface
interface ProductCardProps {
  title: string;
  para: string;
  price: string;
}

const { height, width } = Dimensions.get("window");


export function ProductDetails({ route }: { route: any }) {
  const { title, para, price } = route.params;

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
