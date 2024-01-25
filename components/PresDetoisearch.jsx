import { View, Text } from "react-native";
import React from "react";
import i18n from "../utils/i18n";
import { t } from "i18next";
const PresDetoisearch = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("Pres De toi search En cours d'achévement")}</Text>
    </View>
  );
};

export default PresDetoisearch;
