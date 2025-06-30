import { Button } from "@/components/button";
import { Folder } from "@/components/folder";
import { Input } from "@/components/input";
import { folderStorage } from "@/storage/folder_storage";
import { LinkStorage, linkStorage } from "@/storage/link_storage";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

export default function Add() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [path, setPath] = useState("/");
  const [isImportant, setIsImportant] = useState(false);

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderModalPath, setFolderModalPath] = useState("/");
  const [folderModalItems, setFolderModalItems] = useState<any[]>([]);

  const { link } = useLocalSearchParams<{ link?: string }>();
  const editingLink = link ? (JSON.parse(link) as LinkStorage) : null;

  useEffect(() => {
    if (editingLink) {
      setName(editingLink.name);
      setUrl(editingLink.url);
      setPath(editingLink.path);
      setIsImportant(editingLink.isImportant);
    }
  }, [link]);

  async function loadFolderModalItems(currentModalPath: string) {
    try {
      const allFolders = await folderStorage.get();
      const folderItems = allFolders
        .filter((folderPath) => {
          if (folderPath === currentModalPath) return false;
          const parentPath = folderPath.slice(
            0,
            folderPath.lastIndexOf("/", folderPath.length - 2) + 1
          );
          return parentPath === currentModalPath;
        })
        .map((folderPath) => {
          const name = folderPath.slice(currentModalPath.length, -1);
          return { type: "folder", name, path: folderPath };
        });

      if (currentModalPath !== "/") {
        const pathSegments = currentModalPath.split("/").filter(Boolean);
        const parentPath =
          "/" +
          pathSegments.slice(0, -1).join("/") +
          (pathSegments.length > 1 ? "/" : "");
        folderItems.unshift({
          type: "back",
          name: ".. Voltar",
          path: parentPath,
        });
      }

      setFolderModalItems(folderItems);
      setFolderModalPath(currentModalPath);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as pastas de destino.");
    }
  }

  function handleOpenFolderModal() {
    loadFolderModalItems("/");
    setShowFolderModal(true);
  }

  function handleSelectFolder() {
    setPath(folderModalPath);
    setShowFolderModal(false);
  }

  async function handleSave() {
    try {
      if (!name.trim()) return Alert.alert("Erro", "Digite o nome do link.");
      if (!url.trim()) return Alert.alert("Erro", "Digite a URL.");
      if (!url.trim().match(/^(https?):\/\//))
        return Alert.alert("Erro", "Digite uma URL válida.");
      if (!path.trim().startsWith("/"))
        return Alert.alert("Erro", "O caminho da pasta é inválido.");

      const normalizedPath =
        path.trim() === "" || path.trim() === "/" ? "/" : path.trim();

      const linkData: LinkStorage = {
        id: editingLink ? editingLink.id : new Date().getTime().toString(),
        name: name.trim(),
        url: url.trim(),
        path: normalizedPath,
        isImportant,
        createdAt: editingLink ? editingLink.createdAt : new Date().getTime(),
      };

      if (normalizedPath !== "/") {
        await folderStorage.add(normalizedPath);
      }

      if (editingLink) {
        await linkStorage.update(linkData);
      } else {
        await linkStorage.save(linkData);
      }

      Alert.alert("Sucesso", "Link salvo com sucesso!", [
        { text: "Ok", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link.");
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color={colors.gray[400]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {editingLink ? "Editar Link" : "Adicionar Link"}
        </Text>
      </View>

      <View style={styles.form}>
        <Input placeholder="Nome do link" value={name} onChangeText={setName} />
        <Input
          placeholder="URL"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.pathSelector}
          onPress={handleOpenFolderModal}
        >
          <Text style={styles.pathSelectorText}>
            Pasta: {path === "/" ? "Principal" : path}
          </Text>
          <MaterialIcons
            name="folder-open"
            size={20}
            color={colors.gray[400]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Marcar como importante</Text>
        <TouchableOpacity onPress={() => setIsImportant((prev) => !prev)}>
          <MaterialIcons
            name={isImportant ? "star" : "star-border"}
            size={28}
            color={isImportant ? colors.yellow[500] : colors.gray[400]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Button title="Salvar" onPress={handleSave} />
      </View>

      <Modal transparent visible={showFolderModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a Pasta</Text>
            <Text style={styles.modalPath}>
              Destino: {folderModalPath === "/" ? "Principal" : folderModalPath}
            </Text>
            <View style={styles.folderListContainer}>
              <FlatList
                data={folderModalItems}
                keyExtractor={(item) => item.path}
                renderItem={({ item }) => (
                  <Folder
                    name={item.name}
                    onPress={() => loadFolderModalItems(item.path)}
                  />
                )}
              />
            </View>
            <Button
              title="Selecionar esta pasta"
              onPress={handleSelectFolder}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowFolderModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
