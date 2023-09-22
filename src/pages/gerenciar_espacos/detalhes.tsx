import { ScrollView, TouchableOpacity, View } from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import { useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStack } from "../../types/index.routes";
import { Ionicons } from "@expo/vector-icons";

type RootStackNavigation = NavigationProp<RootStack>;

export default function Gerenciar_Espacos_Detalhes() {
  const navigation = useNavigation<RootStackNavigation>();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Detalhes do Espaços",
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.7}
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="create-outline" size={26} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <>
      <Conexao />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            gap: 20,
          }}
        >
          <Card title="Fotos">
            <></>
          </Card>
          <Card title="Informações">
            <></>
          </Card>
            <Card title="QR Code">
                <></>
            </Card>
        </View>
      </ScrollView>
    </>
  );
}
