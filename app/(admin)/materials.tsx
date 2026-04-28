import { View, Text, StyleSheet } from "react-native";

export default function MaterialsScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.tag}>Admin</Text>
        <Text style={styles.title}>Materials</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.icon}>📦</Text>
        <Text style={styles.placeholderText}>Materials management coming soon</Text>
        <Text style={styles.placeholderSub}>Create, edit and delete materials</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0f1012" },
  header: { padding: 24, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: "#2a2d32" },
  tag: { color: "#f59e0b", fontSize: 11, fontWeight: "600", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 },
  title: { color: "#f1f0ee", fontSize: 28, fontWeight: "800" },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  icon: { fontSize: 48, marginBottom: 8 },
  placeholderText: { color: "#f1f0ee", fontSize: 18, fontWeight: "600" },
  placeholderSub: { color: "#7a7d85", fontSize: 14 },
});
