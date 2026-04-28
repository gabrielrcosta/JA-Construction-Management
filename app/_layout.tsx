import { useEffect } from "react";
import { Slot, Redirect, useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "../global.css";

function RootLayoutNav() {
  const { user, loading } = useAuth();

  // Show a spinner while we check if user is logged in
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f1012" }}>
        <ActivityIndicator color="#f59e0b" size="large" />
      </View>
    );
  }

  // Not logged in → go to login screen
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Logged in → go to the right area based on role
  if (user.role === "admin") {
    return <Redirect href="/(admin)/dashboard" />;
  }

  return <Redirect href="/(employee)/inventory" />;
}

export default function RootLayout() {
  return (
    // AuthProvider wraps everything so every screen can access the logged-in user
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
