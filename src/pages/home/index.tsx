import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import db from "../../db.json";
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts/auth";
import Toast from "react-native-toast-message";
import Conexao from "../../components/conexao";
import { ConnContext } from "../../contexts/conexao";
import { ServicoType } from "../../types";
import utils from "../../utils";

const { width } = Dimensions.get("window");
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Home() {
  const navigation = useNavigation();
  const { token, user } = useContext(AuthContext);
  const { status } = useContext(ConnContext);
  const [loading, setLoading] = useState(false);
  const [servicos, setServicos] = useState<ServicoType[]>(db.servicos.data);

  const getServicos = async () => {
    setLoading(true);
    await api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { servicos } = response.data;
        db.servicos.ultima_atualizacao = new Date().toISOString();
        db.servicos.data = servicos;
        setServicos(db.servicos.data);
      })
      .catch((error) => {
        if (error.response) {
          Toast.show({
            type: "error",
            text1: "Erro",
            text2: error.response.data.mensagem,
          });
        }
        console.log(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getServicos();
  }, []);

  return (
    <>
      <Conexao />
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 20,
          gap: 40,
          marginBottom: 20,
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Olá, {user?.nome}!
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              fontWeight: "300",
            }}
          >
            Alguma mensagem de boas vindas
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            height: 75,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.15,
            elevation: 1,
          }}
        ></View>
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Serviços
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              fontWeight: "300",
            }}
          >
            Últimas atualização:{" "}
            {new Date(db.servicos.ultima_atualizacao).toLocaleDateString(
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
      </View>
      {loading ? (
        <View
          style={{
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={servicos
            .filter((servico) => servico.status)
            .sort((a, b) => a.titulo.localeCompare(b.titulo))}
          initialNumToRender={4}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: ServicoType }) => (
            <TouchableOpacity
              disabled={
                item.necessita_conexao ? (status ? false : true) : false
              }
              onPress={() => navigation.navigate(item.id as never)}
              activeOpacity={0.8}
              style={{
                width: (width - 60) / 2,
                backgroundColor: item.necessita_conexao
                  ? status
                    ? utils.transforma_cor(item.cor_fundo)
                    : "#eee"
                  : utils.transforma_cor(item.cor_fundo),
                height: (width - 60) * 0.7,
                borderRadius: 10,
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  gap: 3,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: item.necessita_conexao
                      ? status
                        ? utils.transforma_cor(item.cor_fonte)
                        : "#ccc"
                      : utils.transforma_cor(item.cor_fonte),
                  }}
                >
                  {item.titulo}
                </Text>
                {!status && item.necessita_conexao && (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: "#ccc",
                    }}
                  >
                    Necessita de conexão
                  </Text>
                )}
              </View>
              <Image
                source={
                  item.imagem
                    ? { uri: item.imagem }
                    : require("../../../assets/placeholder.png")
                }
                style={{
                  width: (width - 60) / 2 - 20,
                  height: (width - 60) * 0.75 * 0.5,
                }}
                placeholder={blurhash}
                contentFit="fill"
                cachePolicy={"memory"}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            gap: 20,
          }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
          refreshing={false}
          onRefresh={getServicos}
          ListEmptyComponent={() => (
            <View
              style={{
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "300",
                }}
              >
                Nenhum serviço encontrado
              </Text>
            </View>
          )}
        />
      )}
    </>
  );
}
