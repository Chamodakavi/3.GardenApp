import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

// Define the structure of each instruction step
interface Instruction {
  step: number;
  text: string;
  image: string;
}

const OnboardingScreen = () => {
  const { name, image, guide } = useGlobalSearchParams<{
    name: string;
    image: string;
    guide: string;
  }>();

  // Parse the guide array safely
  const parsedGuide: Instruction[] = guide ? JSON.parse(guide) : [];


  const navigation = useNavigation();
  const [stepIndex, setStepIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Scroll to selected step when dot is tapped
  const handleDotPress = (index: number) => {
    setStepIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setStepIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={wp(7)} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>{name}</Text>

      {/* Instructions Carousel */}
      <FlatList
        ref={flatListRef}
        data={parsedGuide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.step.toString()} // Ensure each item has a unique key
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.stepText}>Step {item.step}</Text>
            <Text style={styles.description}>{item.text}</Text>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {parsedGuide.map((_item, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View
              style={[styles.dot, stepIndex === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: hp(4),
    right: wp(5),
    zIndex: 10,
    backgroundColor: "#FFF",
    borderRadius: wp(5),
    padding: wp(2),
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: hp(0.7),
  },
  title: {
    position: "absolute",
    top: hp(5),
    left:wp(5),
    fontSize: wp(6),
    fontWeight: "bold",
    color: "#228008",
  },
  slide: {
    width: wp(100),
    height: hp(70),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: wp(50),
    height: hp(25),
    borderRadius: wp(5),
    marginBottom: hp(2),
  },
  stepText: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(1),
  },
  description: {
    fontSize: wp(4),
    textAlign: "center",
    color: "#666",
    paddingHorizontal: wp(5),
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: hp(5),
  },
  dot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: "#ddd",
    marginHorizontal: wp(1),
  },
  activeDot: {
    backgroundColor: "#FFA500",
  },
});

export default OnboardingScreen;
