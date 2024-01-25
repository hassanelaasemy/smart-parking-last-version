import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import "../utils/i18n";
import { t } from "i18next";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import ProfileList from "../components/ProfileList";
import PersonnelDataUser from "../components/PersonnelDataUser";
import HistoriqueUser from "../components/HistoriqueUser";
import NotificatinUser from "../components/NotificatinUser";
import VoitureUser from "../components/VoitureUser";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const TostMessage = () => {
    ToastAndroid.show("Edited Sucessfully !", ToastAndroid.SHORT);
  };
  const [userInfo, setuserInfo] = useState("");
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const [panel, setPanel] = useState("Donnée personnelle");
  const categories = [
    t("Donnée personnelle"),
    t("Historique"),
    t("Notification"),
    t("Ma voiture"),
  ];

  useEffect(() => {
    getUserDetails();
  }, []);

  // Function to fetch and set user details based on the access token stored in AsyncStorage
  // Retrieves the access token from AsyncStorage and makes a GET request to the server's user info endpoint
  // Updates the local state with the fetched user information if successful
  // Logs errors to the console if there are any issues with the request
  const getUserDetails = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        axios
          .get("http://54.193.180.3:8080/v1/user/info", {
            headers: {
              Authorization: "Bearer " + accees,
            },
          })
          .then((response) => {
            setuserInfo(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };

  // Function to update user information on the server
  // Retrieves the access token from AsyncStorage and constructs a request object with updated user details
  // Makes a POST request to the server's user update endpoint with the request object in the headers
  // Updates the local state with the fetched user information if successful
  // Displays a toast message to indicate successful update
  // Logs errors to the console if there are any issues with the request
  const UpdateUser = () => {
    AsyncStorage.getItem("accessToken")
      .then((accees) => {
        const request = {
          metadata: {},
          userUpdateRequest: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.username,
          },
          timeStamps: new Date(),
        };
        axios
          .post("http://54.193.180.3:8080/v1/user/update/info", request, {
            headers: {
              Authorization: "Bearer " + accees,
            },
          })
          .then((response) => {
            setuserInfo(response.data);
            TostMessage();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch();
  };
  // Function to convert an image URL to a base64-encoded string
  // Fetches the image from the provided URL, converts it to a blob, and reads it as a data URL
  // Resolves with the base64-encoded string representation of the image
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
  // Function to update the user's avatar image on the server
  // Retrieves the access token from AsyncStorage and converts the avatar image URL to base64
  // Uses Cloudinary API to upload the base64-encoded image and get the image URL
  // Constructs a request object with the updated avatar URL and makes a POST request to the server's avatar update endpoint
  // Displays a toast message to indicate successful update
  // Logs errors to the console if there are any issues with the requests
  const UpdateUserImage = (avatar) => {
    // Retrieve the access token from AsyncStorage
    AsyncStorage.getItem("accessToken")
      .then(async (accessToken) => {
        // Convert the avatar image URL to base64 using the convertImageUrlToBase64 function
        const base64 = await convertImageUrlToBase64(avatar);

        // Create a FormData object with the base64-encoded image and Cloudinary upload parameters
        const data = new FormData();
        data.append("file", base64);
        data.append("upload_preset", "Mycloud");
        data.append("cloud_name", "drxc1ewyj");

        // Cloudinary API endpoint for image upload
        const cloudinaryUrl =
          "https://api.cloudinary.com/v1_1/drxc1ewyj/image/upload";

        // Make a POST request to Cloudinary API to upload the image
        axios
          .post(cloudinaryUrl, data)
          .then((res) => {
            // Construct a request object with the updated avatar URL
            const request = {
              metadata: {},
              updateAvatarRequest: {
                avatar: res.data.url,
              },
              timeStamps: new Date(),
            };

            // Make a POST request to the server's avatar update endpoint with the request object in the headers
            axios
              .post("http://54.193.180.3:8080/v1/user/update/avatar", request, {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              })
              .then(() => {
                // Display a toast message to indicate successful update
                TostMessage();
              })
              .catch((error) => {
                // Log errors to the console
                console.error(error);
              });
          })
          .catch(() => {
            // Handle errors from the Cloudinary API request
          });
      })
      .catch(() => {
        // Handle errors from AsyncStorage.getItem()
      });
  };

  // Function to handle the selection of a new profile image from the device's image library
  // Launches the ImagePicker library to allow the user to choose an image
  // Calls the UpdateUserImage function to update the user's avatar on the server with the selected image
  // Updates the local state with the new avatar image URI
  // Logs errors to the console if there are any issues with the image selection or avatar update
  const handleProfileImage = async () => {
    try {
      // Launch the ImagePicker library to allow the user to choose an image
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
        .then((result) => {
          // Call the UpdateUserImage function to update the user's avatar on the server with the selected image
          UpdateUserImage(result.assets[0].uri);
          // Update the local state with the new avatar image URI
          setuserInfo({ ...userInfo, avatar: result.assets[0].uri });
        })
        .catch((err) => console.error(err));
    } catch (error) {
    }
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      {/*----------------------header: */}
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
          <Ionic name="close-outline" size={35} color={"#49DFEA"} />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: SIZES.large,
            color: "#808080",
          }}
        >
          {t("Editer le profil")}
        </Text>
        <TouchableOpacity onPress={UpdateUser}>
          <Ionic name="checkmark" size={35} color={"#49DFEA"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
          top: 50,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={handleProfileImage}
            style={{
              height: 32,
              width: 32,
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.light,
              borderRadius: 30,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="edit" size={24} color={COLORS.second} />
          </TouchableOpacity>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
            source={{ uri: userInfo.avatar }}
          />
        </View>
      </View>
      <View style={{ padding: 10, top: 25 }}>
        <ProfileList
          categories={categories}
          catergoryIndex={catergoryIndex}
          setCategoryIndex={setCategoryIndex}
          setPanel={setPanel}
        />
      </View>
      {panel === t("Donnée personnelle") && (
        <PersonnelDataUser userInfo={userInfo} setuserInfo={setuserInfo} />
      )}
      {panel === t("Historique") && <HistoriqueUser />}
      {panel === t("Notification") && <NotificatinUser />}
      {panel === t("Ma voiture") && <VoitureUser />}
    </View>
  );
};

export default ProfileScreen;
