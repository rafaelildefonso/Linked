import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Text,
  Alert,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { styles } from "./styles";
import { styles as addStyles } from "./add/styles";
import { colors } from "@/styles/colors";

import { Link } from "@/components/link";
import { Folder } from "@/components/folder";
import { Option } from "@/components/option";
import { Navbar, Tab } from "@/components/navbar";
import { linkStorage, LinkStorage } from "@/storage/link_storage";
import { folderStorage } from "@/storage/folder_storage";

type ListItem = (LinkStorage & { type: 'link' }) | { type: 'folder' | 'back' | 'create-folder'; name: string; path: string; id?: string };

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [showFolderOptions, setShowFolderOptions] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [items, setItems] = useState<ListItem[]>([]);
  const [moveModalItems, setMoveModalItems] = useState<ListItem[]>([]);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [selectedFolder, setSelectedFolder] = useState<{ name: string; path: string } | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [selectedTab, setSelectedTab] = useState<Tab>("Inicial");
  const [currentPath, setCurrentPath] = useState("/");
  const [moveModalPath, setMoveModalPath] = useState("/");

  async function loadItems() {
    try {
      const allData = await linkStorage.get();
      const searchTerm = pesquisa.trim().toLowerCase();

      let finalItems: ListItem[] = [];

      if (selectedTab === "Inicial") {
        finalItems = allData.map(link => ({ ...link, type: 'link' }));
      } else if (selectedTab === "Importante") {
        finalItems = allData
          .filter((link) => link.isImportant)
          .map(link => ({ ...link, type: 'link' }));
      } else if (selectedTab === "Pastas") {
        const linkItems: ListItem[] = [];
        const folderPaths = await folderStorage.get();
        const subfolderNames = new Set<string>();

        // Adiciona subpastas a partir dos caminhos de pastas explícitos
        folderPaths.forEach(path => {
          if (path.startsWith(currentPath) && path !== currentPath) {
            const remainingPath = path.substring(currentPath.length);
            const subfolderName = remainingPath.split('/')[0];
            if (subfolderName) {
              subfolderNames.add(subfolderName);
            }
          }
        });

        allData.forEach(link => {
          // Normaliza o caminho do link para comparação para lidar com dados legados
          const normalizedLinkPath = (link.path.endsWith('/') || link.path === '/') ? link.path : link.path + '/';

          if (normalizedLinkPath === currentPath) {
            // Este item é um link que pertence diretamente à pasta atual
            linkItems.push({ ...link, type: 'link' });
          } else if (normalizedLinkPath.startsWith(currentPath)) {
            // Este item está em uma subpasta. Precisamos extrair o nome da subpasta.
            const remainingPath = normalizedLinkPath.substring(currentPath.length);
            const subfolderName = remainingPath.split('/')[0];
            if (subfolderName) {
              subfolderNames.add(subfolderName);
            }
          }
        });

        const allItems: ListItem[] = Array.from(subfolderNames).map(name => ({
          type: 'folder',
          name: name,
          path: currentPath + name + '/'
        }));

        // Adiciona o botão de criar pasta
        allItems.unshift({ type: "create-folder", name: "Criar nova pasta", path: "" });

        if (currentPath !== "/") {
          const pathSegments = currentPath.split('/').filter(Boolean);
          const parentPath = '/' + pathSegments.slice(0, -1).join('/') + (pathSegments.length > 1 ? '/' : '');
          allItems.unshift({ type: "back", name: "Voltar", path: parentPath });
        }

        finalItems = [...allItems, ...linkItems];
      }

      const searchedItems = searchTerm === '' 
        ? finalItems 
        : finalItems.filter(item => item.name.toLowerCase().includes(searchTerm));
      
      setItems(searchedItems);

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Erro ao buscar itens");
    }
  }



  function handleDetails(selected: LinkStorage) {
    setShowModal(true);
    setLink(selected);
  }

  async function handleOpen() {
    if (link.url) {
      await Linking.openURL(link.url);
      setShowModal(false);
    }
  }

  async function handleRemove() {
    Alert.alert("Remover Link", `Deseja remover o link "${link.name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        onPress: async () => {
          await linkStorage.remove(link.id!);
          setShowModal(false);
          loadItems();
        },
      },
    ]);
  }

  function handleFolderLongPress(folder: { name: string, path: string }) {
    setSelectedFolder(folder);
    setShowFolderOptions(true);
  }

  async function handleDeleteFolder() {
    if (!selectedFolder) return;

    Alert.alert("Excluir Pasta", `Tem certeza que deseja excluir a pasta "${selectedFolder.name}" e todo o seu conteúdo?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await linkStorage.removeLinksByPath(selectedFolder.path);
            await folderStorage.remove(selectedFolder.path);
            setShowFolderOptions(false);
            loadItems();
            Alert.alert("Sucesso!", `A pasta "${selectedFolder.name}" foi excluída.`);
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a pasta.");
          }
        },
      },
    ]);
  }

  async function loadMoveModalItems(path: string) {
    try {
      const allFolders = await folderStorage.get();
      const folderItems: ListItem[] = allFolders
        .filter(folderPath => {
          if (folderPath === path) return false;
          const parentPath = folderPath.slice(0, folderPath.lastIndexOf('/', folderPath.length - 2) + 1);
          return parentPath === path;
        })
        .map(folderPath => {
          const name = folderPath.slice(path.length, -1);
          return { type: 'folder', name, path: folderPath };
        });

      if (path !== "/") {
        const pathSegments = path.split('/').filter(Boolean);
        const parentPath = '/' + pathSegments.slice(0, -1).join('/') + (pathSegments.length > 1 ? '/' : '');
        folderItems.unshift({ type: 'back', name: 'Voltar', path: parentPath });
      }

      setMoveModalItems(folderItems);
      setMoveModalPath(path);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as pastas de destino.");
    }
  }

  function handleMoveFolderOption() {
    setShowFolderOptions(false);
    setShowMoveModal(true);
    loadMoveModalItems("/");
  }

  async function handleConfirmMove() {
    if (!selectedFolder) return;

    try {
      await linkStorage.moveFolder(selectedFolder.path, moveModalPath);
      await folderStorage.remove(selectedFolder.path);
      const newFolderPath = moveModalPath + selectedFolder.name + '/';
      await folderStorage.add(newFolderPath);

      setShowMoveModal(false);
      loadItems();
      Alert.alert("Sucesso!", `A pasta "${selectedFolder.name}" foi movida.`);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível mover a pasta.");
    }
  }

  function handlePathChange(path: string) {
    setPesquisa("");
    setCurrentPath(path);
  }

  async function handleCreateFolder() {
    const trimmedName = newFolderName.trim();
    if (!trimmedName || trimmedName.includes("/")) {
      return Alert.alert("Nome inválido", "O nome da pasta não pode estar vazio ou conter o caractere '/'.");
    }

    try {
      const newPath = currentPath + trimmedName + '/';
      await folderStorage.add(newPath);
      setNewFolderName("");
      setShowCreateFolderModal(false);
      loadItems();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a pasta.");
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [pesquisa, selectedTab, currentPath])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />
        <View style={styles.inputPesquisaContainer}>
          <MaterialIcons name="search" size={18} color={colors.gray[400]} />
          <TextInput
            placeholder={"Pesquisar"}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>
        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={24} color={colors.blue[500]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id || `${item.path}-${index}`}
        renderItem={({ item }) => {
          if (item.type === 'link') {
            return (
              <Link
                name={item.name}
                url={item.url}
                faviconUrl={`https://www.google.com/s2/favicons?sz=64&domain_url=${item.url}`}
                onDetails={() => handleDetails(item)}
              />
            );
          }

          if (item.type === 'back' || item.type === 'create-folder') {
            return (
              <Option
                icon={item.type === 'back' ? 'arrow-back' : 'create-new-folder'}
                name={item.name}
                onPress={() => {
                  if (item.type === 'back') {
                    handlePathChange(item.path);
                  } else {
                    setNewFolderName('');
                    setShowCreateFolderModal(true);
                  }
                }}
              />
            );
          }

          return (
            <Folder
              name={item.name}
              onPress={() => handlePathChange(item.path)}
              onLongPress={() => handleFolderLongPress(item as { name: string; path: string })}
            />
          );
        }}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Link Details Modal */}
      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              {link.url && <Image source={{ uri: `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}` }} style={styles.modalFavicon} />}
              <Text style={styles.modalCategory}>{link.path}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>
            {link.createdAt && <Text style={styles.modalDate}>Adicionado em: {new Date(link.createdAt).toLocaleDateString("pt-BR")}</Text>}
            <View style={styles.modalFotter}>
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleRemove} />
              <Option name="Editar" icon="edit" onPress={() => { setShowModal(false); router.navigate({ pathname: "/add", params: { link: JSON.stringify(link) } }); }} />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Folder Options Modal */}
      <Modal transparent visible={showFolderOptions} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="folder" size={20} color={colors.gray[400]} />
              <Text style={styles.modalCategory}>{selectedFolder?.name}</Text>
              <TouchableOpacity onPress={() => setShowFolderOptions(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>O que deseja fazer?</Text>
            <View style={styles.modalFotter}>
              <Option name="Mover" icon="drive-file-move" onPress={handleMoveFolderOption} />
              <Option name="Excluir" icon="delete" variant="secondary" onPress={handleDeleteFolder} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Move Folder Modal */}
      <Modal transparent visible={showMoveModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.moveModalTitle}>Mover "{selectedFolder?.name}" para:</Text>
            <Text style={styles.modalCategory}>Destino: {moveModalPath}</Text>
            <View style={{ height: 200, borderWidth: 1, borderColor: colors.gray[200], borderRadius: 8, marginTop: 8 }}>
              <FlatList
                data={moveModalItems}
                keyExtractor={(item, index) => `${item.path}-${index}`}
                renderItem={({ item }) => <Folder name={item.name} onPress={() => loadMoveModalItems(item.path)} />}
              />
            </View>
            <View style={styles.moveModalFooter}>
              <TouchableOpacity style={styles.moveModalButton} onPress={handleConfirmMove}>
                <Text style={styles.moveModalButtonText}>Mover para cá</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}} onPress={() => setShowMoveModal(false)}>
              <Text style={{color: colors.gray[400]}}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Folder Modal */}
      <Modal transparent visible={showCreateFolderModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.moveModalTitle}>Criar Nova Pasta</Text>
            <TextInput
              placeholder="Nome da pasta"
              style={addStyles.input}
              value={newFolderName}
              onChangeText={setNewFolderName}
              autoFocus
            />
            <View style={styles.moveModalFooter}>
              <TouchableOpacity style={styles.moveModalButton} onPress={handleCreateFolder}>
                <Text style={styles.moveModalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignSelf: 'center', marginTop: 16}} onPress={() => { setNewFolderName(''); setShowCreateFolderModal(false); }}>
              <Text style={{color: colors.gray[400]}}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Navbar selected={selectedTab} onSelect={(tab) => { setPesquisa(''); setSelectedTab(tab); }} />
    </View>
  );
}
