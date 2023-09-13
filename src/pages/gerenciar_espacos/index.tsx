import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { useContext, useState } from "react";
import Dashboard from "../../components/dashboard";
import { AuthContext } from "../../contexts/auth";
import db from "../../db.json";
import { EspacoType } from "../../types";
import Card from "../../components/card";
import Conexao from "../../components/conexao";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Input from "../../components/conexao/input";

const { width } = Dimensions.get("window");

const ordens = [
  "A - Z",
  "Z - A",
  "Ativos",
  "Inativos",
  "Maior Capacidade",
  "Menor Capacidade",
];

export default function Gerenciar_Espacos() {
  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [indexOrdem, setIndexOrdem] = useState<number>(0);
  const [ordem, setOrdem] = useState<number>(indexOrdem);
  const [pesquisa, setPesquisa] = useState("");
  const [espacos, setEspacos] = useState<EspacoType[]>(
    db.espacos.data as never[]
  );

  const filtrar = () => {
    setModal(false);
    setOrdem(indexOrdem);
    const espacosFiltrados: EspacoType[] = db.espacos.data.filter((espaco) => {
      if (pesquisa === "") return true;
      return espaco.nome.toLowerCase().includes(pesquisa.toLowerCase());
    }) as never[];
    switch (indexOrdem) {
      case 0:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.nome > b.nome) return 1;
            if (a.nome < b.nome) return -1;
            return 0;
          })
        );
      case 1:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.nome > b.nome) return -1;
            if (a.nome < b.nome) return 1;
            return 0;
          })
        );
      case 2:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.status > b.status) return -1;
            if (a.status < b.status) return 1;
            return 0;
          })
        );
      case 3:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.status > b.status) return 1;
            if (a.status < b.status) return -1;
            return 0;
          })
        );
      case 4:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.capacidade > b.capacidade) return -1;
            if (a.capacidade < b.capacidade) return 1;
            return 0;
          })
        );
      case 5:
        return setEspacos(
          espacosFiltrados.sort((a, b) => {
            if (a.capacidade > b.capacidade) return 1;
            if (a.capacidade < b.capacidade) return -1;
            return 0;
          })
        );
    }
  };
  return (
    <>
      <Conexao />
      <Modal transparent visible={modal}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                maxWidth: "90%",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                  setIndexOrdem(ordem);
                }}
              >
                <Ionicons name="close" size={20} color="rgba(0,0,0,0.3)" />
              </TouchableOpacity>
              <View
                style={{
                  width: width * 0.7,
                  gap: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Pesquisar
                </Text>
                <Input
                  valor={pesquisa}
                  setValor={setPesquisa}
                  placeholder="Pesquisar"
                  iconLeft={
                    <Ionicons name="search" size={16} color="rgba(0,0,0,0.3)" />
                  }
                  iconRight={
                    pesquisa.length > 0 && (
                      <TouchableOpacity onPress={() => setPesquisa("")}>
                        <Ionicons
                          name="close"
                          size={20}
                          color="rgba(0,0,0,0.3)"
                        />
                      </TouchableOpacity>
                    )
                  }
                />
              </View>
              <View
                style={{
                  width: width * 0.7,
                  gap: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Ordenar
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <FlatList
                    data={ordens}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setIndexOrdem(index)}
                        style={{
                          backgroundColor:
                            index === indexOrdem ? "#000" : "transparent",
                          padding: 10,
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight:
                              index === indexOrdem ? "bold" : "normal",
                            color: index === indexOrdem ? "#fff" : "#000",
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={{
                      justifyContent: "space-around",
                      gap: 10,
                    }}
                  />
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={filtrar}
                  style={{
                    backgroundColor: "#000",
                    padding: 10,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    Aplicar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <VirtualizedList
        data={espacos}
        initialNumToRender={4}
        ListHeaderComponent={() => (
          <View
            style={{
              gap: 20,
            }}
          >
            <Dashboard role={user!.role} page="Manage_Spaces" />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Espaços
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  Última atualização:{" "}
                  {new Date(db.espacos.ultima_atualizacao).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  {ordens[ordem]}
                </Text>
                <Card onPress={() => setModal(true)}>
                  <MaterialIcons
                    name="filter-list-alt"
                    size={16}
                    color="black"
                  />
                </Card>
              </View>
            </View>
          </View>
        )}
        ListHeaderComponentStyle={{
          marginBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: EspacoType; index: number }) => (
          <Card
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              marginBottom: index === espacos.length - 1 ? 40 : 0,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "#eee",
                  overflow: "hidden",
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.nome}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  {item.localizacao}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                  }}
                >
                  Capacidade: {item.capacidade}{" "}
                  {item.capacidade > 1 ? "pessoas" : "pessoa"}
                </Text>
              </View>
            </View>
            <View>
              <Text>{item.status ? "Ativo" : "Inativo"}</Text>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#eee",
              marginVertical: 10,
              width: "60%",
              alignSelf: "center",
            }}
          />
        )}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "300",
            }}
          >
            Nenhum espaço encontrado
          </Text>
        )}
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      />
    </>
  );
}
