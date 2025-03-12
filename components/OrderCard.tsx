import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get("window");

interface OrderProps {
  title: string;
  img: any;
  price: string;
  qty: number;
}

function OrderCard({ title, img, price, qty }: OrderProps) {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
  const totalPrice = numericPrice * qty;

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} resizeMode="cover" style={styles.image} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>

        {/* Quantity Section */}
        <Text style={styles.qty}>Qty: {qty}</Text>
      </View>
    </View>
  );
}

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: wp(4),
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: wp(18),
    height: hp(12),
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: wp(4),
  },
  title: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: wp(4.5),
    color: "#27ae60",
    marginVertical: hp(0.5),
    fontWeight: "bold",
  },
  qty: {
    fontSize: wp(4),
    color: "#333",
    fontWeight: "bold",
    marginTop: hp(0.5),
  },
});
