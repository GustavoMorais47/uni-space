import { Text, TextInput, View } from "react-native";
import Conexao from "../../contexts/conexao";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Gerenciar_Espacos() {
  const [pesquisa, setPesquisa] = useState("");
  return (
    <>
      <Conexao />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 40,
          gap: 40,
        }}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Pesquisar
          </Text>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="search" size={16} color="rgba(0,0,0,0.25)" />
            <TextInput
              placeholder="Pesquise pelo nome ou id"
              keyboardType="web-search"
              value={pesquisa}
              onChangeText={setPesquisa}
              style={{
                flex: 1,
                paddingVertical: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        ></View>
      </View>
    </>
  );
}
