import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  logo: {
    width: 350,
    height: 200,
    objectFit: "contain",
  },
  clips: {
    width: 300,
    height: 180,
    objectFit: "contain",
  },
  text: {
    fontSize: 14,
    color: colors.gray[300],
    textAlign: "center",
    marginBottom: 16,
  },
});
