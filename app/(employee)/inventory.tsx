// app/(employee)/inventory.tsx
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import MaterialCard from "../../components/materialCard";
import { MOCK_MATERIALS } from "../../data/material";

export default function InventoryScreen() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  // Filter materials based on search input
  const filtered = MOCK_MATERIALS.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name} 👋</Text>
        <Text style={styles.title}>Inventory</Text>
        <Text style={styles.subtitle}>{filtered.length} materials found</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search materials..."
          placeholderTextColor="#7a7d85"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Materials List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MaterialCard material={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No materials found</Text>
          </View>
        }
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
  },
  greeting: { color: "#7a7d85", fontSize: 14, marginBottom: 4 },
  title: { color: "#f1f0ee", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#7a7d85", fontSize: 13, marginTop: 4 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: "#1a1d21",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2a2d32",
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#f1f0ee",
    fontSize: 15,
  },
  list: { paddingBottom: 24 },
  empty: { alignItems: "center", marginTop: 60, gap: 8 },
  emptyIcon: { fontSize: 40 },
  emptyText: { color: "#7a7d85", fontSize: 16 },
});