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
const Payment = ({ navigation }) => {
  const { colors } = useTheme();
  const StepData = [
    {
      title: "Reservation",
      active: false,
      success: true,
    },
    {
      title: "Payment",
      active: true,
      success: false,
    },
    {
      title: "Status",
      active: false,
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
              Payment Info
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
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={[GlobalStyleSheet.container]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                      tintColor: colors.title,
                    }}
                    source={require("../assets/icons/discount.png")}
                  />
                  <Text
                    style={{
                      ...FONTS.h6,
                      color: colors.title,
                      fontFamily: FONTS.bold,
                    }}
                  >
                    Offre bancaire
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 3,
                      width: 3,
                      borderRadius: 3,
                      backgroundColor: colors.text,
                      marginRight: 10,
                      opacity: 0.5,
                      marginTop: 8,
                    }}
                  />
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Réservez maintenant et économisez 10 % avec les cartes de
                    crédit et de débit Citi sur un montant minimum de Rs 5Dh.
                    générales applicables
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.background2,
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  paddingTop: 15,
                }}
              >
                <Text
                  style={{
                    ...FONTS.font,
                    color: colors.text,
                    fontFamily: FONTS.bold,
                  }}
                >
                  Options de paiement
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.gray,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setPaymentOption(paymentOption === "Cash" ? "" : "Cash")
                  }
                  style={[styles.list]}
                >
                  <Image
                    style={[styles.listImg, { tintColor: colors.title }]}
                    source={require("../assets/icons/cash.png")}
                  />
                  <Text style={[styles.listTitle, { color: colors.title }]}>
                    Cash Jusqu'à garer votre voiture(Cash)
                  </Text>
                  <FeatherIcon
                    color={colors.title}
                    name={"chevron-down"}
                    size={22}
                  />
                </TouchableOpacity>
                <Collapsible
                  collapsed={paymentOption === "Cash" ? false : true}
                >
                  {/* <Text style={{ textAlign:'center'}}>
                  Payez en argent liquide à la stationnement.
                  </Text> */}
                </Collapsible>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: COLORS.gray,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    setPaymentOption(paymentOption === "Credit" ? "" : "Credit")
                  }
                  style={[styles.list]}
                >
                  <Image
                    style={[styles.listImg, { tintColor: colors.title }]}
                    source={require("../assets/icons/card.png")}
                  />
                  <Text style={[styles.listTitle, { color: colors.title }]}>
                    Credit / Debit Card
                  </Text>
                  <FeatherIcon
                    color={colors.title}
                    name={"chevron-down"}
                    size={22}
                  />
                </TouchableOpacity>
                <Collapsible
                  collapsed={paymentOption === "Credit" ? false : true}
                >
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingBottom: 30,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.font,
                        color: colors.text,
                        marginBottom: 10,
                      }}
                    >
                      Veuillez vous assurer que votre carte peut être utilisée
                      pour les transactions en ligne.
                    </Text>
                    <View style={{ marginBottom: 15 }}>
                      <CustomInput placeholder="Numéro de carte" />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                      <CustomInput placeholder="Nom sur la carte" />
                    </View>
                    <View style={[GlobalStyleSheet.row]}>
                      <View style={[GlobalStyleSheet.col50]}>
                        <CustomInput placeholder="Valid Thru(MM/YY)" />
                      </View>
                      <View style={[GlobalStyleSheet.col50]}>
                        <CustomInput placeholder="CVV" />
                      </View>
                    </View>
                  </View>
                </Collapsible>
              </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container, {}]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <CustomButton
                    onPress={() => navigation.navigate("Status")}
                    title={"Réservez maintenant"}
                    color={COLORS.second}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Payment;

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
