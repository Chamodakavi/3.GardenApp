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
import { database } from "@/Data/FConfig";

// Define the structure of each instruction step
interface Instruction {
  index: number;
  step: number;
  text: string;
  image: string;
}

// Define the PlantCardProps interface to include all the necessary properties
interface PlantCardProps {
  index: number;
  name: string;
  image: string;
  guide: Instruction[]; // Array of instructions for the plant
}

const { height, width } = Dimensions.get("window");

export default function PlantCard({
  index,
  name,
  image,
  guide,
}: PlantCardProps) {
  return (
    <TouchableOpacity>
      <Link
        href={{
          pathname: "/swl/instructions",
          params: {
            index: index.toString(), // Ensure it's a string
            name,
            image,
            guide: JSON.stringify(guide), // Convert array to string
          },
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
            <Text style={styles.title}>{name}</Text>
            {/* <Text style={styles.para}>{para}</Text> */}
            {/* <Text style={styles.price}>{price}</Text> */}
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
