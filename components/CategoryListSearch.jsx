import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/theme";
const CategoryListSearch = ({
  categories,
  catergoryIndex,
  setCategoryIndex,
  setPanel,
}) => {
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => {
            setCategoryIndex(index);
            setPanel(item);
          }}
        >
          <Text
            style={[
              styles.categoryText,
              catergoryIndex === index && styles.categoryTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = {
  categoryContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 5,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.second,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.second,
  },
};

export default CategoryListSearch;
