import Footer from "@/components/Footer";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
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

import { instructions } from "@/Data/Data";
import { database } from "@/Data/FConfig";

import PlantCard from "../../components/PlantCard";
import { collection, getDocs } from "firebase/firestore";
import { SkypeIndicator } from "react-native-indicators";

const { height, width } = Dimensions.get("window");

export default function SWL() {
  const [fbInstructions, setfbInstructions] = useState<
    { id: string; [key: string]: any }[]
  >([]);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(database, "instructions")
        );
        const toolsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setfbInstructions(toolsArray);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchInstructions();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/farmone.png")}
      resizeMode="stretch"
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Sustainable{" "}
            <Text
              style={{
                color: "#228008",
              }}
            >
              Way of Life
            </Text>
          </Text>
          <Text style={styles.headerPara}>
            Don't just plant a seed, plant a dream. Learn the art of
            cultivation, and watch your vision flourish.
          </Text>
        </View>

        <View style={styles.main}>
          <View style={{ width: wp(100), marginVertical: hp(1) }}>
            <View style={styles.containero}>
              {fbInstructions.length === 0 ? (
                <View style={styles.loadingContainer}>
                  <SkypeIndicator size={40} color="black" />
                </View>
              ) : (
                fbInstructions.map((item, index) => (
                  <View style={styles.gridItem} key={item.id || index}>
                    <PlantCard
                      index={index}
                      name={item.name}
                      image={item.image}
                      guide={item.guide}
                    />
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <Footer />
    </ImageBackground>
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
    fontSize: wp(3.9),
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: hp(80), // Adjust as needed
  },
});
