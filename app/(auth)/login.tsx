import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<"employee" | "admin">("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Basic validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await login(email, password, role);
      // Navigation happens automatically via the root _layout.tsx
      // which checks the user role and redirects accordingly
    } catch (e: any) {
      setError(e.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Brand header */}
        <View style={styles.brand}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Field Management System</Text>
          </View>
          <Text style={styles.brandName}>
            <Text style={styles.brandAccent}>JA</Text> Construction
          </Text>
          <Text style={styles.brandSub}>Operations Platform</Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in</Text>

          {/* Error banner */}
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email field */}
          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@jaconstruction.com"
              placeholderTextColor="#4a4d55"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password field */}
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor="#4a4d55"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPass((s) => !s)}
                style={styles.eyeBtn}
              >
                <Text style={styles.eyeText}>{showPass ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot password */}
          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Role selector */}
          <Text style={styles.dividerLabel}>Sign in as</Text>
          <View style={styles.roleRow}>
            {(["employee", "admin"] as const).map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.rolePill, role === r && styles.rolePillActive]}
                onPress={() => setRole(r)}
              >
                <Text style={styles.roleIcon}>{r === "employee" ? "🪖" : "🔑"}</Text>
                <Text style={[styles.roleLabel, role === r && styles.roleLabelActive]}>
                  {r === "employee" ? "Employee" : "Admin"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit button */}
          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0f1012" />
            ) : (
              <Text style={styles.btnText}>
                Sign in as {role === "admin" ? "Administrator" : "Employee"}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Need access? Contact your site administrator.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f1012",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  brand: {
    marginBottom: 32,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(245,158,11,0.12)",
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.3)",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#f59e0b",
  },
  badgeText: {
    color: "#f59e0b",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  brandName: {
    fontSize: 38,
    fontWeight: "800",
    color: "#f1f0ee",
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: "#f59e0b",
  },
  brandSub: {
    fontSize: 13,
    color: "#7a7d85",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#1a1c1f",
    borderWidth: 1,
    borderColor: "#2a2d32",
    borderRadius: 12,
    padding: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f0ee",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 20,
  },
  errorBanner: {
    backgroundColor: "rgba(239,68,68,0.08)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#fca5a5",
    fontSize: 13,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7a7d85",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#0f1012",
    borderWidth: 1,
    borderColor: "#2a2d32",
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    color: "#f1f0ee",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eyeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  eyeText: {
    color: "#7a7d85",
    fontSize: 13,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#7a7d85",
    fontSize: 12,
  },
  dividerLabel: {
    textAlign: "center",
    color: "#7a7d85",
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  roleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 22,
  },
  rolePill: {
    flex: 1,
    backgroundColor: "#0f1012",
    borderWidth: 1,
    borderColor: "#2a2d32",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  rolePillActive: {
    borderColor: "#f59e0b",
    backgroundColor: "rgba(245,158,11,0.08)",
  },
  roleIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7a7d85",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  roleLabelActive: {
    color: "#f59e0b",
  },
  btn: {
    backgroundColor: "#f59e0b",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#0f1012",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  footer: {
    textAlign: "center",
    color: "#7a7d85",
    fontSize: 12,
    marginTop: 20,
  },
});
