import { Link } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Define the prop types using an interface
interface ProductCardProps {
  id: string;
  title: string;
  para: string;
  price: string;
  image: any;
}

const { height, width } = Dimensions.get("window");

export default function ProductCard({
  id,
  title,
  para,
  price,
  image,
}: ProductCardProps) {
  return (
    <TouchableOpacity>
      <Link
        href={{
          pathname: "/product/details",
          params: { id, title, para, price, image },
        }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {/* <Text style={styles.para}>{para}</Text> */}
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginVertical: hp(0.4),
    overflow: "hidden",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: wp(2),
  },
  image: {
    width: wp(60),
    height: hp(20),
  },
  textContainer: {
    marginLeft: wp(1),
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(0.5),
  },
  para: {
    fontSize: wp(4),
    color: "#666",
    marginBottom: hp(1),
  },
  price: {
    fontSize: wp(4),
    fontWeight: "bold",
    color: "#228008",
  },
});
