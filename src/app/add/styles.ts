import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 62,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
    gap: 16,
  },
  title: {
    flex: 1,
    color: colors.gray[600],
    fontSize: 20,
    fontWeight: "600",
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 16,
  },
  pathSelector: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pathSelectorText: {
    fontSize: 16,
    color: colors.gray[600],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.basic.white,
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalPath: {
    fontSize: 16,
    color: colors.gray[500],
    marginBottom: 16,
    textAlign: "center",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  folderListContainer: {
    height: 300, // Adjust as needed
    marginBottom: 16,
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: 16,
  },
  cancelButtonText: {
    color: colors.gray[400],
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.gray[600],
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  label: {
    color: colors.gray[500],
    fontSize: 16,
  },
});
