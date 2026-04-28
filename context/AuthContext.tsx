import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

// --- Types ---
// This describes what a logged-in user looks like
export type UserRole = "employee" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// This describes everything AuthContext provides to the rest of the app
interface AuthContextType {
  user: User | null;       // null = not logged in
  loading: boolean;        // true while we check SecureStore on startup
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

// --- Create the context ---
const AuthContext = createContext<AuthContextType | null>(null);

// --- Provider component ---
// Wrap your whole app in this so every screen can access auth
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On app startup: check if there's a saved session
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const saved = await SecureStore.getItemAsync("user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      // No saved session — that's fine
    } finally {
      setLoading(false);
    }
  }

  // Login function — called from the login screen
  // When you connect a backend (Firebase/Supabase) you'll replace the mock below
  async function login(email: string, password: string, role: UserRole) {
    // ---- MOCK AUTH (replace this with real backend call later) ----
    // For now we simulate a successful login so you can test navigation
    if (!email || !password) {
      throw new Error("Please fill in all fields.");
    }

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));

    const mockUser: User = {
      id: "user-001",
      email,
      name: email.split("@")[0],
      role,
    };
    // ----------------------------------------------------------------

    // Save the user to secure storage so session persists after app restart
    await SecureStore.setItemAsync("user", JSON.stringify(mockUser));
    setUser(mockUser);
  }

  // Logout function — clears the session
  async function logout() {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- Custom hook ---
// Use this in any screen: const { user, logout } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
