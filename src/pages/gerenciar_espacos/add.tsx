import { View, ScrollView, TouchableOpacity, Text, Switch } from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import Input from "../../components/conexao/input";
import { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ModalCustom from "../../components/modal";
import Button from "../../components/button";
import Slider from "../../components/slider";
import config from "../../config.json";

export default function Gerenciar_Espacos_Adicionar() {
  const navigation = useNavigation();
  const [imagens, setImagens] = useState<string[]>([]);
  const [nome, setNome] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [capacidade, setCapacidade] = useState<number>(0);

  const [mostrarOpcoes, setMostrarOpcoes] = useState<boolean>(false);
  const [permanecer, setPermanecer] = useState<boolean>(false);

  const pickImage = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Toast.show({
        type: "error",
        text1: "Permissão negada",
        text2:
          "Você precisa permitir o acesso a galeria para adicionar imagens",
      });
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) return;

    if (!result.assets[0].base64) return;
    setImagens([
      ...imagens,
      `data:image/png;base64,${result.assets[0].base64}`,
    ]);
  };

  const openCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Toast.show({
        type: "error",
        text1: "Permissão negada",
        text2: "Você precisa permitir o acesso a camera para adicionar imagens",
      });
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) return;

    if (!result.assets[0].base64) return;
    setImagens([
      ...imagens,
      `data:image/png;base64,${result.assets[0].base64}`,
    ]);
  };

  const removerImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setMostrarOpcoes(true)}
          activeOpacity={0.7}
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="gear" size={26} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
      <Conexao />
      <ScrollView style={{ flex: 1 }}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Button
                onPress={openCamera}
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
              <Text
                style={{
                  textAlign: "center",
                  color: "rgba(0,0,0,0.5)",
                  fontStyle: "italic",
                }}
              >
                ou
              </Text>
              <Button
                onPress={pickImage}
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
            <Button title="Adicionar" />
            <Button title="Limpar" type="secundary" />
          </Card>
          <ModalCustom
            title="Opções"
            active={mostrarOpcoes}
            setActive={setMostrarOpcoes}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text>Permanecer no cadastro:</Text>
              <Switch value={permanecer} onValueChange={setPermanecer} />
            </View>
          </ModalCustom>
        </View>
      </ScrollView>
    </>
  );
}
