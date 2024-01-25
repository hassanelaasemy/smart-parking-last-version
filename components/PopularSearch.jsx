import { View, Text } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { ActivityIndicator } from "react-native";
import CardSearch from "./CradSearch";
import { COLORS } from "../constants/theme";
const PopularSearch = ({ loading, Parking, hasSearchResults }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={GlobalStyleSheet.container}>
        {loading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size="large"
            color={COLORS.second}
          />
        ) : hasSearchResults ? (
          <View
            style={{
              marginHorizontal: -20,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {Parking?.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: "50%",
                    paddingHorizontal: 8,
                  }}
                >
                  <CardSearch
                    id={data.id}
                    image={data.image}
                    title={data.name}
                    price={data.price}
                    address={data.address}
                    rating={data.rating}
                    favorite={data.favorite}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            No results found
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default PopularSearch;
