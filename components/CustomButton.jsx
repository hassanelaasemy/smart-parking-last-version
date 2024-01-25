import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { View } from "react-native";

//------------------this component for Bottom
const CustomButton = (props) => {
  return (
    <View
      style={[
        {
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: props.btnLight ? 0 : props.disabled ? 0 : 0.3,
          shadowRadius: 5,
        },
        Platform.OS === "ios" && {
          backgroundColor: COLORS.primary,
          borderRadius: SIZES.radius,
        },
      ]}
    >
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={0.75}
        style={[
          { ...styles.button },
          props.btnSm && { height: 40 },
          props.color && { backgroundColor: props.color },
          props.btnLight && {
            backgroundColor: "#E6E6E6",
            elevation: 0,
            shadowOpacity: 0,
          },
          props.disabled && {
            backgroundColor: "#C9C9C9",
            elevation: 0,
            shadowOpacity: 0,
          },
        ]}
        onPress={() => (props.onPress ? props.onPress() : "")}
      >
        <Text
          style={[
            {
              fontFamily: FONTS.bold,
              fontSize: SIZES.medium,
              color: COLORS.white,
            },
            props.btnLight && { color: "#646464" },
          ]}
        >
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.second,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});

export default CustomButton;
