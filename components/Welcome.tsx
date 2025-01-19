import React from "react";
import { StyleSheet, View, Dimensions, Image, ScrollView, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const { height, width } = Dimensions.get("window");

export default function Welcome() {
  return (
    
       <View style={styles.container}>
      
              <View style={styles.header}/>
      
              <View style={styles.main}>
                  <View style={styles.section1}>
                    <Text style={styles.txt}>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis mollitia optio natus?
                     
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti consequuntur quam dolorem dicta! Cum dolorum nobis corrupti dolorem sapiente sit, omnis ea animi! Facere, fugiat ducimus. Nostrum nisi temporibus, eum animi pariatur ex officia ipsam explicabo distinctio quae error eveniet deleniti? </Text>
                  </View>
                  <View style={styles.section2}></View>
              </View>
      
              <View style={styles.footer}/>
      
          </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  header: {
    height:hp(15),
    backgroundColor:'tomato',
  },
  main: {
    height:hp(70),
    display:'flex',
    flexDirection:'row',
  },
  section1: {
    flex:2,
    backgroundColor:'orange',

  },
  section2: {
    flex:1,
    backgroundColor:'skyblue',
  },
  footer: {
    height:hp(15),
    backgroundColor:'lightgreen',
  },
  txt:{
    fontSize:wp(4),
  }
})