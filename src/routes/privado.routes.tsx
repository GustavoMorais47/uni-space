import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/home";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import pkg from "../../package.json";
import Suporte from "../pages/suporte";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Gerenciar_Espacos from "../pages/gerenciar_espacos";

type RootStack = {
  Home: undefined;
  Support: undefined;
  Manage_Spaces: undefined;
}

const { Navigator, Screen } = createStackNavigator<RootStack>();


export default function Privado_Router() {
  const { handleLogout } = useContext(AuthContext);
  const app_name = pkg.name.slice(0, 1).toUpperCase() + pkg.name.slice(1);

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerTitleAlign: route.name === "Home" ? "left" : "center",
        title: route.name === "Home" ? app_name : route.name,
        headerBackTitleVisible: false,
        headerRight: () => (
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
        ),
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
      <Screen
        name="Manage_Spaces"
        component={Gerenciar_Espacos}
        options={{
          title: "Gerenciar Espaços",
        }}
      />
    </Navigator>
  );
}
