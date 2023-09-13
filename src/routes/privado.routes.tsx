import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pkg from "../../package.json";
import Suporte from "../pages/suporte";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Gerenciar_Espacos from "../pages/gerenciar_espacos";
import { useNavigation } from "@react-navigation/native";
import Gerenciar_Espacos_Adicionar from "../pages/gerenciar_espacos/add";
import { RootStack } from "../types/index.routes";

const { Navigator, Screen, Group } = createStackNavigator<RootStack>();

export default function Privado_Router() {
  const navigation = useNavigation();
  const { handleLogout } = useContext(AuthContext);
  const app_name = pkg.name.slice(0, 1).toUpperCase() + pkg.name.slice(1);

  const iconRight = (route: keyof RootStack): React.ReactNode => {
    switch (route) {
      case "Home":
        return (
          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="person-circle-outline" size={26} color="black" />
          </TouchableOpacity>
        );
      case "Manage_Spaces":
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Manage_Spaces_Add" as never)}
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add-circle-outline" size={26} color="black" />
          </TouchableOpacity>
        );
      case "Manage_Spaces_Add":
        return null;
      default:
        return undefined;
    }
  };

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerTitleAlign: route.name === "Home" ? "left" : "center",
        title: route.name === "Home" ? app_name : route.name,
        headerBackTitleVisible: false,
        headerRight: () => iconRight(route.name as keyof RootStack),
        headerRightContainerStyle: {
          paddingRight: 10,
        },
      })}
    >
      <Screen name="Home" component={Home} />
      <Screen
        name="Support"
        component={Suporte}
        options={{
          title: "Suporte",
        }}
      />
      <Group>
        <Screen
          name="Manage_Spaces"
          component={Gerenciar_Espacos}
          options={{
            title: "Gerenciar Espaços",
          }}
        />
        <Screen
          name="Manage_Spaces_Add"
          component={Gerenciar_Espacos_Adicionar}
          options={{
            title: "Adicionar Espaço",
          }}
        />
      </Group>
    </Navigator>
  );
}
