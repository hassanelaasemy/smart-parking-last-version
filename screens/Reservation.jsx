import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyleSheet } from "../constants/StyleSheet";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import CustomInput from "../components/Input";
import { ScrollView } from "react-native";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Image } from "react-native";
import Collapsible from "react-native-collapsible";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Reservation = ({ navigation }) => {
  const { colors } = useTheme();
  const StepData = [
    {
      title: "Reservation",
      active: true,
      success: false,
    },
    {
      title: "Payment",
      active: false,
      success: false,
    },
    {
      title: "Status",
      active: false,
      success: false,
    },
  ];
  const PhonePeOption = [
    {
      image: require("../assets/icons/car-wash.png"),
      title: "Voiture",
    },
    {
      image: require("../assets/icons/motorcycle.png"),
      title: "Moto",
    },
    {
      image: require("../assets/icons/van.png"),
      title: "Camion",
    },
  ];
  const [paymentOption, setPaymentOption] = useState("");
  const [payActive, setPayActive] = useState("");
  const [userInfo, setuserInfo] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  //Displays the date picker component by setting the 'datePickerVisibility' state to true
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  // Hides the date picker component by setting the 'datePickerVisibility' state to false.
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //---Handles the confirmation of a selected date.
  //---Updates the 'selectedDate' state with the chosen date
  //---and hides the date picker component.
  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.light,
          }}
        >
          <View
            style={{
              height: 55,
              backgroundColor: COLORS.light,
              flexDirection: "row",
              alignItems: "center",
              ...GlobalStyleSheet.shadow,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 55,
                width: 55,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <FeatherIcon
                color={COLORS.second}
                name={"arrow-left"}
                size={22}
              />
            </TouchableOpacity>
            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }}>
              Parking Info
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderColor: COLORS.gray,
            }}
          >
            {StepData.map((data, index) => {
              return (
                <View key={index} style={[styles.stepItem]}>
                  <View
                    style={[
                      styles.stepIcon,
                      {
                        backgroundColor: colors.cardBg,
                      },
                      data.active && {
                        backgroundColor: COLORS.second,
                      },
                      data.success && {
                        backgroundColor: COLORS.second,
                      },
                    ]}
                  >
                    {data.success ? (
                      <FeatherIcon
                        color={COLORS.white}
                        size={16}
                        name="check"
                      />
                    ) : (
                      <Text
                        style={[
                          {
                            ...FONTS.font,
                            ...FONTS.fontBold,
                            color: colors.title,
                            marginBottom: 2,
                          },
                          data.active && {
                            color: COLORS.white,
                          },
                        ]}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      ...FONTS.font,
                      ...FONTS.fontBold,
                      color: colors.title,
                    }}
                  >
                    {data.title}
                  </Text>
                </View>
              );
            })}
          </View>

          <KeyboardAvoidingView
            style={{
              flex: 1,
            }}
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.cardBg,
              }}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={[GlobalStyleSheet.container]}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray,
                      paddingBottom: 5,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.medium,
                      }}
                    >
                      Contact Details
                    </Text>
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <CustomInput
                      placeholder="Nom"
                      defaultValue={userInfo.firstName}
                      readOnly={true}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <CustomInput
                      placeholder="Prenom"
                      defaultValue={userInfo.lastName}
                      readOnly={true}
                    />
                  </View>
                  <View style={{ marginBottom: 15 }}>
                    <CustomInput
                      placeholder="Email"
                      readOnly={true}
                      defaultValue={userInfo.username}
                    />
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray,
                      paddingBottom: 5,
                      marginBottom: 20,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.bold,
                        fontSize: SIZES.medium,
                      }}
                    >
                      Reservation Details
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setPaymentOption(
                          paymentOption === "PaytmWallet" ? "" : "PaytmWallet"
                        )
                      }
                      style={[styles.list]}
                    >
                      <Image
                        style={[styles.listImg, { tintColor: colors.title }]}
                        source={require("../assets/icons/select.png")}
                      />
                      <Text style={[styles.listTitle, { color: COLORS.black }]}>
                        Type de véhicule
                      </Text>
                      <FeatherIcon
                        color={colors.title}
                        name={"chevron-down"}
                        size={22}
                      />
                    </TouchableOpacity>
                    <Collapsible
                      collapsed={paymentOption === "PaytmWallet" ? false : true}
                    >
                      <View style={{ paddingBottom: 20 }}>
                        {PhonePeOption.map((data, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => setPayActive(data.title)}
                              key={index}
                              style={[
                                styles.payList,
                                {
                                  borderColor: COLORS.gray,
                                },
                                PhonePeOption.length - 1 === index && {
                                  borderBottomWidth: 0,
                                },
                              ]}
                            >
                              <View
                                style={[
                                  styles.listRadio,
                                  {
                                    borderColor: COLORS.gray,
                                  },
                                  payActive === data.title && {
                                    borderColor: COLORS.second,
                                  },
                                ]}
                              >
                                {payActive === data.title && (
                                  <View style={styles.listRadioCircle} />
                                )}
                              </View>
                              <View
                                style={[
                                  styles.payMedia,
                                  {
                                    borderColor: COLORS.gray,
                                  },
                                ]}
                              >
                                <Image
                                  style={styles.payImg}
                                  source={data.image}
                                />
                              </View>
                              <Text
                                style={[
                                  {
                                    ...FONTS.font,
                                    color: colors.text,
                                  },
                                  payActive === data.title && {
                                    ...FONTS.fontBold,
                                    color: colors.title,
                                  },
                                ]}
                              >
                                {data.title}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </Collapsible>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: COLORS.gray,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setPaymentOption(paymentOption === "Cash" ? "" : "Cash")
                      }
                      style={[styles.list]}
                    >
                      <Image
                        style={[styles.listImg, { tintColor: colors.title }]}
                        source={require("../assets/icons/timetable.png")}
                      />
                      <Text style={[styles.listTitle, { color: colors.title }]}>
                        Date De Reservation
                      </Text>
                      <FeatherIcon
                        color={colors.title}
                        name={"chevron-down"}
                        size={22}
                      />
                    </TouchableOpacity>
                    <Collapsible
                      collapsed={paymentOption === "Cash" ? false : true}
                    >
                      <View style={{ paddingBottom: 20 }}>
                        <Text style={{ textAlign: "center" }}>
                          Payez en argent liquide à la stationnement.
                        </Text>
                        {/* Add the select date here */}
                        <TouchableOpacity onPress={showDatePicker}>
                          <Text>{selectedDate.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="datetime"
                          onConfirm={handleDateConfirm}
                          onCancel={hideDatePicker}
                        />
                      </View>
                    </Collapsible>
                  </View>
                </View>
              </ScrollView>
              <View style={[GlobalStyleSheet.container]}>
                <CustomButton
                  onPress={() => navigation.navigate("Payment")}
                  title={"Save Reservation"}
                  color={COLORS.second}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Reservation;

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
    fontFamily: FONTS.bold,
    flex: 1,
  },
  listRadioCircle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.second,
  },
  payImg: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  payMedia: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 40,
    marginRight: 15,
  },
  payList: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  listRadio: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
