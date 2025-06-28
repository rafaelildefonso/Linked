import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

type Props = {
  name: string;
  url: string;
  faviconUrl: string;
  onDetails: () => void;
};

export function Link({ name, url, faviconUrl, onDetails }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: faviconUrl }} style={styles.favicon} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.url} numberOfLines={1}>
          {url}
        </Text>
      </View>
      <TouchableOpacity onPress={onDetails}>
        <MaterialIcons
          name="more-horiz"
          size={20}
          color={colors.gray[400]}
        />
      </TouchableOpacity>
    </View>
  );
}
