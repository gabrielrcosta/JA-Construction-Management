import { View, Text, StyleSheet } from "react-native";

export default function ExpensesScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
      </View>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>💰</Text>
        <Text style={styles.placeholderText}>Expenses module coming soon</Text>
        <Text style={styles.placeholderSub}>Submit receipts, track approvals</Text>
      </View>
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
  title: { color: "#f1f0ee", fontSize: 28, fontWeight: "800" },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  placeholderIcon: { fontSize: 48, marginBottom: 8 },
  placeholderText: { color: "#f1f0ee", fontSize: 18, fontWeight: "600" },
  placeholderSub: { color: "#7a7d85", fontSize: 14 },
});
