// app/(employee)/inventory.tsx
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import MaterialCard from "../../components/materialCard";
import { MOCK_MATERIALS } from "../../data/material";

export default function InventoryScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name} 👋</Text>
        <Text style={styles.title}>Inventory</Text>
        <Text style={styles.subtitle}>{MOCK_MATERIALS.length} materials in stock</Text>
      </View>

      {/* Materials List */}
      <FlatList
        data={MOCK_MATERIALS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MaterialCard material={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f1012" },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2d32",
    marginBottom: 12,
  },
  greeting: { color: "#7a7d85", fontSize: 14, marginBottom: 4 },
  title: { color: "#f1f0ee", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#7a7d85", fontSize: 13, marginTop: 4 },
  list: { paddingBottom: 24 },
});