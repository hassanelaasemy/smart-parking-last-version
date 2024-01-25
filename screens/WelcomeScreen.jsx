import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import Swiper from "react-native-swiper";
import Screen1 from "../assets/images/partout.jpg";
import Screen2 from "../assets/images/stat.jpg";
import Screen3 from "../assets/images/parkingres.jpg";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem("@onboarding_complete");
      if (value !== null && value === "true") {
        navigation.replace("Home");
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async (e) => {
    if (e === 2) {
      try {
        await AsyncStorage.setItem("@onboarding_complete", "true");
        navigation.navigate("Home");
      } catch (error) {
        console.log("Error on storing onboarding status : ", error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Swiper
        onIndexChanged={handleOnboardingComplete}
        activeDotColor={COLORS.second}
      >
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
      </Swiper>
    </View>
  );
};

export const ScreenOne = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 6,
      }}
    >
      <Image
        source={Screen1}
        style={{
          width: "100%",
          height: "60%",
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 12,
          marginVertical: 6,
        }}
      >
        <Text
          style={{
            fontSize: 22, // Equivalent to text-2xl in Tailwind
            color: "#555",
            fontFamily: FONTS.bold,
          }}
        >
          Trouvez Votre Parking Sécurisé
        </Text>
        <Text
          style={{
            fontSize: 18, // Equivalent to text-xl in Tailwind
            color: "#777",
            textAlign: "center",
          }}
        >
          Découvrez une variété d'options de Parking partout au Maroc.
        </Text>
      </View>
    </View>
  );
};

export const ScreenTwo = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 6,
      }}
    >
      <Image
        source={Screen2}
        style={{
          width: "100%",
          height: "60%",
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 12,
          marginVertical: 6,
        }}
      >
        <Text
          style={{
            fontSize: 22, // Equivalent to text-2xl in Tailwind
            color: "#555",
            fontFamily: FONTS.bold,
          }}
        >
          Stationnement Simplifié
        </Text>
        <Text
          style={{
            fontSize: 18, // Equivalent to text-xl in Tailwind
            color: "#777",
            textAlign: "center",
          }}
        >
          Trouvez des places de parking disponibles en un instant, où que vous
          soyez au Maroc. Fini les soucis de stationnement.
        </Text>
      </View>
    </View>
  );
};

export const ScreenThree = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 6,
      }}
    >
      <Image
        source={Screen3}
        style={{
          width: "100%",
          height: "60%",
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 12,
          marginVertical: 6,
        }}
      >
        <Text
          style={{
            fontSize: 22, // Equivalent to text-2xl in Tailwind
            color: "#555",
            fontFamily: FONTS.bold,
          }}
        >
          Gérez Vos Réservations
        </Text>
        <Text
          style={{
            fontSize: 18, // Equivalent to text-xl in Tailwind
            color: "#777",
            textAlign: "center",
          }}
        >
          Réservez et payez votre place de parking en avance. Profitez d'une
          expérience de stationnement sans stress.
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
