import { FlatList } from "react-native";

import { styles } from "./styles";
import { categorires } from "@/utils/categories";
import { Category } from "@/components/category";

type Props = {
  selected: string;
  onChanged: (category: string) => void;
};

export function Categories({ selected, onChanged }: Props) {
  return (
    <FlatList
      data={categorires}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={item.name === selected}
          onPress={() => onChanged(item.name)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
