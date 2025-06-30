import { StyleSheet } from "react-native";

import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 62,
    paddingHorizontal: 24,
    paddingBottom: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.basic.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  logo: {
    height: 56,
    width: 90,
  },
  links: {},

  linksContent: {
    gap: 20,
    padding: 24,
    paddingBottom: 72, // Espaço para a Navbar
    flexGrow: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    opacity: 0.7,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 24,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.basic.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
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
    color: colors.gray[500],
  },
  modalLinkName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray[700],
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
    backgroundColor: colors.basic.white,
    borderColor: colors.gray[300],
    flexDirection: "row",
    alignItems:"center",
    borderWidth: 1,
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 16,
    height: 48,
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
