import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
// -------------------------- translation import from folder utils :
import "../utils/i18n";
import { useTranslation } from "react-i18next";
import { FONTS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const LanguageModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  //---Access the translation functions 't' and 'i18n' using the useTranslation hook from i18next.
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  //--------Changes the application language, updates the UI, and stores the selected language in AsyncStorage.
  const changeLanguage = async (language) => {
    setIsLoading(true); // Set loading to true
    setSelectedLanguage(language);
    i18n.changeLanguage(language); // Update the language
    await AsyncStorage.setItem("selectedLanguage", language); // Store selected language
    setIsLoading(false); // Set loading to false
  };
  //----Handles the change of the application language, closes the language selection modal,
  //----and navigates to the "Home" screen.
  const handleLanguageChange = async (language) => {
    await changeLanguage(language);
    onClose();
    navigation.navigate("Home");
  };

  //----Use effect to retrieve and set the selected language from AsyncStorage,
  //---updating the application language accordingly.
  useEffect(() => {
    const getSelectedLanguage = async () => {
      const language = await AsyncStorage.getItem("selectedLanguage");
      setSelectedLanguage(language || i18n.language);
      i18n.changeLanguage(language || i18n.language); // Update the language
    };
    getSelectedLanguage();
  }, [i18n.language]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t("Choisissez une langue")}</Text>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => handleLanguageChange("en")}
          >
            <Text style={styles.languageText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => handleLanguageChange("ar")}
          >
            <Text style={styles.languageText}>العربية</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageOption}
            onPress={() => handleLanguageChange("fr")}
          >
            <Text style={styles.languageText}>Français</Text>
          </TouchableOpacity>
          {/* Add more language options as needed */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} color="#49DFEA" />
            </View>
          ) : (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>{t("Annuler")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    textAlign: "center",
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  languageText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});
export default LanguageModal;
