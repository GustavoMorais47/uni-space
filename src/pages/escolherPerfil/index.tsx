import { useContext} from "react";
import { VirtualizedList, Text, View } from "react-native";
import { Role } from "../../types";
import Card from "../../components/card";
import { AuthContext } from "../../contexts/auth";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PublicoStack } from "../../types/index.routes";
import pkg from "../../../package.json";

type Permissao = {
  role: Role;
  titulo: string;
  subtitulo: string;
};

const permissao: Permissao[] = [
  {
    role: Role.ADMIN,
    titulo: "Administrador",
    subtitulo: "Tem acesso a todas as funcionalidades do sistema",
  },
  {
    role: Role.LABS,
    titulo: "Gestor de Espaços",
    subtitulo: "Gerencia os espaços e as reservas",
  },
];

export default function EscolherPerfil() {
  const { handleLogin } = useContext(AuthContext);
  const { params } = useRoute<RouteProp<PublicoStack, "EscolherPerfil">>();
  const permissoes = permissao.filter((item) =>
    params.roles.includes(item.role)
  );

  return (
    <VirtualizedList
      data={permissoes}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Olá, {params.nome}!
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "300",
            }}
          >
            Escolha um perfil para continuar
          </Text>
        </View>
      )}
      ListHeaderComponentStyle={{
        marginBottom: 20,
        marginTop: 60,
      }}
      renderItem={({ item }: { item: Permissao }) => (
        <Card
          onPress={async () =>
            await handleLogin(params.cpf, params.senha, item.role)
          }
        >
          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
          }}>{item.titulo}</Text>
          <Text style={{
            fontSize: 12,
            fontWeight: "300",
          }}>{item.subtitulo}</Text>
        </Card>
      )}
      getItemCount={() => permissoes.length}
      getItem={(data, index) => data[index]}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 10,
          }}
        />
      )}
      ListFooterComponent={() => (
        <View
        style={{
         
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.15,
        }}
      >
        <Text
          style={{
            fontSize: 12,
          }}
        >
          v{pkg.version}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          Development by{" "}
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {pkg.author.name}
          </Text>
        </Text>
      </View>
      )}
      ListFooterComponentStyle={{
        marginVertical: 20,
      }}
      style={{
        paddingHorizontal: 20,
      }}
    />
  );
}
