import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface OrderNotificationProps {
  isVisible: boolean;
  onHide: () => void;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({
  isVisible,
  onHide,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      // Hide notification after 2 seconds
      setTimeout(() => {
        onHide();
      }, 2000);
    } else {
      // Fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[styles.notificationContainer, { opacity: fadeAnim }]}
    >
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Item successfully ordered!</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: hp(10),
    left: wp(5),
    right: wp(5),
    zIndex: 999,
  },
  notification: {
    backgroundColor: "#228008",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  notificationText: {
    color: "#fff",
    fontSize: wp(4),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OrderNotification;
