import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from "../constants/theme";
import { Icon } from "react-native-elements";
import parkingimg from "../assets/images/parking3.jpg";
const CardSearch = ({
  id,
  image,
  title,
  address,
  price,
  description,
  rating,
  favorite,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  //---------------------navigating to the "DetailsScreen" with specific data
  const handleCardPress = () => {
    navigation.navigate("DetailsScreen", {
      id,
      parkdata: { image, title, address, price, rating, favorite, description },
    });
  };
  return (
    <View
      style={{
        elevation: 3, // Add elevation to create a shadow effect
        backgroundColor: COLORS.white,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 15,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleCardPress}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View>
          <Image
            style={{
              width: "100%",
              height: 140,
            }}
            source={parkingimg}
          />
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              position: "absolute",
              top: 10,
              right: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,.25)",
            }}
          >
            <Icon
              color={favorite ? COLORS.red : COLORS.white}
              size={18}
              name="favorite"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ ...FONTS.font, ...FONTS.fontBold, color: colors.title }}
            >
              {title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="star" size={18} color={COLORS.yellow} />
              <Text style={{ fontSize: 12, marginLeft: 3 }}>{rating}</Text>
            </View>
          </View>

          {/* <Text style={{...FONTS.h6,color:COLORS.second}}>${price}10.5/h</Text> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
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
              {address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardSearch;
