import { useContext } from "react";
import { View, Text} from "react-native";
import { ConnContext } from "../../contexts/conexao";
import { Ionicons } from '@expo/vector-icons';

export default function Conexao() {
  const { status } = useContext(ConnContext);
  return !status ? <View style={{
    backgroundColor: "#ff0000",
    paddingVertical: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  }}>
    <Ionicons name="md-cloud-offline" size={14} color="#fff" />
    <Text style={{
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    }}>Conexão perdida</Text>
  </View> : <></>;
}
