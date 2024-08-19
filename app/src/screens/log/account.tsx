import colors from "@/assets/colors";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Register from "./register";
import ForgotPass from "./forgotPass";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../../store/store";
import { fetchLogin } from "../../slices/account/loginSlice";
import AccountPage from "./accountPage";

const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loginData = useSelector((state: RootState) => state.login);
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");

  const [isAcoVisible, setIsAcoVisible] = useState(true);
  const [isRegVisible, setIsRegVisible] = useState(false);
  const [isForVisible, setIsForVisible] = useState(false);
  const [isAcoPagVisible, setIsAcoPagVisible] = useState(false);
  const errorMessage = loginData.message;
  const [errorPart] = errorMessage.split('!');

  const regClicked = () => {
    setIsAcoVisible(!isAcoVisible);
    setIsRegVisible(!isRegVisible);
  }
  const forClicked = () => {
    setIsAcoVisible(!isAcoVisible);
    setIsForVisible(!isForVisible);
  }

  const handleLogin = () => {
    dispatch(fetchLogin({ email: email2, password: password2 }) as any);
    if (loginData.status == "success") {
      setIsAcoPagVisible(!isAcoPagVisible);
      setIsAcoVisible(!isAcoVisible);
    } else {

    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isAcoVisible && (
        <ScrollView contentContainerStyle={{ flexGrow: 0 }}>
          <View style={styles.container}>
            <View style={{ height: 180 }}>
              <Image
                source={require("../../../../assets/images/logo2.png")}
                style={styles.image}
              />
            </View>

            <View style={styles.logContainer}>
              <FontAwesome6 name="user-large" size={36} color={colors.primary} />
              <TextInput value={email2} onChangeText={setEmail2} style={styles.input} placeholder="E-Posta" />
            </View>
            <View style={styles.logContainer2}>
              <MaterialCommunityIcons
                name="key-variant"
                size={36}
                color={colors.primary}
              />
              <TextInput value={password2} onChangeText={setPassword2} style={styles.input} placeholder="Şifre" />
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button1}>
              <Text style={{ fontSize: 24, color: "white", textAlign: "center", justifyContent: "center" }}>
                Giriş Yap
              </Text>
            </TouchableOpacity>
            {loginData.status == "error" && (
              <Text style={{ color: "red" }}>{errorPart.trim()}</Text>
            )}

            <TouchableOpacity onPress={regClicked} style={styles.button2}>
              <Text style={{ fontSize: 24, color: "#DE3459", textAlign: "center" }}>
                Kayıt Ol
              </Text>
            </TouchableOpacity>
            <Text onPress={forClicked} style={styles.bottomText}>Şifremi Unuttum</Text>
          </View>
        </ScrollView>
      )}
      {isAcoPagVisible && (
        <AccountPage
          data={loginData.data ?? { name: '', surname: '', telephone: '', email: '' }}
          isAcoPagVisible={isAcoPagVisible}
          isAcoVisible={isAcoVisible}
          setIsAcoPagVisible={setIsAcoPagVisible}
          setIsAcoVisible={setIsAcoVisible}
        />
      )}
      {isAcoVisible && (
        <View style={{ flex: 0.7, backgroundColor: colors.background }}></View>
      )}
      {isRegVisible && (
        <Provider store={store}>
          <Register setIsRegVisible={setIsRegVisible} setIsAcoVisible={setIsAcoVisible} isAcoVisible={isAcoVisible} isRegVisible={isRegVisible} />
        </Provider>
      )}
      {isForVisible && (
        <ForgotPass setIsForVisible={setIsForVisible} setIsAcoVisible={setIsAcoVisible} isAcoVisible={isAcoVisible} isForVisible={isForVisible} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
  },
  image: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  logContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logContainer2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  input: {
    width: "85%",
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: colors.gray,
    marginBottom: 10,
    marginLeft: 10,
  },
  button1: {
    backgroundColor: colors.primary,
    width: "85%",
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 40,
  },
  button2: {
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.background,
    width: "85%",
    height: 50,
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 10,
    marginLeft: 40,
  },
  bottomText: {
    color: colors.gray,
    marginTop: 10,
    fontSize: 14,
    marginLeft: -200
  }
});
export default Account;
