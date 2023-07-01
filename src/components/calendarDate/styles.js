import {StyleSheet, Platform} from 'react-native';
import scale from "../../helpers/scale";

export default StyleSheet.create({
    halfCircleContainer: {
      borderRadius: scale(20),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    threePartCircleContainer: {
      borderColor: "white",
      borderWidth: 0,
      borderRadius: scale(20),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      transform: [{ rotate: "0deg" }],
    },
    fullCircleContainer: {
      borderColor: "white",
      borderWidth: 0,
      borderRadius: scale(20),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    quadCircleContainer: {
      borderRadius: scale(20),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
  });

