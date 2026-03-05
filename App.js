import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

/* ================= SIGN IN ================= */
function SignInScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
    if (phone.length === 10 && /^[0-9]+$/.test(phone)) {
      navigation.navigate("Home", { phone: phone });
    } else {
      Alert.alert("Lỗi", "Số điện thoại phải đủ 10 chữ số");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= HOME ================= */
function HomeScreen({ route, navigation }) {
  const phone = route?.params?.phone ?? "User";

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Xin chào 🎉</Text>
      <Text style={styles.phone}>{phone}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#E74C3C" }]}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    marginBottom: 30,
  },
});