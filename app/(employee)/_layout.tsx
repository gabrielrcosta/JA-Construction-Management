import { Tabs } from "expo-router";
import { View, Text } from "react-native";

// Simple tab icon component
function TabIcon({ label, active }: { label: string; active: boolean }) {
  return (
    <Text style={{ fontSize: 20 }}>
      {label === "Inventory" ? "📦" : label === "Expenses" ? "💰" : "👤"}
    </Text>
  );
}

// This layout defines the tab bar that employees see at the bottom of every screen
export default function EmployeeLayout() {
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
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ focused }) => <TabIcon label="Inventory" active={focused} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Expenses",
          tabBarIcon: ({ focused }) => <TabIcon label="Expenses" active={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" active={focused} />,
        }}
      />
    </Tabs>
  );
}
