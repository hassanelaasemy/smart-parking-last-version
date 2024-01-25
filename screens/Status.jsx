import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS, SIZES, IMAGES } from "../constants/theme";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import CustomInput from "../components/Input";
import CustomButton from "../components/CustomButton";
const Status = ({ navigation }) => {
  const { colors } = useTheme();
  const StepData = [
    {
      title: "Reservation",
      active: false,
      success: true,
    },
    {
      title: "Payment",
      active: false,
      success: true,
    },
    {
      title: "Status",
      active: true,
      success: false,
    },
  ];
  const [paymentOption, setPaymentOption] = useState("");
  const [payActive, setPayActive] = useState("");
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.light,
          }}
        >
          <View
            style={{
              height: 55,
              backgroundColor: COLORS.light,
              flexDirection: "row",
              alignItems: "center",
              ...GlobalStyleSheet.shadow,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 55,
                width: 55,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <FeatherIcon
                color={COLORS.second}
                name={"arrow-left"}
                size={22}
              />
            </TouchableOpacity>
            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }}>
              Reservation status
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
            }}
          >
            {StepData.map((data, index) => {
              return (
                <View key={index} style={[styles.stepItem]}>
                  <View
                    style={[
                      styles.stepIcon,
                      {
                        backgroundColor: colors.cardBg,
                      },
                      data.active && {
                        backgroundColor: COLORS.second,
                      },
                      data.success && {
                        backgroundColor: COLORS.second,
                      },
                    ]}
                  >
                    {data.success ? (
                      <FeatherIcon
                        color={COLORS.white}
                        size={16}
                        name="check"
                      />
                    ) : (
                      <Text
                        style={[
                          {
                            ...FONTS.font,
                            ...FONTS.fontBold,
                            color: colors.title,
                            marginBottom: 2,
                          },
                          data.active && {
                            color: COLORS.white,
                          },
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: colors.title,
                    }}
                  >
                    {data.title}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.cardBg,
            }}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginBottom: 15,
                  }}
                  source={require("../assets/icons/check.png")}
                />
                <Text style={{ ...FONTS.h5, color: colors.title }}>
                  Paiement réussi
                </Text>
              </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container]}>
              <CustomButton
                onPress={() => navigation.navigate("Home")}
                title={"Retour à la page d'accueil"}
                color={COLORS.second}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Status;

const styles = StyleSheet.create({
  stepItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepIcon: {
    height: 30,
    width: 30,
    borderRadius: 35,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.second,
  },
  list: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  listImg: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 12,
  },
  listTitle: {
    ...FONTS.font,
    ...FONTS.fontBold,
    flex: 1,
  },
});
