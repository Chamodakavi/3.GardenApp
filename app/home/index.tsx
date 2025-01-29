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

const { height, width } = Dimensions.get("window");

export default function Home() {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/farmone.png")}
      resizeMode="stretch"
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Welcome to{" "}
            <Text
              style={{
                color: "#228008",
              }}
            >
              FarmOwn
            </Text>
          </Text>
          <Text style={styles.headerPara}>
            Nurture Your Garden, Nurture the Earth
          </Text>
        </View>

        <View style={styles.main}>
          <View style={{ width: wp(90), marginVertical: hp(1) }}>
            <Text style={styles.title}>Why Choose FarmOwn ?</Text>

            <View style={{ marginVertical: hp(2) }}>
              <View style={styles.HStack}>
                <Image
                  source={require("../../assets/images/Image.png")}
                  style={styles.fimg}
                  resizeMode="cover"
                />
                <Text style={styles.para}>
                  Innovative tools for sustainable agriculture practices.
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: hp(2) }}>
              <View style={styles.HStack}>
                <Image
                  source={require("../../assets/images/Image (1).png")}
                  style={styles.fimg}
                  resizeMode="cover"
                />
                <Text style={styles.para}>
                  Innovative tools for sustainable agriculture practices.
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: hp(2) }}>
              <View style={styles.HStack}>
                <Image
                  source={require("../../assets/images/Image (2).png")}
                  style={styles.fimg}
                  resizeMode="cover"
                />
                <Text style={styles.para}>
                  Innovative tools for sustainable agriculture practices.
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: wp(90), marginVertical: hp(1) }}>
            <Text style={styles.title}> For Those Who Grow</Text>

            <View style={styles.containero}>
              {[
                { name: "Organic Seeds", link: "/product/organic" },
                { name: "Tools and Equipments", link: "/product/tools" },
                { name: "Sustainable Way of Life", link: "/swl" },
                // { name: "Discover Us", link: "/" },
              ].map((item, index) => (
                <Link key={index} href={item.link} style={{margin:wp(3)}}>
                  <View style={styles.gridItem}>
                    <Text style={styles.gridText}>{item.name}</Text>
                  </View>
                </Link>
              ))}
            </View>
          </View>

          <View style={{ width: wp(90), marginVertical: hp(1) }}>
            <Text style={styles.title}> Testimonials</Text>

            <View style={styles.quote}>
              <Text style={styles.qH}>
                "FarmOwn has transformed the way I approach gardening. IT's a
                gamechanger!"
              </Text>
              <Text>-Alex Farmer-</Text>
            </View>

            <View style={styles.quote}>
              <Text style={styles.qH}>
                "FarmOwn has transformed the way I approach gardening. IT's a
                gamechanger!"
              </Text>
              <Text>-Sarah Doe-</Text>
            </View>

            <View style={styles.quote}>
              <Text style={styles.qH}>
                "FarmOwn has transformed the way I approach gardening. IT's a
                gamechanger!"
              </Text>
              <Text>-John Smith-</Text>
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
  },
  headerText: {
    fontSize: wp(7),
    textAlign: "center",
    fontWeight: "bold",
  },
  headerPara: {
    fontSize: wp(3.2),
    textAlign: "center",
  },
  main: {
    // height: hp(90),
    flex: 1,
    paddingHorizontal: hp(3),
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
    padding: wp(1),
  },
  gridItem: {
    width: Dimensions.get("window").width / 3, // Half of screen width with some spacing
    height: hp(15),
    backgroundColor: "#228008",
    margin: hp(4),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: wp(3),
  },
  gridText: {
    color: "white",
    fontSize: wp(4),
  },
});
