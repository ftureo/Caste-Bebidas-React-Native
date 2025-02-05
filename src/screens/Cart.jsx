import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../app/services/orders";
import { deleteCart } from "../features/cart/cartSlice";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerAddOrder] = usePostOrderMutation();

  const handlerAddOrder = async () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      createdAt,
      ...cart,
    };
    triggerAddOrder({ localId, order });
    dispatch(deleteCart());
    navigation.navigate("OrdersStack");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.confirmContainer}>
        <Pressable onPress={handlerAddOrder}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </Pressable>
        <Text style={styles.confirmText}>Total: ${cart.total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 80,
  },
  confirmContainer: {
    flexDirection: "row",
    backgroundColor: "gray",
    padding: 25,
    justifyContent: "space-between",
  },
  confirmText: {
    fontFamily: "Poppins",
    fontSize: 18,
    color: "white",
  },
});
