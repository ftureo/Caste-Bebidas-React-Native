import { Button } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

const Error = ({ message, textButton, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{message}</Text>
      <Button title={textButton} onPress={onRetry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Error;
