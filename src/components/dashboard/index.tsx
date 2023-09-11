import { View, Text, Dimensions } from "react-native";
import { Role } from "../../types";
import Card from "../card";
import db from "../../db.json";
import config from "../../config.json";

interface Props {
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
      {children}
    </View>
  );
}

function CardDashboard({
  children,
  titulo,
}: {
  children: React.ReactNode;
  titulo?: string;
}) {
  return (
    <Card
      style={{
        minWidth: "45%",
        maxWidth: "45%",
        minHeight: 85,
        maxHeight: 100,
        gap: 10,
      }}
    >
      {titulo && (
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {titulo}
          </Text>
        </View>
      )}
      <View>{children}</View>
    </Card>
  );
}

export default function Dashboard({ role }: Props) {
  const espacos_ativos_x_inativos = isNaN(
    db.espacos.filter((espaco) => espaco.status).length /
      db.espacos.filter((espaco) => !espaco.status).length
  )
    ? 0
    : db.espacos.filter((espaco) => espaco.status).length /
      db.espacos.filter((espaco) => !espaco.status).length;

  const capacidade_total_x_atual = isNaN(
    db.espacos.reduce(
      (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
      0
    ) / db.espacos.reduce((acc, espaco) => acc + espaco.capacidade, 0)
  )
    ? 0
    : db.espacos.reduce(
        (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
        0
      ) / db.espacos.reduce((acc, espaco) => acc + espaco.capacidade, 0);

  switch (role) {
    case Role.ADMIN:
      return (
        <View>
          <Text>Admin</Text>
        </View>
      );
    case Role.LABS:
      return (
        <Container titulo="Dashboard">
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
            <CardDashboard titulo="Ativos x Inativos">
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:
                    espacos_ativos_x_inativos >
                    config.gerenciamento_espacos.espacos_ativos_x_inativos / 100
                      ? "green"
                      : "red",
                }}
              >
                {espacos_ativos_x_inativos.toFixed(2)}
              </Text>
            </CardDashboard>
            <CardDashboard titulo="Status">
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "300",
                }}
              >
                Ativos: {db.espacos.filter((espaco) => espaco.status).length}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "300",
                }}
              >
                Inativos: {db.espacos.filter((espaco) => !espaco.status).length}
              </Text>
            </CardDashboard>
            <CardDashboard titulo="Total x Atual">
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:
                    capacidade_total_x_atual >
                    config.gerenciamento_espacos.capacidade_total_x_atual / 100
                      ? "green"
                      : "red",
                }}
              >
                {capacidade_total_x_atual.toFixed(2)}
              </Text>
            </CardDashboard>
            <CardDashboard titulo="Capacidade">
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "300",
                }}
              >
                Total:{" "}
                {db.espacos.reduce((acc, espaco) => acc + espaco.capacidade, 0)}{" "}
                {db.espacos.reduce(
                  (acc, espaco) => acc + espaco.capacidade,
                  0
                ) > 1
                  ? "pessoas"
                  : "pessoa"}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "300",
                }}
              >
                Atual:{" "}
                {db.espacos.reduce(
                  (acc, espaco) =>
                    acc + (espaco.status ? espaco.capacidade : 0),
                  0
                )}{" "}
                {db.espacos.reduce(
                  (acc, espaco) =>
                    acc + (espaco.status ? espaco.capacidade : 0),
                  0
                ) > 1
                  ? "pessoas"
                  : "pessoa"}
              </Text>
            </CardDashboard>
          </View>
        </Container>
      );
    case Role.INFRA:
      return (
        <View>
          <Text>Infra</Text>
        </View>
      );
    case Role.PROFESSOR:
      return (
        <View>
          <Text>Professor</Text>
        </View>
      );
    case Role.ALUNO:
      return (
        <View>
          <Text>Aluno</Text>
        </View>
      );
  }
}
