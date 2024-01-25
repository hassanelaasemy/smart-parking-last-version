import { View, Text } from "react-native";
import React from "react";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { COLORS, FONTS } from "../constants/theme";
import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
// Import the 't' function from the "i18next" library for internationalization (i18n).
import { t } from "i18next";
const AboutDeatails = ({ parkData }) => {
  const { colors } = useTheme();
  return (
    <>
      <View style={GlobalStyleSheet.container}>
        {/*--------------------name and rating: */}
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ ...FONTS.h6, color: colors.title }}>
              {parkData.name}
            </Text>
            <Text
              style={{
                ...FONTS.font,
                color: colors.textLight,
                marginBottom: 8,
              }}
            >
              {parkData.address}
            </Text>
          </View>
          <Text style={{ ...FONTS.h4, color: COLORS.black }}>
            {parkData.rating}
          </Text>
          <Icon name="star" size={20} color={COLORS.yellow} />
        </View>
        {/*------------------------services: */}
        <View
          style={{
            elevation: 3, // Add elevation to create a shadow effect
            backgroundColor: COLORS.white,
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 15,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              paddingHorizontal: 15,
              paddingVertical: 18,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderColor: colors.borderColor,
                paddingBottom: 15,
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
                  size={20}
                  color={COLORS.second}
                />

                <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontBold,
                    color: colors.title,
                  }}
                >
                  Shadow
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="local-car-wash"
                  size={20}
                  color={COLORS.second}
                />

                <Text
                  style={{
                    ...FONTS.fontSm,
                    ...FONTS.fontBold,
                    color: colors.title,
                  }}
                >
                  Wash car
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="ev-station"
                  size={20}
                  color={COLORS.second}
                />

                <Text
                  style={{
                    ...FONTS.fofontSmnt,
                    ...FONTS.fontBold,
                    color: colors.title,
                  }}
                >
                  Electric
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 15,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                  A partir de
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    ...FONTS.fontBold,
                    color: colors.title,
                  }}
                >
                  5dh
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                  {parkData.address}
                </Text>
                {/* <Text
              style={{
                ...FONTS.font,
                ...FONTS.fontBold,
                color: colors.title,
              }}
            >
              kota
            </Text> */}
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ ...FONTS.fontSm, color: colors.text }}>
                  {t("Date de publication")}
                </Text>
                <Text
                  style={{
                    ...FONTS.font,
                    ...FONTS.fontBold,
                    color: colors.title,
                  }}
                >
                  05-May-2022
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/*-----------------------Description: */}
        <Text
          style={{
            ...FONTS.h6,
            color: colors.title,
            marginTop: 20,
            marginBottom: 8,
          }}
        >
          {t("Description")}
        </Text>
        <View
          style={{
            elevation: 3, // Add elevation to create a shadow effect
            backgroundColor: COLORS.white,
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 15,
          }}
        >
          <View
            style={[
              {
                backgroundColor: colors.cardBg,
                paddingHorizontal: 15,
                paddingVertical: 15,
                borderRadius: 10,
              },
            ]}
          >
            <View>
              <Text style={{ ...FONTS.font, color: colors.title }}>
                {parkData.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AboutDeatails;
