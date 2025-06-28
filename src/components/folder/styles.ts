import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    gap: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: colors.gray[600],
  },
});
