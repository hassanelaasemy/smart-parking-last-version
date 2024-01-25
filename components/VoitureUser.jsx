import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { TextInput } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";
import { t } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
const VoitureUser = ({ navigation }) => {
  const { colors } = useTheme();
  const [paymentOption, setPaymentOption] = useState("");
  const [type, setType] = useState("ADD");
  const [loading, setLoading] = useState(false);
  const [caruser, secaruser] = useState("");
  const [Marque, setMarque] = useState("");
  const [Modele, setModele] = useState("");
  const [Matricule, setMatricule] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    DisplayCarUserByid();
  }, []);
  //---------------Fetches and displays car data for the authenticated user using their access token
  const DisplayCarUserByid = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get("http://54.193.180.3:8080/v2/car/getcar", {
            headers: {
              Authorization: "Bearer " + accees,
            },
          })
          .then((response) => {
            secaruser(response.data);
            setImage(response.data.image);
            setMarque(response.data.marque);
            setMatricule(response.data.matricule);
            setModele(response.data.modele);
            setType(response.data ? "UPDATE" : "ADD");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };
  //---------------Converts an image URL to a base64 string
  const convertImageUrlToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });
    return base64String;
  };
  //----------Adds a new car for the authenticated user.
  //----------Retrieves the user's access token from AsyncStorage, converts the image to base64,
  //---------- uploads it to Cloudinary, and then sends a POST request to add the car with the provided details.
  //----------Resets input fields after successful addition.
  const AddCarUser = () => {
    AsyncStorage.getItem("accessToken")
      .then(async (accessToken) => {
        const base64 = await convertImageUrlToBase64(image);
        // Create a FormData object with the base64-encoded image and Cloudinary upload parameters
        const data = new FormData();
        data.append("file", base64);
        data.append("upload_preset", "Mycloud");
        data.append("cloud_name", "drxc1ewyj");
        const cloudinaryUrl =
          "https://api.cloudinary.com/v1_1/drxc1ewyj/image/upload";
        const upload = await axios.post(cloudinaryUrl, data);
        const request = {
          id: type === "ADD" ? "" : caruser.id,
          image: upload.data.url,
          marque: Marque,
          modele: Modele,
          matricule: Matricule,
        };
        axios
          .post("http://54.193.180.3:8080/v2/car/add", request, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((response) => {
            secaruser(response.data);
            setType("UPDATE");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //-------Launches the image picker to allow the user to select an image from the device's gallery.
  //--------Sets the selected image URI to the component's state.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          top: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
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
                  source={require("../assets/icons/car.png")}
                />
                <Text style={[styles.listTitle, { color: colors.title }]}>
                  Ajouter Votre voiture
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
                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 20,
                      top: 0,
                      backgroundColor: "#D3D3D3",
                      width: 360,
                      borderRadius: 5,
                    }}
                  >
                    <View>
                      <TouchableOpacity
                        onPress={pickImage}
                        style={{
                          height: 32,
                          width: 32,
                          position: "absolute",
                          bottom: 3,
                          right: -50,
                          backgroundColor: COLORS.light,
                          borderRadius: 30,
                          zIndex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MaterialIcons
                          name="edit"
                          size={24}
                          color={COLORS.second}
                        />
                      </TouchableOpacity>
                      <Image
                        style={{
                          height: 150,
                          width: 250,
                        }}
                        source={{ uri: image }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginBottom: 15,
                    }}
                  >
                    <TextInput
                      style={styles.inputStyle}
                      placeholder="Marque de la voiture"
                      placeholderTextColor={COLORS.gray}
                      value={Marque}
                      onChangeText={(text) => {
                        setMarque(text);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginBottom: 15,
                    }}
                  >
                    <TextInput
                      style={styles.inputStyle}
                      placeholder="Modèle de la voiture"
                      placeholderTextColor={COLORS.gray}
                      value={Modele}
                      onChangeText={(text) => {
                        setModele(text);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginBottom: 15,
                    }}
                  >
                    <TextInput
                      style={styles.inputStyle}
                      placeholder="Numéro de plaque d'immatriculation"
                      placeholderTextColor={COLORS.gray}
                      value={Matricule}
                      onChangeText={(text) => {
                        setMatricule(text);
                      }}
                    />
                  </View>

                  <View style={{ paddingBottom: 10 }}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        AddCarUser();
                      }}
                    >
                      {loading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text style={styles.buttonText}>
                          {t(type === "ADD" ? "Ajouter" : "Update")}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </Collapsible>
            </View>
            {/*------------------------------------- Card Car */}
            {caruser && caruser.image && (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  elevation: 2, // Add elevation to create a shadow effect
                  borderRadius: 2,
                  overflow: "hidden",
                  top: 20,
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: COLORS.light,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: "100%",
                        height: 210,
                      }}
                      source={{ uri: caruser.image }}
                    />
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
                        style={{
                          color: colors.title,
                          fontFamily: FONTS.bold,
                          fontSize: SIZES.large,
                        }}
                      >
                        {caruser.marque}
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 12, marginLeft: 3 }}>
                          Matricule : {caruser.matricule}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{ ...FONTS.fontSm, color: colors.textLight }}
                      >
                        Model : {caruser.modele}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default VoitureUser;

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
    fontSize: SIZES.medium,
    flex: 1,
    fontFamily: FONTS.bold,
  },
  inputStyle: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  button: {
    height: 40,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.second,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});
