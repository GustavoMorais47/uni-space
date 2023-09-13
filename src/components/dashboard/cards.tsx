import { View, Text } from "react-native";
import Card from "../card";
import db from "../../db.json";
import config from "../../config.json";

function CardDashboard({
  children,
  titulo,
}: {
  children: React.ReactNode;
  titulo?: string;
}) {
  return (
    <Card
      styleContainer={{
        width: "45%",
        minHeight: 85,
        maxHeight: 100,
      }}
      style={{
        width: "100%",
        height: "100%",
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

function gerenciamento_espacos_ativos_x_inativos() {
  const espacos_ativos_x_inativos = isNaN(
    db.espacos.data.filter((espaco) => espaco.status).length /
      db.espacos.data.filter((espaco) => !espaco.status).length
  )
    ? 0
    : db.espacos.data.filter((espaco) => espaco.status).length /
      db.espacos.data.filter((espaco) => !espaco.status).length;
  return (
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
  );
}

function gerenciamento_espacos_status() {
  return (
    <CardDashboard titulo="Status">
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "300",
        }}
      >
        Ativos: {db.espacos.data.filter((espaco) => espaco.status).length}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "300",
        }}
      >
        Inativos: {db.espacos.data.filter((espaco) => !espaco.status).length}
      </Text>
    </CardDashboard>
  );
}

function gerenciamento_espacos_total_x_atual() {
  const capacidade_total_x_atual = isNaN(
    db.espacos.data.reduce(
      (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
      0
    ) / db.espacos.data.reduce((acc, espaco) => acc + espaco.capacidade, 0)
  )
    ? 0
    : db.espacos.data.reduce(
        (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
        0
      ) / db.espacos.data.reduce((acc, espaco) => acc + espaco.capacidade, 0);
  return (
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
  );
}

function gerenciamento_espacos_capacidade() {
  return (
    <CardDashboard titulo="Capacidade">
      <Text
        numberOfLines={1}
        style={{
          fontWeight: "300",
        }}
      >
        Total:{" "}
        {db.espacos.data.reduce((acc, espaco) => acc + espaco.capacidade, 0)}{" "}
        {db.espacos.data.reduce((acc, espaco) => acc + espaco.capacidade, 0) > 1
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
        {db.espacos.data.reduce(
          (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
          0
        )}{" "}
        {db.espacos.data.reduce(
          (acc, espaco) => acc + (espaco.status ? espaco.capacidade : 0),
          0
        ) > 1
          ? "pessoas"
          : "pessoa"}
      </Text>
    </CardDashboard>
  );
}

export default {
  gerenciamento_espacos_ativos_x_inativos,
  gerenciamento_espacos_status,
  gerenciamento_espacos_total_x_atual,
  gerenciamento_espacos_capacidade,
};
