import { View, Text } from "react-native";
import React from "react";
import i18n from "../utils/i18n";
import { t } from "i18next";
const OffreSearch = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("Offre Search En cours d'achévement")}</Text>
    </View>
  );
};

export default OffreSearch;
