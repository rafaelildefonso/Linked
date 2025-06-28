import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap:12
    },
    favicon: {
        width: 24,
        height: 24,
        borderRadius: 4,
    },
    details: {
        flex:1,
    },
    name: {
        color: colors.gray[500],
        fontSize: 16,
        fontWeight: "500"
    },
    url: {
        color: colors.gray[400],
        fontSize: 14,
    }
})