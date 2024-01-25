import { COLORS, FONTS } from "./theme";

export const GlobalStyleSheet = {
  container: {
    padding: 15,
    //maxWidth : 575,
    marginLeft: "auto",
    marginRight: "auto",
    //backgroundColor:'red',
    width: "100%",
  },
  row: {
    flexDirection: "row",
    marginHorizontal: -5,
    flexWrap: "wrap",
  },
  col33: {
    width: "33.33%",
    paddingHorizontal: 5,
  },
  col50: {
    width: "50%",
    paddingHorizontal: 5,
  },
  searchInput: {
    ...FONTS.font,
    height: 45,
    borderRadius: 10,
    paddingLeft: 18,
    paddingRight: 50,
    // shadowColor: "rgba(0,0,0,.6)",
    // shadowOffset: {
    //     width: 0,
    //     height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,

    // elevation: 10,
  },
  searchInputIcon: {
    position: "absolute",
    right: 5,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  headerArea: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 50,
  },
  NotificationDot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    position: "absolute",
    top: -5,
    right: -5,
    borderColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },
  NotificationBtn: {
    height: 45,
    width: 45,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "rgba(255,255,255,.25)",
  },
  headerBtn: {
    height: 48,
    width: 48,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "rgba(0,0,0,.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
};
