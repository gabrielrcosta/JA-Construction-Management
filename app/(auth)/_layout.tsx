import { Stack } from "expo-router";

// This layout wraps the login screen (and any future auth screens like forgot password).
// Stack means screens slide in/out like a card stack — good for auth flows.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
