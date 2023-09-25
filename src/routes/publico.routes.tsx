import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import EscolherPerfil from "../pages/escolherPerfil";
import { PublicoStack } from "../types/index.routes";

const { Navigator, Screen } = createStackNavigator<PublicoStack>();

export default function Publico_Router() {
  return (
    <Navigator 
    initialRouteName="Login"
    screenOptions={{
      headerShown: false
    }}>
      <Screen name="Login" component={Login} />
      <Screen name="EscolherPerfil" component={EscolherPerfil} />
    </Navigator>
  );
}
