import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type CategoriesProps = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function Category({ name, icon, isSelected, ...rest }: CategoriesProps) {
  const selectedColor = isSelected ? colors.blue[500] : colors.gray[400];
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons
        name={icon}
        size={16}
        color={selectedColor}
      ></MaterialIcons>
      <Text style={[styles.name, { color: selectedColor }]}>{name}</Text>
    </Pressable>
  );
}
