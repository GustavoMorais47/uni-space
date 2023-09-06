import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";

const { Navigator, Screen } = createStackNavigator();

export default function Publico_Router() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
