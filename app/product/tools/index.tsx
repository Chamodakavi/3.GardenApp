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

import ProductCard from "../../../components/ProductCard";

import { seeds, tools } from "@/Data/Data";
import { collection, getDocs } from "firebase/firestore";
import { database } from "@/Data/FConfig";
import { SkypeIndicator } from "react-native-indicators";

const { height, width } = Dimensions.get("window");

export default function Seeds() {
  const [fbTools, setFbTools] = useState<{ id: string; [key: string]: any }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(database, "tools"));
        const toolsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFbTools(toolsArray);
      } catch (error) {
        console.error("Error fetching tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/farmone.png")}
      resizeMode="stretch"
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Tools{" "}
            <Text
              style={{
                color: "#228008",
              }}
            >
              and Equipments
            </Text>
          </Text>
          <Text style={styles.headerPara}>
            Nurture Your Garden, Nurture the Earth
          </Text>
        </View>

        <View style={styles.main}>
          <View style={{ width: wp(100), marginVertical: hp(1) }}>
            <View style={styles.containero}>
              {loading ? (
                <View
                  style={{
                    zIndex: 999,
                    position: "fixed",
                    top: hp(50),
                  }}
                >
                  <SkypeIndicator />
                </View>
              ) : (
                fbTools.map((tool) => (
                  <View style={styles.gridItem} key={tool.id}>
                    <ProductCard
                      id={tool.id}
                      title={tool.name}
                      para={tool.description}
                      price={tool.price}
                      image={tool.image}
                      key={tool.id}
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
