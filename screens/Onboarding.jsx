import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import CustomButton from "../components/CustomButton";
import { Entypo } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
//------------------welcomme screen
const DATA = [{}, {}, {}];

const Onboarding = () => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Entypo
            style={{ marginTop: 25 }}
            name="chevron-left"
            size={35}
            color="#49DFEA"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{ flex: 1 }} colors={["#FFCD90", "#FE9063"]}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: SIZES.height / 2.3,
            }}
          >
            <Image
              style={{
                width: 190,
                height: 190,
                resizeMode: "contain",
              }}
              source={require("../assets/images/logo.png")}
            />
            <Image
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                resizeMode: "stretch",
                height: 80,
                tintColor: colors.backgroundColor,
              }}
              source={require("../assets/images/bg-shape.png")}
            />
          </View>
          <View style={{ backgroundColor: colors.white, flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
                  { useNativeDriver: false }
                )}
              >
                <View style={[styles.slideItem]}>
                  <Text
                    style={[
                      {
                        textAlign: "center",
                        color: colors.title,
                        fontSize: SIZES.xLarge,
                      },
                    ]}
                  >
                    {t("Bienvenue chez Smart Parking")}
                  </Text>
                  <Text
                    style={[
                      FONTS.font,
                      { textAlign: "center", color: colors.text },
                    ]}
                  >
                    {t(
                      "Découvrez une nouvelle façon intelligente de stationner. Trouvez des places de parking rapidement et en toute sécurité."
                    )}
                  </Text>
                </View>
                <View style={[styles.slideItem]}>
                  <Text
                    style={[
                      {
                        textAlign: "center",
                        color: colors.title,
                        fontSize: SIZES.xLarge,
                      },
                    ]}
                  >
                    {t("Simplicité de Stationnement")}
                  </Text>
                  <Text
                    style={[
                      FONTS.font,
                      { textAlign: "center", color: colors.text },
                    ]}
                  >
                    {t(
                      "Avec Smart Parking, garer votre véhicule n'a jamais été aussi facile. Dites adieu aux recherches interminables de places de parking."
                    )}
                  </Text>
                </View>
                <View style={[styles.slideItem]}>
                  <Text
                    style={[
                      {
                        textAlign: "center",
                        color: colors.title,
                        fontSize: SIZES.xLarge,
                      },
                    ]}
                  >
                    {t("Inscrivez-vous ou Connectez-vous")}
                  </Text>
                  <Text
                    style={[
                      FONTS.font,
                      { textAlign: "center", color: colors.text },
                    ]}
                  >
                    {t(
                      "Pour profiter de toutes les fonctionnalités de l'application, créez un compte ou connectez-vous si vous en avez déjà un. Laissez Smart Parking simplifier votre expérience de stationnement."
                    )}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.indicatorConatiner} pointerEvents="none">
                {DATA.map((x, i) => (
                  <Indicator i={i} key={i} scrollValue={scrollValue} />
                ))}
              </View>
            </View>
            <View style={GlobalStyleSheet.container}>
              <View style={{ paddingBottom: 15 }}>
                <CustomButton
                  title={t("CRÉER UN COMPTE")}
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
              <View>
                <CustomButton
                  btnLight
                  title={t("SE CONNECTER")}
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
              <View style={{ alignItems: "center", padding: 12 }}>
                <Text style={[FONTS.font, { color: COLORS.second }]}>
                  {t("Mot de passe oublié ?")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
function Indicator({ i, scrollValue }) {
  const translateX = scrollValue.interpolate({
    inputRange: [
      -SIZES.width + i * SIZES.width,
      i * SIZES.width,
      SIZES.width + i * SIZES.width,
    ],
    outputRange: [-20, 0, 20],
  });
  return (
    <View style={styles.indicator}>
      <Animated.View
        style={[styles.activeIndicator, { transform: [{ translateX }] }]}
      />
    </View>
  );
}
export default Onboarding;

const styles = StyleSheet.create({
  slideItem: {
    width: SIZES.width,
    alignItems: "center",
    padding: 25,
    paddingBottom: 50,
  },
  indicatorConatiner: {
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  indicator: {
    height: 10,
    width: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    backgroundColor: "#C4C4C4",
    marginHorizontal: 4,
    overflow: "hidden",
  },
  activeIndicator: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.second,
    borderRadius: 10,
  },
});
