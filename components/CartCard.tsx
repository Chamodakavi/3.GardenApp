import { Link } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { height, width } = Dimensions.get("window");

interface cartProps {
  title: string;
  img: any;
  price: string;
  qty: number;
}

function CartCard({ title, img, price, qty }: cartProps) {
  console.log("CartCard received props:", { title, img, price, qty });

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: img }} resizeMode="cover" style={styles.image} />
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.qty}>Qty:{qty}</Text>
      </View>

      {/* Button Section */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.button, styles.orderButton]}>
          <Text style={styles.buttonText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CartCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: wp(3),
    marginVertical: hp(0.8),
    marginHorizontal: wp(4),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: wp(15),
    height: hp(10),
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: wp(3),
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: wp(4),
    color: "#228008",
    marginTop: hp(0.5),
  },
  btnContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    marginBottom: hp(1),
    width: wp(20),
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
  },
  orderButton: {
    backgroundColor: "#228008",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  qty: {
    fontSize: wp(3.8),
    color: "#666",
    marginTop: hp(0.3),
    fontWeight: "500",
  },
});
