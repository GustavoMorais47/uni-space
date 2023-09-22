import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pkg from "../../package.json";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Gerenciar_Espacos from "../pages/gerenciar_espacos";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStack } from "../types/index.routes";
import Gerenciar_Espacos_Detalhes from "../pages/gerenciar_espacos/detalhes";
import { Role } from "../types";
import Gerenciar_Espacos_Adicionar from "../pages/gerenciar_espacos/adicionar";

type StackNavigation = NavigationProp<RootStack>;

const { Navigator, Screen, Group } = createStackNavigator<RootStack>();

export default function Privado_Router() {
  const navigation = useNavigation<StackNavigation>();
  const { handleLogout, user } = useContext(AuthContext);
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
      case "Gerenciamento_de_Espacos":
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Gerenciamento_de_Espacos_Adicionar")
            }
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
      default:
        return undefined;
    }
  };

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        animationEnabled: false,
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
      {(user?.role === Role.ADMIN || user?.role === Role.LABS) && (
        <Group>
          <Screen
            name="Gerenciamento_de_Espacos"
            component={Gerenciar_Espacos}
            options={{
              title: "Gerenciar Espaços",
            }}
          />
          <Screen
            name="Gerenciamento_de_Espacos_Adicionar"
            component={Gerenciar_Espacos_Adicionar}
            options={{
              title: "Adicionar Espaço",
            }}
          />
          <Screen
            name="Gerenciamento_de_Espacos_Detalhes"
            component={Gerenciar_Espacos_Detalhes}
            options={{
              title: "Detalhes do Espaço",
            }}
          />
        </Group>
      )}
    </Navigator>
  );
}
