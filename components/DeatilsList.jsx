import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { t } from "i18next";

const DeatilsList = ({ setPanel }) => {
  const [position, setPosition] = useState("About");
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setPanel("About");
          setPosition("About");
        }}
      >
        <View style={styles.categoryItem}>
          <Icon
            name={"info-circle"}
            size={15}
            style={
              position === "About"
                ? styles.categoryTextSelected
                : styles.categoryText
            }
          />
          <Text
            style={
              position === "About"
                ? styles.categoryTextSelected
                : styles.categoryText
            }
          >
            {t("À propos")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setPanel("Reviews");
          setPosition("Reviews");
        }}
      >
        <View style={styles.categoryItem}>
          <Icon
            name={"star"}
            size={15}
            style={
              position === "Reviews"
                ? styles.categoryTextSelected
                : styles.categoryText
            }
          />
          <Text
            style={
              position === "Reviews"
                ? styles.categoryTextSelected
                : styles.categoryText
            }
          >
            {t("Avis")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  categoryContainer: {
    flexDirection: "row",
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryText: {
    fontSize: SIZES.large,
    color: "gray",
    fontWeight: "bold",
    marginLeft: 5,
  },
  categoryTextSelected: {
    color: COLORS.second,
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginLeft: 5,
    paddingBottom: 5,
  },
};

export default DeatilsList;
