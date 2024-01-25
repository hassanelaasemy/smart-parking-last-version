import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import image4 from "../assets/images/logo.png";
import { Entypo } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import "../utils/i18n";
import { t } from "i18next";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import i18n from "../utils/i18n";
//-------------------------just a front end for updating password
const UpdatePassowrscreen = ({ navigation }) => {
  const [issecure, Setissecure] = useState(true);
  const toggleSecureTextEntry = () => {
    Setissecure(!issecure);
  };
  const [issecure2, Setissecure2] = useState(true);
  const toggleSecureTextEntry2 = () => {
    Setissecure2(!issecure2);
  };
  const [issecure3, Setissecure3] = useState(true);
  const toggleSecureTextEntry3 = () => {
    Setissecure3(!issecure3);
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {/*-----------------header: */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            top: 30,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-left"
              size={35}
              color="#49DFEA"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: SIZES.large,
              color: "#808080",
            }}
          >
            {t("Mot de passe et sécurité")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              TostMessage();
              navigation.goBack();
            }}
          ></TouchableOpacity>
        </View>

        <View style={{ padding: 8, alignItems: "center", top: 40 }}>
          <Image source={image4} style={{ width: 150, height: 150 }} />
          <Text
            style={{
              color: COLORS.black,
              fontFamily: FONTS.regular,
            }}
          >
            {t(
              "Votre mot de passe doit contenir au moins 6 caractères ainsi qu’une combinaison de chiffres, de lettres et de caractères spéciaux ( !$@%)."
            )}
          </Text>
        </View>
        <View style={{ padding: 10, paddingVertical: 20, top: 30 }}>
          {/* input 1: */}
          <View style={{ paddingVertical: 12 }}>
            <TextInput
              placeholder={t("Mot de passe actuel")}
              // defaultValue={}
              secureTextEntry={issecure}
              style={[
                {
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                },
                i18n.language === "ar" && { textAlign: "right" },
              ]}
            />
            <TouchableOpacity
              onPress={toggleSecureTextEntry}
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              <Icon
                name={issecure ? "eye-slash" : "eye"}
                size={20}
                color="gray"
                style={{
                  ...(i18n.language === "ar" && {
                    position: "absolute",
                    right: 340,
                    top: -5,
                  }),
                }}
              />
            </TouchableOpacity>
          </View>

          {/* input 2: */}
          <View style={{ paddingVertical: 12 }}>
            <TextInput
              placeholder={t("Nouveau mot de passe")}
              secureTextEntry={issecure2}
              // defaultValue={}
              style={[
                {
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                },
                i18n.language === "ar" && { textAlign: "right" },
              ]}
            />
            <TouchableOpacity
              onPress={toggleSecureTextEntry2}
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              <Icon
                name={issecure2 ? "eye-slash" : "eye"}
                size={20}
                color="gray"
                style={{
                  ...(i18n.language === "ar" && {
                    position: "absolute",
                    right: 340,
                    top: -5,
                  }),
                }}
              />
            </TouchableOpacity>
          </View>

          {/* input 3: */}
          <View style={{ paddingVertical: 12 }}>
            <TextInput
              placeholder={t("Retapez le nouveau mot de passe")}
              secureTextEntry={issecure3}
              // defaultValue={}
              style={[
                {
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderColor: "#CDCDCD",
                },
                i18n.language === "ar" && { textAlign: "right" },
              ]}
            />
            <TouchableOpacity
              onPress={toggleSecureTextEntry3}
              style={{ position: "absolute", right: 10, top: 15 }}
            >
              <Icon
                name={issecure3 ? "eye-slash" : "eye"}
                size={20}
                color="gray"
                style={{
                  ...(i18n.language === "ar" && {
                    position: "absolute",
                    right: 340,
                    top: -5,
                  }),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*-------------------------Buttons: */}
        <View>
          <TouchableOpacity>
            <Text
              style={{
                marginVertical: 10,
                padding: 10,
                color: "#3493D9",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "#EFEFEF",
                top: 20,
              }}
            >
              {t("Mot de passe oublié?")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.second,
              padding: SIZES.small,
              alignItems: "center",
              borderRadius: SIZES.medium,
              top: 20,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.regular,
                fontSize: SIZES.medium,
              }}
            >
              {t("Changer le mot de passe")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdatePassowrscreen;
