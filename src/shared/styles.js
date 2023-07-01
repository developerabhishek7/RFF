import { StyleSheet } from "react-native";
import scale from "../helpers/scale";
import { colours } from "../constants/ColorConst";
import { appFonts } from "../constants/StringConst";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: null,
    height: null,
  },
  inner: {
    backgroundColor: colours.white,
    width: "90%",
  },
  button: {
    backgroundColor: "#0055ff",
    padding: "3%",
    width: "100%",
    alignSelf: "center",
    alignItems: "center"
  },
  card: {
    marginTop: "3%",
    marginLeft: "3%",
    marginRight: "3%",
    marginBottom: "3%",
  },
  listFooter: {
    padding: "3%",
    opacity: 0.5,
    textAlign: "center",
    marginBottom: 10,
  },
  headerStyle: {
    backgroundColor: colours.white,
    borderBottomWidth: 0,
    elevation: 0,
  },

  headerTitleStyle: {
    color: colours.darkBlueTheme,
    fontSize: scale(18),
    fontFamily: appFonts.INTER_BOLD,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: scale(-6),
    marginLeft: Platform.OS === "ios" ? scale(0) : scale(30),
  },
});
