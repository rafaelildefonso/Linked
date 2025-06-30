import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 16,
        padding: 24,
        backgroundColor: colors.basic.white,
        borderRadius: 16,
        borderWidth: 0,
        borderColor: colors.gray[200],
        shadowColor: colors.gray[400],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
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
        color: colors.gray[700],
        fontSize: 16,
        fontWeight: "600"
    },
    url: {
        color: colors.gray[500],
        fontSize: 14,
    }
})