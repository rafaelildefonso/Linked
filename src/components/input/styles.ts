import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 52,
    width: "100%",
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    padding: 10,
    color: colors.gray[400],
    fontSize: 16,
  },
});
