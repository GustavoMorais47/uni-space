import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import Auth from "./src/components/auth";
import AuthProvider from "./src/contexts/auth";
import ConnProvider from "./src/contexts/conexao";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          background: "#fff",
          card: "#fff",
          text: "#000",
          border: "rgba(0,0,0,0.2)",
          notification: "#000",
          primary: "#000",
        },
      }}
    >
      <StatusBar style="auto" />
      <AuthProvider>
        <ConnProvider>
        <Auth />
        </ConnProvider>
      </AuthProvider>
      <Toast />
    </NavigationContainer>
  );
}
