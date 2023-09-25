import { View, ScrollView, Text, Switch, Alert } from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import Input from "../../components/input";
import { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Button from "../../components/button";
import Slider from "../../components/slider";
import config from "../../config.json";
import { RootStack } from "../../types/index.routes";
import useCameraPicker from "../../hooks/useCameraPicker";
import useGaleriaPicker from "../../hooks/useGaleriaPicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { EspacoType, HorarioType } from "../../types";

type RootStackNavigation = NavigationProp<RootStack>;

type TempHorario = {
  disponivel: boolean;
  inicio: Date;
  fim: Date;
};

function Horario({
  dia,
  stateDia,
  setStateDia,
}: {
  dia:
    | "Domingo"
    | "Segunda"
    | "Terça"
    | "Quarta"
    | "Quinta"
    | "Sexta"
    | "Sábado";
  stateDia: TempHorario;
  setStateDia: React.Dispatch<React.SetStateAction<TempHorario>>;
}) {
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {dia}
        </Text>
        <Switch
          value={stateDia.disponivel}
          onValueChange={(value) => {
            setStateDia({
              disponivel: value,
              inicio: stateDia.inicio,
              fim: stateDia.fim,
            });
          }}
        />
      </View>
      {stateDia.disponivel && (
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
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons
                name="door-open"
                size={20}
                color="black"
              />
              <Text>Abre:</Text>
            </View>
            <DateTimePicker
              value={stateDia.inicio}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setStateDia({
                    disponivel: stateDia.disponivel,
                    inicio: selectedDate,
                    fim: stateDia.fim,
                  });
                }
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialCommunityIcons
                name="door-closed"
                size={20}
                color="black"
              />
              <Text>Fecha:</Text>
            </View>
            <DateTimePicker
              value={stateDia.fim}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setStateDia({
                    disponivel: stateDia.disponivel,
                    inicio: stateDia.inicio,
                    fim: selectedDate,
                  });
                }
              }}
            />
          </View>
        </Card>
      )}
    </View>
  );
}

export default function Espacos_Editar() {
  const navigation = useNavigation<RootStackNavigation>();
  const [espaco, setEspaco] = useState<EspacoType>({
    id: "0",
    nome: "Espaço de Teste",
    localizacao: "Bloco A - 1º Andar",
    capacidade: 200,
    imagens: [],
    disponibilidade: {
      padrao: true,
      domingo: null,
      segunda: null,
      terca: null,
      quarta: null,
      quinta: null,
      sexta: null,
      sabado: null,
    },
    status: true,
  });
  const [imagens, setImagens] = useState<string[]>(espaco.imagens);
  const [nome, setNome] = useState<string>(espaco.nome);
  const [localizacao, setLocalizacao] = useState<string>(espaco.localizacao);
  const [capacidade, setCapacidade] = useState<number>(espaco.capacidade);
  const tempTime: TempHorario = {
    disponivel: false,
    inicio: moment().toDate(),
    fim: moment().add(1, "hour").toDate(),
  };
  const [padrao, setPadrao] = useState<boolean>(espaco.disponibilidade.padrao);
  const [domingo, setDomingo] = useState<TempHorario>(
    espaco.disponibilidade.domingo
      ? {
          disponivel: espaco.disponibilidade.domingo.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.domingo.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.domingo.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [segunda, setSegunda] = useState<TempHorario>(
    espaco.disponibilidade.segunda
      ? {
          disponivel: espaco.disponibilidade.segunda.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.segunda.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.segunda.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [terca, setTerca] = useState<TempHorario>(
    espaco.disponibilidade.terca
      ? {
          disponivel: espaco.disponibilidade.terca.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.terca.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.terca.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [quarta, setQuarta] = useState<TempHorario>(
    espaco.disponibilidade.quarta
      ? {
          disponivel: espaco.disponibilidade.quarta.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.quarta.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.quarta.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [quinta, setQuinta] = useState<TempHorario>(
    espaco.disponibilidade.quinta
      ? {
          disponivel: espaco.disponibilidade.quinta.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.quinta.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.quinta.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [sexta, setSexta] = useState<TempHorario>(
    espaco.disponibilidade.sexta
      ? {
          disponivel: espaco.disponibilidade.sexta.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.sexta.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.sexta.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );
  const [sabado, setSabado] = useState<TempHorario>(
    espaco.disponibilidade.sabado
      ? {
          disponivel: espaco.disponibilidade.sabado.disponivel,
          inicio: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.sabado.inicio, "minutes")
            .toDate(),
          fim: moment()
            .clone()
            .set("hours", 0)
            .set("minutes", 0)
            .add(espaco.disponibilidade.sabado.fim, "minutes")
            .toDate(),
        }
      : tempTime
  );

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

  const salvar = async () => {
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
    if (
      domingo.disponivel === true &&
      domingo.fim.getTime() <= domingo.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento do domingo está incorreto",
      });
      return;
    }
    if (
      segunda.disponivel === true &&
      segunda.fim.getTime() <= segunda.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento da segunda está incorreto",
      });
      return;
    }
    if (
      terca.disponivel === true &&
      terca.fim.getTime() <= terca.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento da terça está incorreto",
      });
      return;
    }
    if (
      quarta.disponivel === true &&
      quarta.fim.getTime() <= quarta.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento da quarta está incorreto",
      });
      return;
    }
    if (
      quinta.disponivel === true &&
      quinta.fim.getTime() <= quinta.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento da quinta está incorreto",
      });
      return;
    }
    if (
      sexta.disponivel === true &&
      sexta.fim.getTime() <= sexta.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento da sexta está incorreto",
      });
      return;
    }
    if (
      sabado.disponivel === true &&
      sabado.fim.getTime() <= sabado.inicio.getTime()
    ) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "O horário de funcionamento do sábado está incorreto",
      });
      return;
    }
  };

  const cancelar = () => navigation.goBack();

  useEffect(() => {
    if (padrao) {
      setDomingo(tempTime);
      setSegunda(tempTime);
      setTerca(tempTime);
      setQuarta(tempTime);
      setQuinta(tempTime);
      setSexta(tempTime);
      setSabado(tempTime);
    }
  }, [padrao]);

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
                  : "imagem!"}
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
                Pressione e segure para excluir uma imagem
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
            title="Disponibilidade"
            style={{
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Padrão da instituição:
              </Text>
              <Switch value={padrao} onValueChange={setPadrao} />
            </View>
            {!padrao && (
              <>
                <Horario
                  dia="Domingo"
                  stateDia={domingo}
                  setStateDia={setDomingo}
                />
                <Horario
                  dia="Segunda"
                  stateDia={segunda}
                  setStateDia={setSegunda}
                />
                <Horario dia="Terça" stateDia={terca} setStateDia={setTerca} />
                <Horario
                  dia="Quarta"
                  stateDia={quarta}
                  setStateDia={setQuarta}
                />
                <Horario
                  dia="Quinta"
                  stateDia={quinta}
                  setStateDia={setQuinta}
                />
                <Horario dia="Sexta" stateDia={sexta} setStateDia={setSexta} />
                <Horario
                  dia="Sábado"
                  stateDia={sabado}
                  setStateDia={setSabado}
                />
              </>
            )}
          </Card>
          <Card
            style={{
              gap: 10,
            }}
          >
            <Button title="Salvar" onPress={salvar} />
            <Button title="Cancelar" type="secundary" onPress={cancelar} />
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
