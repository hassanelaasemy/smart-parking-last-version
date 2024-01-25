import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "i18next";
import { StyleSheet } from "react-native";

//----------------this component for  displaying parking information in a callout
const ParkingCallout = ({ name, price, rating, capacity }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          elevation: 3, // Add elevation to create a shadow effect
          backgroundColor: COLORS.white,
          borderRadius: 18,
          overflow: "hidden",
          marginBottom: 15,
        }}
      >
        <View
          style={[
            {
              flexDirection: "row",
              backgroundColor: COLORS.white,
              borderRadius: 18,
              width: 260,
            },
          ]}
        >
          <View
            style={{
              width: "48%",
              paddingHorizontal: 8,
              paddingVertical: 5,
            }}
          >
            <View>
              <Svg
                style={{
                  width: "100%",
                  height: 100,
                }}
              >
                <ImageSvg
                  width={"100%"}
                  height={"100%"}
                  href={require("../assets/images/parking3.jpg")}
                />
              </Svg>
            </View>
          </View>

          <View style={{ paddingRight: 15, paddingVertical: 15 }}>
            <TouchableOpacity
              onPress={() => navigate && navigation.navigate(navigate)}
            >
              <Text
                style={{
                  ...FONTS.h6,
                  color: colors.title,
                  marginBottom: 3,
                  fontFamily: FONTS.bold,
                }}
              >
                {name}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.second,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 8,
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontBold,
                    color: COLORS.black,
                  }}
                >
                  {capacity} place
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="star" size={18} color={COLORS.yellow} />

                <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontBold,
                    color: COLORS.black,
                  }}
                >
                  {rating}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    color: colors.title,
                    marginRight: 3,
                  }}
                >
                  5 dh
                </Text>
                <Text
                  style={{
                    ...FONTS.h6,
                    color: colors.title,
                    lineHeight: 22,
                  }}
                >
                  /h
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="brightness-6"
                    size={18}
                    color={COLORS.second}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="local-car-wash"
                    size={18}
                    color={COLORS.second}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="ev-station"
                    size={18}
                    color={COLORS.second}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> {t("Reserve")} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ParkingCallout;

const styles = StyleSheet.create({
  button: {
    height: 25,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.second,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});
