import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
    backgroundColor: colors.basic.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[300],
    paddingHorizontal: 16,
    color: colors.gray[700],
    fontSize: 16,
  },
});
