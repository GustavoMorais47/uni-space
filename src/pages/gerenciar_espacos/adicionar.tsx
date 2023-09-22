import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import Input from "../../components/conexao/input";
import { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Button from "../../components/button";
import Slider from "../../components/slider";
import config from "../../config.json";
import { RootStack } from "../../types/index.routes";
import useCameraPicker from "../../hooks/useCameraPicker";
import useGaleriaPicker from "../../hooks/useGaleriaPicker";

type RootStackNavigation = NavigationProp<RootStack>;

export default function Gerenciar_Espacos_Adicionar() {
  const navigation = useNavigation<RootStackNavigation>();
  const [imagens, setImagens] = useState<string[]>([]);
  const [nome, setNome] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [capacidade, setCapacidade] = useState<number>(0);

  const [permanecer, setPermanecer] = useState<boolean>(false);

  const adicionarImagemPelaGaleria = async () => {
    const imagem = await useGaleriaPicker();

    if (!imagem) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Não foi possível carregar a imagem",
      });
      return;
    }

    setImagens([...imagens, imagem]);
  };

  const adicionarImagemPelaCamera = async () => {
    const imagem = await useCameraPicker();

    if (!imagem) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Não foi possível carregar a imagem",
      });
      return;
    }

    setImagens([...imagens, imagem]);
  };

  const removerImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  const Cadastrar = async () => {
    if (nome.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Preencha o nome do espaço",
      });
      return;
    }

    if (localizacao.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Preencha a localização do espaço",
      });
      return;
    }
    Alert.alert(
      "Cadastrar",
      "Deseja realmente cadastrar este espaço? O mesmo não poderá ser deletado posteriormente.",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              // const response = await api.post("/espacos", {});

              // if (response.status !== 201) {
              //   Toast.show({
              //     type: "error",
              //     text1: "Ops!",
              //     text2: "Ocorreu um erro ao cadastrar o espaço",
              //   });
              //   return;
              // }

              Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: "Espaço cadastrado com sucesso",
              });

              if (permanecer) {
                setNome("");
                setLocalizacao("");
                setCapacidade(0);
                setImagens([]);
              } else {
                navigation.navigate("Gerenciamento_de_Espacos_Detalhes", {
                  id: "Teste de ID",
                });
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Ops!",
                text2: "Ocorreu um erro ao cadastrar o espaço",
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
          <Card
            title="Fotos"
            style={{
              gap: 10,
            }}
          >
            <Slider images={imagens} onLongPress={removerImagem} fullImage />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Atenção:{" "}
                </Text>
                São permitidas apenas {config.gerenciamento_espacos.qtd_imagens}{" "}
                {config.gerenciamento_espacos.qtd_imagens > 1
                  ? "imagens!"
                  : "imagem"}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Atenção:{" "}
                </Text>
                Precione e segure para excluir uma imagem
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Button
                onPress={adicionarImagemPelaCamera}
                active={
                  imagens.length < config.gerenciamento_espacos.qtd_imagens
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Ionicons
                    name="camera"
                    size={30}
                    color={
                      imagens.length < config.gerenciamento_espacos.qtd_imagens
                        ? "#fff"
                        : "rgba(0,0,0,0.5)"
                    }
                  />
                  <Text
                    style={{
                      color:
                        imagens.length <
                        config.gerenciamento_espacos.qtd_imagens
                          ? "#fff"
                          : "rgba(0,0,0,0.5)",
                    }}
                  >
                    Capturar
                  </Text>
                </View>
              </Button>
              <Button
                onPress={adicionarImagemPelaGaleria}
                active={
                  imagens.length < config.gerenciamento_espacos.qtd_imagens
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Ionicons
                    name="cloud-upload"
                    size={30}
                    color={
                      imagens.length < config.gerenciamento_espacos.qtd_imagens
                        ? "#fff"
                        : "rgba(0,0,0,0.5)"
                    }
                  />
                  <Text
                    style={{
                      color:
                        imagens.length <
                        config.gerenciamento_espacos.qtd_imagens
                          ? "#fff"
                          : "rgba(0,0,0,0.5)",
                    }}
                  >
                    Carregar
                  </Text>
                </View>
              </Button>
            </View>
          </Card>
          <Card
            title="Informações"
            style={{
              gap: 10,
            }}
          >
            <Input
              title="Nome"
              valor={nome}
              setValor={setNome}
              placeholder="Digite o nome do espaço"
            />
            <Input
              title="Localização"
              valor={localizacao}
              setValor={setLocalizacao}
              placeholder="Digite a localização do espaço"
            />
            <Input
              title="Capacidade"
              valor={capacidade.toString()}
              setValor={(valor) =>
                setCapacidade(Number(valor.replace(/\D/g, "")))
              }
              placeholder="Digite a capacidade do espaço"
              keyboardType="numeric"
            />
          </Card>
          <Card
            style={{
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Permanecer na tela
              </Text>
              <Switch
                value={permanecer}
                onValueChange={setPermanecer}
                thumbColor={permanecer ? "#000" : "#eee"}
                trackColor={{
                  false: "#ddd",
                  true: "#ddd",
                }}
              />
            </View>
          </Card>
          <Card
            style={{
              gap: 10,
            }}
          >
            <Button title="Adicionar" onPress={Cadastrar} />
            <Button title="Limpar" type="secundary" />
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
