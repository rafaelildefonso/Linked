import AsyncStorage from "@react-native-async-storage/async-storage";

const FOLDERS_STORAGE_KEY = "folders-storage";

async function get(): Promise<string[]> {
  try {
    const storage = await AsyncStorage.getItem(FOLDERS_STORAGE_KEY);
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    console.error("Failed to get folders", error);
    return [];
  }
}

async function add(newPath: string): Promise<void> {
  try {
    const existingPaths = await get();
    if (!existingPaths.includes(newPath)) {
      const updatedPaths = [...existingPaths, newPath];
      await AsyncStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updatedPaths));
    }
  } catch (error) {
    throw new Error("Failed to add folder path");
  }
}

async function remove(pathToRemove: string): Promise<void> {
  try {
    const existingPaths = await get();
    const updatedPaths = existingPaths.filter(path => !path.startsWith(pathToRemove));
    await AsyncStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(updatedPaths));
  } catch (error) {
    throw new Error("Failed to remove folder path");
  }
}

export const folderStorage = { get, add, remove };
