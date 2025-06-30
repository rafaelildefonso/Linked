import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.basic.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingBottom: 8, // For home indicator space
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4, // Increased height for more subtle shadow
    },
    shadowOpacity: 0.1, // Increased opacity for more noticeable shadow
    shadowRadius: 8, // Increased radius for softer shadow
    elevation: 12, // Increased elevation for more depth
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
