// import React from "react";
// import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
// import Footer from "@/components/Footer"; // Ensure the path is correct

// // Explicitly type and define the children prop
// export default function RootLayout({ children }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* ScrollView to allow for scrollable content */}
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Render the page content dynamically */}
//         <View style={styles.pageContent}>{children}</View>
//       </ScrollView>

//       {/* Footer will always appear at the bottom */}
//       <Footer />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF", // Set the background color for your app
//   },
//   scrollContainer: {
//     flexGrow: 1, // Allow ScrollView content to expand
//     justifyContent: "space-between", // Ensure content is spaced correctly
//   },
//   pageContent: {
//     paddingBottom: 60, // Adjust this based on the footer height to avoid overlap
//   },
// });
