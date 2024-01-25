import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import profile from "../assets/images/header.jpeg";
import LanguageModal from "../components/LanguageModal";
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const SettingScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //-----Use effect to check if a user is logged in by retrieving the access token from AsyncStorage.
  //--------If the access token exists, set 'isLoggedIn' state to true; otherwise, set it to false.
  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((accessToken) => {
      if (accessToken !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  const navigateToSearch = () => {
    navigation.navigate("Search");
  };
  const navigateToSupport = () => {
    Linking.openURL("mailto:elaasemyhassan01@gmail.com");
  };
  const NavigateToprofile = () => {
    navigation.navigate("Profile");
  };
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };
  const handleLogOut = () => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };
  const accountItems = [
    { icon: "home", text: t("Accueil"), action: navigateToHome },
    isLoggedIn
      ? {
          icon: "person-outline",
          text: t("Profile"),
          action: () => NavigateToprofile(),
        }
      : { icon: "person-outline", text: t("Profile"), action: navigateToLogin },
    { icon: "search", text: t("Recherche"), action: navigateToSearch },
    // Add more items as needed
  ];

  const cacheAndCellularItems = [
    {
      icon: "history",
      text: t("Histoire"),
      action: () => console.log("Histoire"),
    },
    {
      icon: "credit-card",
      text: t("Mon abonnement"),
      action: () => console.log("credit-card"),
    },
    {
      icon: "favorite",
      text: t("Favori"),
      action: () => navigation.navigate("Favorite"),
    },
  ];

  const supportItems = [
    {
      icon: "language",
      text: t("Langue"),
      action: () => setLanguageModalVisible(true),
    },
    {
      icon: "contact-mail",
      text: t("Contactez-nous"),
      action: navigateToSupport,
    },
    {
      icon: "info-outline",
      text: t("Termes et Conditions"),
      action: () => console.log("Termes et Conditions"),
    },
    {
      icon: "star",
      text: t("Èvaluer l'application"),
      action: () => console.log("Èvaluer l'application"),
    },
  ];
  const actionsItems = [
    {
      icon: "outlined-flag",
      text: t("Signaler un problème"),
      action: () => console.log("Signaler un problème"),
    },
    isLoggedIn
      ? {
          icon: "logout",
          text: t("Se déconnecter"),
          action: () => handleLogOut(),
        }
      : { icon: "login", text: t("Se connecter"), action: navigateToLogin },
  ];
  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 10,
        backgroundColor: COLORS.white,
        ...(i18n.language === "ar"
          ? {
              flexDirection: "row-reverse",
            }
          : {}),

        // marginLeft: 36,
      }}
    >
      <MaterialIcons name={icon} size={25} color="black" />
      <Text
        style={{
          ...(i18n.language === "ar"
            ? {
                marginRight: 36,
              }
            : {
                marginLeft: 36,
              }),
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}
        {""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar />
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}> {t("Paramètres")} </Text>
        <Image source={profile} style={styles.profileImage} />
      </View>
      <ScrollView
        style={{ marginHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <LanguageModal
          visible={isLanguageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
          onSelectLanguage={(language) => {
            setLanguageModalVisible(false);
          }}
        />

        {/* Account Settings */}
        <View style={{ marginBottom: 5 }}>
          {/* <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text> */}
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        {/* information utilisatuer */}
        <View style={{ marginBottom: 5 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            {t("Informations utilisateur")}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* App*/}
        <View style={{ marginBottom: 5 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>{t("App")}</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        {/* Actions Settings */}
        <View style={{ marginBottom: 5 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            {t("Actions")}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SettingScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
    // marginTop:2
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    color: "#808080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
