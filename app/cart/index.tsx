import CartCard from "@/components/CartCard";
import Footer from "@/components/Footer";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { database } from "@/Data/FConfig";
import { Context } from "@/app/Context";
import { SkypeIndicator } from "react-native-indicators";

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

  const { userId, order, setOrder } = context;

  const [items, setItems] = useState<{ id: string; [key: string]: any }[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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

  const handleOrder = async (
    userId: string,
    aaId: string,
    itemId: string,
    itemDetails: any
  ) => {
    try {
      console.log("Searching for Item ID:", itemId);

      // Reference to Firestore documents in both collections
      const seedsRef = doc(database, "seeds", itemId);
      const toolsRef = doc(database, "tools", itemId);

      // Fetch documents from both collections
      const [seedsSnap, toolsSnap] = await Promise.all([
        getDoc(seedsRef),
        getDoc(toolsRef),
      ]);

      let savedData = null;

      if (seedsSnap.exists()) {
        savedData = { id: seedsSnap.id, ...seedsSnap.data() };
        console.log("Found in seeds:", savedData);
      } else if (toolsSnap.exists()) {
        savedData = { id: toolsSnap.id, ...toolsSnap.data() };
        console.log("Found in tools:", savedData);
      } else {
        console.log("No matching document found for Item ID:", itemId);
        return;
      }

      // Ensure additional details are included
      const orderData = {
        id: savedData.id,
        title: itemDetails.title,
        image: itemDetails.img,
        price: itemDetails.price,
        quantity: itemDetails.qty,
        timestamp: serverTimestamp(), // Firestore timestamp
      };

      // Reference to the orders subcollection inside the user's document
      const ordersRef = collection(database, "users", userId, "order");

      // Add the found data to the orders subcollection
      const orderDocRef = await addDoc(ordersRef, orderData);

      console.log("Saved Data to orders subcollection:", {
        ...orderData,
        id: orderDocRef.id,
      });
      console.log(aaId);
      handleDeleteItem(aaId);

      return { ...orderData, id: orderDocRef.id };
    } catch (error) {
      console.error("Error processing order:", error);
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

        {loading ? (
          <View
            style={{
              zIndex: 999,
              position: "relative",
              top: hp(30),
            }}
          >
            <SkypeIndicator />
          </View>
        ) : (
          items.map((item) => (
            <CartCard
              title={item.title}
              img={item.image}
              price={item.price}
              qty={item.quantity}
              key={item.id}
              id={item.id}
              productId={item.productId}
              onDelete={handleDeleteItem}
              onOrder={() =>
                handleOrder(userId, item.id, item.productId, {
                  title: item.title,
                  img: item.image,
                  price: item.price,
                  qty: item.quantity,
                })
              }
            />
          ))
        )}
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
