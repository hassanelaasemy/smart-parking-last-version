import { View, Text } from "react-native";
import React from "react";
import { t } from "i18next";
const HistoriqueSearch = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{t("Historique Search En cours d'achévement")}</Text>
    </View>
  );
};

export default HistoriqueSearch;
