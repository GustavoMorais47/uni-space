import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pkg from "../../package.json";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Espacos from "../pages/espaco";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStack } from "../types/index.routes";
import Espacos_Detalhes from "../pages/espaco/detalhes";
import { Role } from "../types";
import Espacos_Adicionar from "../pages/espaco/adicionar";
import Espacos_Editar from "../pages/espaco/editar";
import utils from "../utils";

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
      case "Espacos":
        return (
          utils.possui_permissao([Role.ADMIN, Role.LABS], user!.role) && (
            <TouchableOpacity
              disabled={
                !utils.possui_permissao([Role.ADMIN, Role.LABS], user!.role)
              }
              onPress={() => navigation.navigate("Espacos_Adicionar")}
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
          )
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
            name="Espacos"
            component={Espacos}
            options={{
              title: "Gerenciar Espaços",
            }}
          />
          <Screen
            name="Espacos_Adicionar"
            component={Espacos_Adicionar}
            options={{
              title: "Adicionar Espaço",
            }}
          />
          <Screen
            name="Espacos_Detalhes"
            component={Espacos_Detalhes}
            options={{
              title: "Detalhes do Espaço",
            }}
          />
          <Screen
            name="Espacos_Editar"
            component={Espacos_Editar}
            options={{
              title: "Editar Espaço",
            }}
          />
        </Group>
      )}
    </Navigator>
  );
}
