import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

type Props = {
  name: string;
  onPress: () => void;
  onLongPress?: () => void;
};

export function Folder({ name, onPress, onLongPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <MaterialIcons name="folder" size={24} color={colors.blue[500]} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}
