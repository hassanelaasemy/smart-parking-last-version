import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { COLORS, FONTS, SIZES, ICONS } from "../constants/theme";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Icon } from "react-native-elements";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const [passwordShow, setPasswordShow] = useState(true);
  const handndleShowPassword = () => {
    setPasswordShow(!passwordShow);
  };
  const navigation = useNavigation();
  const [newfirstName, setnewfirstName] = useState("");
  const [newlastName, setnewlastName] = useState("");
  const [newemail, setnewemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [loading, setLoading] = useState(false);
  //-----------------------------validation input:
  const [nameError, setNameError] = useState("");
  const [lastnameError, selastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateName = (name) => {
    if (!name) {
      setNameError("Last Name is required");
      return false;
    }
    setNameError("");
    return true;
  };
  const validateLastName = (name) => {
    if (!name) {
      selastnameError("First Name is required");
      return false;
    }
    selastnameError("");
    return true;
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };
  //----------------- Handles the registration process for a new user.
  // Validates input fields (first name, last name, email, password),
  // and sends a POST request to the server for user registration.
  // If registration is successful, triggers the login process.
  const handleRegister = () => {
    setLoading(true);
    // Validate input fields (first name, last name, email, password)
    const isNameValid = validateName(newfirstName);
    const isLastnameValid = validateLastName(newlastName);
    const isEmailValid = validateEmail(newemail);
    const isPasswordValid = validatePassword(newpassword);
    if (isNameValid && isEmailValid && isPasswordValid && isLastnameValid) {
      axios
        .post("http://54.193.180.3:8080/v1/auth/register", {
          metaData: {},
          register: {
            firstName: newfirstName,
            lastName: newlastName,
            email: newemail,
            password: newpassword,
          },
          timeStamps: new Date(),
        })
        .then((response) => {
          handleLogin();
        });
    } else {
      setLoading(false);
    }
  };
  //Handles the login process for a user.
  //Constructs a login request object with email and password,
  //sends a POST request to the server for user authentication.
  //If authentication is successful, stores access and refresh tokens,
  //and user data in AsyncStorage, and navigates to the "Home" screen.
  const handleLogin = () => {
    const loginrequest = {
      metaData: {},
      login: {
        email: newemail,
        password: newpassword,
      },
      timeStamps: new Date(),
    };
    axios
      .post("http://54.193.180.3:8080/v1/auth/login", loginrequest)
      .then(async (response) => {
        // Store access and refresh tokens, and user data in AsyncStorage
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        // Navigate to the "Home" screen after successful login
        navigation.navigate("Home");
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Entypo
            style={{ marginTop: 25 }}
            name="chevron-left"
            size={35}
            color="#49DFEA"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: COLORS.light }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              minHeight: 200,
            }}
          >
            <Image
              style={{
                width: 190,
                height: 190,
                marginBottom: 40,
                resizeMode: "contain",
              }}
              source={require("../assets/images/logo.png")}
            />
            <Image
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                resizeMode: "stretch",
                height: 80,
                tintColor: COLORS.white,
              }}
              source={require("../assets/images/bg-shape.png")}
            />
          </View>
          <View style={{ backgroundColor: COLORS.white }}>
            <View style={GlobalStyleSheet.container}>
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={[
                    {
                      textAlign: "center",
                      color: colors.title,
                      fontSize: SIZES.xLarge,
                    },
                  ]}
                >
                  Créer un compte
                </Text>
                <Text
                  style={[
                    FONTS.font,
                    { textAlign: "center", color: colors.text },
                  ]}
                >
                  Bienvenue à Smart Parking ! Créez un compte pour profiter de
                  toutes les fonctionnalités de notre application.
                </Text>
              </View>

              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <Icon name="person" size={25} color={COLORS.second} />
                </View>
                <TextInput
                  style={[
                    styles.inputStyle,
                    { borderColor: COLORS.gray, color: colors.title },
                  ]}
                  placeholder="Premon"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(text) => {
                    setnewlastName(text);
                    selastnameError("");
                  }}
                />
                {lastnameError ? (
                  <Text style={styles.error}>{lastnameError}</Text>
                ) : null}
              </View>

              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <Icon name="person" size={25} color={COLORS.second} />
                </View>
                <TextInput
                  style={[
                    styles.inputStyle,
                    { borderColor: COLORS.gray, color: colors.title },
                  ]}
                  placeholder="Nom"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(text) => {
                    setnewfirstName(text);
                    setNameError("");
                  }}
                />

                {nameError ? (
                  <Text style={styles.error}>{nameError}</Text>
                ) : null}
              </View>

              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <Icon name="email" size={25} color={COLORS.second} />
                </View>
                <TextInput
                  style={[
                    styles.inputStyle,
                    { borderColor: COLORS.gray, color: colors.title },
                  ]}
                  placeholder="Enter email"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(text) => {
                    setnewemail(text);
                    setEmailError("");
                  }}
                />
                {emailError ? (
                  <Text style={styles.error}>{emailError}</Text>
                ) : null}
              </View>

              <View style={{ marginBottom: 15 }}>
                <View style={styles.inputIcon}>
                  <Icon name="lock" size={25} color={COLORS.second} />
                </View>
                <TextInput
                  secureTextEntry={passwordShow}
                  style={[
                    styles.inputStyle,
                    { borderColor: COLORS.gray, color: colors.title },
                  ]}
                  placeholder="Mot de pass"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={(text) => {
                    setnewpassword(text);
                    setPasswordError("");
                  }}
                />
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Password"
                  accessibilityHint="Password show and hidden"
                  onPress={() => handndleShowPassword()}
                  style={styles.eyeIcon}
                >
                  <SvgXml xml={passwordShow ? ICONS.eyeClose : ICONS.eyeOpen} />
                </TouchableOpacity>
                {passwordError ? (
                  <Text style={styles.error}>{passwordError}</Text>
                ) : null}
              </View>

              <View style={{ paddingBottom: 10 }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.buttonText}>S'inscrire</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                <Text style={[FONTS.font, { color: colors.text }]}>
                  Vous avez déjà un compte?
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text
                    style={[
                      FONTS.fontLg,
                      {
                        color: COLORS.black,
                        textDecorationLine: "underline",
                      },
                    ]}
                  >
                    Connectez-vous
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: FONTS.regular,
    height: 50,
    paddingLeft: 60,
    borderWidth: 1,
    borderRadius: SIZES.radius,
  },
  inputIcon: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 40,
    borderRadius: 10,
    position: "absolute",
    left: 5,
    top: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    zIndex: 1,
    top: 0,
  },
  error: {
    color: "red",
  },
  button: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.second,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
});
