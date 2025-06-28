import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEYS = "links-storage";

export type LinkStorage = {
  id: string;
  name: string;
  url: string;
  path: string;
  isImportant: boolean;
  createdAt: number;
};

async function get(): Promise<LinkStorage[]> {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEYS);
  const response = storage ? JSON.parse(storage) : [];

  return response;
}

async function save(newLink: LinkStorage) {
  try {
    const storage = await get();
    const updated = JSON.stringify([...storage, newLink]);

    await AsyncStorage.setItem(LINKS_STORAGE_KEYS, updated);
  } catch (error) {
    throw error;
  }
}

async function moveFolder(sourcePath: string, newParentPath: string) {
  try {
    const storage = await get();

    const folderName = sourcePath.split('/').filter(Boolean).pop();
    if (!folderName) {
      throw new Error("Caminho de origem inválido");
    }
    // Garante que o caminho pai termine com / e constrói o novo prefixo
    const newPathPrefix = newParentPath.endsWith('/') ? `${newParentPath}${folderName}/` : `${newParentPath}/${folderName}/`;

    const updatedStorage = storage.map((link) => {
      // Normaliza o caminho do link para garantir uma comparação consistente
      const normalizedLinkPath = (link.path.endsWith('/') || link.path === '/') ? link.path : link.path + '/';

      if (normalizedLinkPath.startsWith(sourcePath)) {
        // O link está na pasta a ser movida ou em uma subpasta dela.
        // Substituímos o prefixo do caminho antigo pelo novo.
        const newLinkPath = normalizedLinkPath.replace(sourcePath, newPathPrefix);
        return { ...link, path: newLinkPath };
      }
      return link;
    });

    await AsyncStorage.setItem(
      LINKS_STORAGE_KEYS,
      JSON.stringify(updatedStorage)
    );
  } catch (error) {
    throw error;
  }
}

async function removeFolder(folderPath: string) {
  try {
    const storage = await get();
    const updatedStorage = storage.filter(
      (link) => !link.path.startsWith(folderPath)
    );

    await AsyncStorage.setItem(
      LINKS_STORAGE_KEYS,
      JSON.stringify(updatedStorage)
    );
  } catch (error) {
    throw error;
  }
}

async function update(updatedLink: LinkStorage) {
  try {
    const storage = await get();
    const updatedStorage = storage.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );

    await AsyncStorage.setItem(
      LINKS_STORAGE_KEYS,
      JSON.stringify(updatedStorage)
    );
  } catch (error) {
    throw error;
  }
}

async function remove(id: string) {
  try {
    const storage = await get();
    const updated = storage.filter((link) => link.id !== id);

    await AsyncStorage.setItem(LINKS_STORAGE_KEYS, JSON.stringify(updated));
  } catch (error) {
    throw error;
  }
}

async function removeLinksByPath(pathToRemove: string): Promise<void> {
  try {
    const storage = await get();
    const updatedStorage = storage.filter((link) => !link.path.startsWith(pathToRemove));
    await AsyncStorage.setItem(LINKS_STORAGE_KEYS, JSON.stringify(updatedStorage));
  } catch (error) {
    throw new Error("Failed to remove links by path");
  }
}

export const linkStorage = {
  removeLinksByPath, get, save, update, remove, removeFolder, moveFolder
};
