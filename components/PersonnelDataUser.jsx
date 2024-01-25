import { View, Text } from "react-native";
import React from "react";
// -------------------------------translation :
import "../utils/i18n";
import { t } from "i18next";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const PersonnelDataUser = ({ userInfo, setuserInfo }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ padding: 10, paddingVertical: 20, top: 10 }}>
        {/*----------------------inputs: */}
        <View style={{ paddingVertical: 12 }}>
          <Text style={{ color: "#3493D9" }}>{t("Prenom")}</Text>
          <TextInput
            placeholder={t("votre Prenom")}
            defaultValue={userInfo.firstName}
            onChange={(e) =>
              setuserInfo({ ...userInfo, firstName: e.nativeEvent.text })
            }
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            {t("Nom")}
          </Text>
          <TextInput
            placeholder={t("votre Nom")}
            defaultValue={userInfo.lastName}
            onChange={(e) =>
              setuserInfo({ ...userInfo, lastName: e.nativeEvent.text })
            }
            style={{
              fontSize: 14,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 12 }}>
          <Text
            style={{
              color: "#3493D9",
            }}
          >
            {t("Email")}
          </Text>
          <TextInput
            placeholder={t("votre email")}
            defaultValue={userInfo.username}
            onChange={(e) =>
              setuserInfo({ ...userInfo, username: e.nativeEvent.text })
            }
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
      </View>
      <View>
        {/*----------------------------button: */}
        <TouchableOpacity onPress={() => navigation.navigate("Updatepassword")}>
          <Text
            style={{
              marginVertical: 10,
              padding: 10,
              color: "#3493D9",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#EFEFEF",
              fontSize: 16,
              top: -10,
            }}
          >
            {t("Confidentialité")}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PersonnelDataUser;
