import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import profile from "../assets/images/header.jpeg";
import i18n from "../utils/i18n";
import { t } from "i18next";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import CategoryListSearch from "../components/CategoryListSearch";
import { useState } from "react";
import PopularSearch from "../components/PopularSearch";
import PresDetoisearch from "../components/PresDetoisearch";
import HistoriqueSearch from "../components/HistoriqueSearch";
import OffreSearch from "../components/OffreSearch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const SearchScreen = () => {
  const navigation = useNavigation();
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const categories = [
    t("Popular"),
    t("Prés de toi"),
    t("Historique"),
    t("Offre"),
  ];
  const [panel, setPanel] = useState("Popular");
  const [loading, setLoading] = useState(true);
  const [Parking, setParking] = useState([]);
  const [reload, setReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredParking, setFilteredParking] = useState();
  const [hasSearchResults, setHasSearchResults] = useState(true);

  // useEffect hook to fetch parking data based on the specified country and city
  // Retrieves the access token from AsyncStorage for authentication
  // Makes a POST request to the server's parking endpoint with the specified city and country
  // Sets the parking state with the received data, handles errors, and updates the loading state
  // The effect runs once on component mount ([] dependency array
  useEffect(() => {
    const parkingdata = {
      metaData: {},
      listParking: {
        country: "MAROC",
        city: "Casablanca",
      },
      timeStamps: Date.now(),
    };
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .post("http://54.193.180.3:8080/v2/parking/byCity", parkingdata, {
            headers: {
              Authorization: `Bearer ${accees ? accees : ""}`,
            },
          })
          .then((response) => {
            setParking(response.data);
          })
          .catch((errorMsg) => {
            setReload(true);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch();
  }, []);
  // Function to handle parking search based on the provided text
  // Updates the search text state with the input text
  // Filters the parking data to include only entries whose name matches the search text (case-insensitive)
  // Sets the filtered parking state with the search results
  // Updates the hasSearchResults state based on whether there are search results
  // Parameter: text - the input text for parking search
  const handleSearch = (text) => {
    setSearchText(text);
    const filteredResult = Parking.filter((parking) =>
      parking.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredParking(filteredResult);
    setHasSearchResults(filteredResult.length > 0);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white }}
    >
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={35}
          color="#49DFEA"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>{t("Trouver un parking")}</Text>
        <Image source={profile} style={styles.profileImage} />
      </View>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={25}
            style={{ marginLeft: 20 }}
            color={COLORS.light}
          />
          <TextInput
            placeholder={t("Cherche ici...")}
            style={styles.input}
            clearButtonMode="always"
            autoCorrect={false}
            placeholderTextColor={COLORS.light}
            onChangeText={(text) => handleSearch(text)}
            value={searchText}
          />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.light} />
        </View>
      </View>
      {/* 
  Renders a component for displaying and selecting categories.
  - 'categories': Array of category data to display.
  - 'catergoryIndex': Index representing the currently selected category.
  - 'setCategoryIndex': Function to update the selected category index.
  - 'setPanel': Function to update the panel state based on the selected category.
*/}
      <CategoryListSearch
        categories={categories}
        catergoryIndex={catergoryIndex}
        setCategoryIndex={setCategoryIndex}
        setPanel={setPanel}
      />
      {/* 
  Conditionally renders search components based on the value of the 'panel' state.
*/}
      {panel === t("Popular") && (
        <PopularSearch
          loading={loading}
          Parking={filteredParking ? filteredParking : Parking}
          hasSearchResults={hasSearchResults}
        />
      )}
      {panel === t("Prés de toi") && <PresDetoisearch />}
      {panel === t("Historique") && <HistoriqueSearch />}
      {panel === t("Offre") && <OffreSearch />}
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    color: COLORS.black,
  },
  sortBtn: {
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.second,
    justifyContent: "center",
    alignItems: "center",
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
});
