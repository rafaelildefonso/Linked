import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

export type Tab = "Inicial" | "Pastas" | "Importante";

const TABS_CONFIG: { name: Tab; icon: keyof typeof MaterialIcons.glyphMap }[] = [
  { name: "Inicial", icon: "home" },
  { name: "Pastas", icon: "folder" },
  { name: "Importante", icon: "star" },
];

type Props = {
  selected: Tab;
  onSelect: (tab: Tab) => void;
};

export function Navbar({ selected, onSelect }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {TABS_CONFIG.map(({ name, icon }) => (
        <TouchableOpacity
          key={name}
          style={styles.tab}
          onPress={() => onSelect(name)}
        >
          <MaterialIcons
            name={icon}
            size={28}
            color={selected === name ? colors.blue[500] : colors.gray[400]}
          />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}
