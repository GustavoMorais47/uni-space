import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  VirtualizedList,
  Text,
  Modal,
  SafeAreaView,
  Switch,
} from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import Input from "../../components/conexao/input";
import { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ModalCustom from "../../components/modal";

const { width } = Dimensions.get("window");

export default function Gerenciar_Espacos_Adicionar() {
  const navigation = useNavigation();
  const [imagens, setImagens] = useState<string[]>([]);
  const [nome, setNome] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [capacidade, setCapacidade] = useState<number>(0);

  const [mostrar, setMostrar] = useState<boolean>(false);
  const [indexImage, setIndexImage] = useState<number>(0);

  const [imagemSelecionada, setImagemSelecionada] = useState<number>(0);
  const [mostrarImagem, setMostrarImagem] = useState<boolean>(false);

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
    setImagens(imagens.filter((_, i) => i !== indexImage));
  };

  useEffect(() => {
    setMostrar(true);
  }, [indexImage]);

  useEffect(() => {
    if (mostrar) setTimeout(() => setMostrar(false), 5000);
  }, [mostrar]);

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
            <View>
              <VirtualizedList
                data={imagens}
                initialNumToRender={4}
                horizontal
                renderItem={({
                  item,
                  index,
                }: {
                  item: string;
                  index: number;
                }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setImagemSelecionada(index);
                      setMostrarImagem(true);
                    }}
                    onLongPress={() => removerImagem(index)}
                    activeOpacity={0.75}
                    style={{
                      width: width - 60,
                      height: 200,
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: item }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    {index === 0 && (
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          padding: 10,
                          borderBottomRightRadius: 10,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <Ionicons name="star" size={12} color="white" />
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                          }}
                        >
                          Imagem principal
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: width - 40,
                      paddingVertical: 20,
                      height: 200,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      Nenhuma imagem selecionada
                    </Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: 10,
                    }}
                  />
                )}
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
                onScroll={(event) => {
                  const index = Math.round(
                    event.nativeEvent.contentOffset.x / (width - 60)
                  );
                  setIndexImage(index);
                }}
                showsHorizontalScrollIndicator={false}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  right: 0,
                  gap: 5,
                  display: mostrar ? "flex" : "none",
                }}
              >
                {imagens.map((_, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor:
                        indexImage === i ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.1)",
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={openCamera}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Ionicons name="camera" size={30} color="rgba(0,0,0,0.5)" />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Capturar
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: "center",
                  color: "rgba(0,0,0,0.5)",
                  fontStyle: "italic",
                }}
              >
                ou
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Ionicons
                  name="cloud-upload"
                  size={30}
                  color="rgba(0,0,0,0.5)"
                />
                <Text
                  style={{
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  Carregar
                </Text>
              </TouchableOpacity>
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
                São permitidas apenas 5 imagens!
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
            <Modal visible={mostrarImagem} animationType="slide">
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: "black",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setMostrarImagem(false)}
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      padding: 10,
                      zIndex: 1,
                    }}
                  >
                    <Ionicons name="close" size={30} color="white" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: imagens[imagemSelecionada] }}
                    resizeMode="contain"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              </SafeAreaView>
            </Modal>
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
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Adicionar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(0,0,0,0.05)",
                height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Limpar
              </Text>
            </TouchableOpacity>
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
