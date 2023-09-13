import { View, Text } from "react-native";
import { Role } from "../../types";
import { RootStack } from "../../types/index.routes";
import Cards from "./cards";

interface Props {
  page: keyof RootStack;
  role: Role;
}

function Container({
  children,
  titulo,
}: {
  children: React.ReactNode;
  titulo?: string;
}) {
  return (
    <View
      style={{
        gap: 20,
      }}
    >
      {titulo && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {titulo}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "center",
          gap: 10,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default function Dashboard({ role, page }: Props) {
  switch (page) {
    case "Manage_Spaces":
      if (role === Role.ADMIN) return null;
      if (role === Role.LABS)
        return (
          <Container titulo="Dashboard">
            <Cards.gerenciamento_espacos_ativos_x_inativos />
            <Cards.gerenciamento_espacos_status />
            <Cards.gerenciamento_espacos_total_x_atual />
            <Cards.gerenciamento_espacos_capacidade />
          </Container>
        );
      if (role === Role.INFRA) return null;
      if (role === Role.PROFESSOR) return null;
      if (role === Role.ALUNO) return null;
    default:
      return null;
  }
}
