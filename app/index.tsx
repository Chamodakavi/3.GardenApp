
import { StyleSheet, View } from "react-native";
import LoginPage from "@/components/LoginPage";



export default function Index() {
  return (
    <View style={styles.container}>
    
    
      <LoginPage/>
  
    

     
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