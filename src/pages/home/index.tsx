import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Conexao from "../../components/conexao";
import { Role, ServicoType, UserType } from "../../types";
import utils from "../../utils";
import { RootStack } from "../../types/index.routes";
import servicos from "../../utils/servicos";
import Dashboard from "../../components/dashboard";

const { width } = Dimensions.get("window");
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

type StackNavigation = NavigationProp<RootStack>;

function Header({ user }: { user: UserType }) {
  return (
    <View
      style={{
        gap: 20,
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
          Olá, {user.nome}!
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
      >
        <Dashboard page="Home" role={user.role} />
      </View>
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
      </View>
    </View>
  );
}

export default function Home() {
  const navigation = useNavigation<StackNavigation>();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState<ServicoType[]>([]);

  useEffect(() => {
    switch (user!.role) {
      case Role.ADMIN:
        setData([servicos.Espacos]);
        break;
      case Role.LABS:
        setData([servicos.Espacos]);
        break;
      case Role.INFRA:
        break;
      case Role.PROFESSOR:
        break;
      case Role.ALUNO:
        break;
    }
  }, []);

  return (
    <>
      <Conexao />
      <FlatList
        data={data}
        initialNumToRender={4}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header user={user!} />}
        ListHeaderComponentStyle={{
          marginVertical: 20,
        }}
        renderItem={({ item }: { item: ServicoType }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(item.navegacao as keyof RootStack as never)
            }
            activeOpacity={0.8}
            style={{
              width: (width - 60) / 2,
              backgroundColor: utils.transforma_cor(item.cor_fundo),
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
                  color: utils.transforma_cor(item.cor_fonte),
                }}
              >
                {item.titulo}
              </Text>
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
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{
          gap: 20,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      />
    </>
  );
}
