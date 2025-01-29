
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



import PlantInstructions from "../../../components/PlantInstructions";

const { height, width } = Dimensions.get("window");

export default function instructions() {
  return (

    <PlantInstructions/>
  
  );
}

