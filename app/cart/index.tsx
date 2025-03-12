import CartCard from "@/components/CartCard";
import Footer from "@/components/Footer";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from "@/Data/FConfig";
import { Context } from "@/app/Context";

const { height, width } = Dimensions.get("window");

function index() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const context = useContext(Context);

  if (!context) {
    throw new Error("Context must be used within a ContextProvider");
  }

  const { userId } = context;

  const [items, setItems] = useState<{ id: string; [key: string]: any }[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!userId) {
          console.error("No userId found!");
          return;
        }

        const cartRef = collection(database, "users", userId, "cart");
        const querySnapshot = await getDocs(cartRef);

        if (querySnapshot.empty) {
          console.log("No items found in cart.");
          return;
        }

        const cartItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(cartItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    if (userId) {
      fetchItems();
    }
  }, [userId]);

  useEffect(() => {
    console.log("Updated Items:", items);
  }, [items]);

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(database, "users", userId, "cart", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log("Item deleted:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Cart <Text style={{ color: "#228008" }}>Items</Text>
          </Text>
          <Text style={styles.headerPara}>
            Nurture Your Garden, Nurture the Earth
          </Text>
        </View>

        {items.map((item) => {
          console.log("Item passed to CartCard:", item);
          return (
            <CartCard
              title={item.title}
              img={item.image}
              price={item.price}
              qty={item.quantity}
              key={item.id}
              id={item.id}
              onDelete={handleDeleteItem}
            />
          );
        })}
      </ScrollView>
      <Footer />
    </View>
  );
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F2E6",
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the ScrollView to take available space
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
});
