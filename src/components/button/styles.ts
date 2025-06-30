import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
    backgroundColor: colors.blue[500],
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blue[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: colors.basic.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
