import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AppState
} from "react-native";

export default function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [appState, setAppState] = useState(AppState.currentState);

  // 1️⃣ Chạy 1 lần khi mở app
  useEffect(() => {
    Alert.alert("Thông báo", "Ứng dụng đã khởi chạy");
  }, []);

  // 2️⃣ Lắng nghe AppState
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      setAppState(nextState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // 3️⃣ Thực hiện hành động khi phone thay đổi
  useEffect(() => {
    const cleaned = phone.replace(/\s/g, "");
    if (cleaned.length === 10) {
      console.log("Đã nhập đủ 10 số");
    }
  }, [phone]);

  const handleChangeText = (text) => {
    const cleaned = text.replace(/\D/g, "");

    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = cleaned.replace(/(\d{3})(\d+)/, "$1 $2");
    } else if (cleaned.length > 6) {
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    }

    setPhone(formatted);

    const regex = /^0\d{9}$/;
    if (cleaned.length === 10 && !regex.test(cleaned)) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    const cleaned = phone.replace(/\s/g, "");
    const regex = /^0\d{9}$/;

    if (!regex.test(cleaned)) {
      Alert.alert("Lỗi", "Số điện thoại không đúng định dạng. Vui lòng nhập lại");
    } else {
      Alert.alert("Thành công", "Số điện thoại hợp lệ");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Nhập số điện thoại</Text>

      <Text style={styles.desc}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChangeText}
      />

      {error !== "" && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <Text style={styles.appState}>App State: {appState}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: "600"
  },
  desc: {
    color: "gray",
    marginBottom: 15
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8
  },
  errorText: {
    color: "red",
    marginTop: 5
  },
  button: {
    backgroundColor: "#7B2FF7",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  appState: {
    marginTop: 30,
    color: "gray"
  }
});