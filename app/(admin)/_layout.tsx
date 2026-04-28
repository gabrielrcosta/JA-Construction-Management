import { Tabs } from "expo-router";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1c1f",
          borderTopColor: "#2a2d32",
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#f59e0b",
        tabBarInactiveTintColor: "#7a7d85",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.5,
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", tabBarIcon: () => <Text>📊</Text> }}
      />
      <Tabs.Screen
        name="approvals"
        options={{ title: "Approvals", tabBarIcon: () => <Text>✅</Text> }}
      />
      <Tabs.Screen
        name="materials"
        options={{ title: "Materials", tabBarIcon: () => <Text>📦</Text> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tabs>
  );
}

// Need to import Text for the icons above
import { Text } from "react-native";
