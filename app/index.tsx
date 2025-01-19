
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import LoginPage from "@/components/LoginPage";

import Welcome from "@/components/Welcome";


export default function Index() {
  return (
    <View style={styles.container}>
    
    
      <LoginPage/>
  
    

      <StatusBar style="light" backgroundColor="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    color:'black',
  },
});