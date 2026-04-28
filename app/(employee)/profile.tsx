import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.avatar}>👤</Text>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role?.toUpperCase()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>
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
  body: { flex: 1, padding: 24, gap: 16 },
  card: {
    backgroundColor: "#1a1c1f",
    borderWidth: 1,
    borderColor: "#2a2d32",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  avatar: { fontSize: 48, marginBottom: 8 },
  name: { color: "#f1f0ee", fontSize: 20, fontWeight: "700", textTransform: "capitalize" },
  email: { color: "#7a7d85", fontSize: 14 },
  roleBadge: {
    backgroundColor: "rgba(245,158,11,0.12)",
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.3)",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },
  roleText: { color: "#f59e0b", fontSize: 11, fontWeight: "600", letterSpacing: 1.5 },
  logoutBtn: {
    backgroundColor: "#1a1c1f",
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  logoutText: { color: "#ef4444", fontSize: 15, fontWeight: "600" },
});
