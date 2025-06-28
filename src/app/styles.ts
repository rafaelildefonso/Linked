import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  header: {
    paddingHorizontal: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    height: 56,
    width: 90,
  },
  links: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  linksContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 72, // Espaço para a Navbar
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.gray[100],
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingBottom: 32,
    padding: 24,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    gap: 12,
  },
  modalFavicon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  modalCategory: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray[400],
  },
  modalLinkName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[500],
  },
  modalUrl: {
    marginTop: 8,
    fontSize: 14,
    color: colors.gray[400],
  },
  modalDate: {
    marginTop: 8,
    fontSize: 12,
    color: colors.gray[400],
    // textAlign: "center",
  },
  modalFotter: {
    flexDirection: "row",
    marginTop: 12,
    width: "100%",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingVertical: 14,
  },
  inputPesquisaContainer: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
    flexDirection: "row",
    alignItems:"center",
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 8,
    marginTop: 8,
    overflow: "hidden",
  },
  moveModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray[600],
    textAlign: "center",
    marginBottom: 16,
  },
  moveModalFooter: {
    marginTop: 24,
    paddingTop: 16,
    // borderTopWidth: 1,
    // borderTopColor: colors.gray[200],
  },
  moveModalButton: {
    backgroundColor: colors.blue[500],
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  moveModalButtonText: {
    color: colors.basic.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
