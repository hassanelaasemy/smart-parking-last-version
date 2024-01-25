import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "../constants/theme";
import "../utils/i18n";
import { t } from "i18next";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import parkingimg from "../assets/images/parking3.jpg";
import { Icon, colors } from "react-native-elements";
import { ScrollView } from "react-native";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import profile from "../assets/images/header.jpeg";
const FavoriteScreen = () => {
  const navigation = useNavigation();
  const [Favorite, setFavorite] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFavorites();
  }, []);
  // Function to retrieve and set the user's favorite parking locations
  // Retrieves the access token from AsyncStorage and makes a GET request to the server's endpoint
  // Updates the local state with the fetched favorite parking locations if successful
  // Logs errors to the console if there are any issues with the request
  // Sets the loading state to false once the operation is complete
  const getFavorites = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        return axios.get("http://54.193.180.3:8080/v2/parking/auth/favorite", {
          headers: {
            Authorization: `Bearer ${accees ? accees : ""}`,
          },
        });
      })
      .then((response) => {
        setFavorite(response.data);
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{t("Préférée")}</Text>
        <Image source={profile} style={styles.profileImage} />
      </View>
      <ScrollView
        style={{ marginHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size="small"
            color={COLORS.second}
          />
        ) : Favorite.length === 0 ? (
          <Text style={styles.noFavoritesMessage}>
            {t("Aucun favori trouvé.")}
          </Text>
        ) : (
          Favorite.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  elevation: 1,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                  overflow: "hidden",
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    backgroundColor: colors.cardBg,
                    borderRadius: 10,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Image
                      source={parkingimg} // Use the actual image source from 'item'
                      style={{
                        height: 110,
                        width: 130,
                        borderRadius: 8,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        position: "absolute",
                        top: 5,
                        right: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        //backgroundColor: 'rgba(255,255,255,.25)',
                      }}
                    >
                      <FontAwesome color={"#fd3667"} size={22} name="heart" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ ...FONTS.h6, color: colors.title }}
                      >
                        {item.name} {/* Display the name */}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon name="star" size={18} color={COLORS.yellow} />
                        <Text style={{ fontSize: 12, marginLeft: 3 }}>
                          {item.rating}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <FeatherIcon
                        style={{ marginRight: 3 }}
                        color={COLORS.second}
                        name="map-pin"
                      />
                      <Text
                        numberOfLines={1}
                        style={{ ...FONTS.fontSm, color: colors.textLight }}
                      >
                        {item.address} {/* Display the location */}
                      </Text>
                    </View>
                    <Text
                      style={{ ...FONTS.h5, color: COLORS.primary }}
                      numberOfLines={2}
                    >
                      {item.description} {/* Display the description */}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
    marginTop: 0,
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    color: "#808080",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  noFavoritesMessage: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
});
