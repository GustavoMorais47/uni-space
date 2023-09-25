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

export default function Espacos_Adicionar() {
  const navigation = useNavigation<RootStackNavigation>();
  const [imagens, setImagens] = useState<string[]>([]);
  const [nome, setNome] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [capacidade, setCapacidade] = useState<number>(0);
  const tempTime = {
    disponivel: false,
    inicio: moment().toDate(),
    fim: moment().add(1, "hour").toDate(),
  };
  const [padrao, setPadrao] = useState<boolean>(true);
  const [domingo, setDomingo] = useState<TempHorario>(tempTime);
  const [segunda, setSegunda] = useState<TempHorario>(tempTime);
  const [terca, setTerca] = useState<TempHorario>(tempTime);
  const [quarta, setQuarta] = useState<TempHorario>(tempTime);
  const [quinta, setQuinta] = useState<TempHorario>(tempTime);
  const [sexta, setSexta] = useState<TempHorario>(tempTime);
  const [sabado, setSabado] = useState<TempHorario>(tempTime);

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

  const cadastrar = async () => {
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
    Alert.alert(
      "Atenção",
      "Deseja realmente cadastrar este espaço? Essa ação não poderá ser desfeita.",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            try {
              const espaco = {
                nome,
                localizacao,
                capacidade,
                imagens,
                disponibilidade: {
                  padrao,
                  domingo: padrao
                    ? null
                    : {
                        disponivel: domingo.disponivel,
                        inicio: domingo.disponivel
                          ? domingo.inicio.getHours() * 60 +
                            domingo.inicio.getMinutes()
                          : null,
                        fim: domingo.disponivel
                          ? domingo.fim.getHours() * 60 +
                            domingo.fim.getMinutes()
                          : null,
                      },
                  segunda: padrao
                    ? null
                    : {
                        disponivel: segunda.disponivel,
                        inicio: segunda.disponivel
                          ? segunda.inicio.getHours() * 60 +
                            segunda.inicio.getMinutes()
                          : null,
                        fim: segunda.disponivel
                          ? segunda.fim.getHours() * 60 +
                            segunda.fim.getMinutes()
                          : null,
                      },
                  terca: padrao
                    ? null
                    : {
                        disponivel: terca.disponivel,
                        inicio: terca.disponivel
                          ? terca.inicio.getHours() * 60 +
                            terca.inicio.getMinutes()
                          : null,
                        fim: terca.disponivel
                          ? terca.fim.getHours() * 60 + terca.fim.getMinutes()
                          : null,
                      },
                  quarta: padrao
                    ? null
                    : {
                        disponivel: quarta.disponivel,
                        inicio: quarta.disponivel
                          ? quarta.inicio.getHours() * 60 +
                            quarta.inicio.getMinutes()
                          : null,
                        fim: quarta.disponivel
                          ? quarta.fim.getHours() * 60 + quarta.fim.getMinutes()
                          : null,
                      },
                  quinta: padrao
                    ? null
                    : {
                        disponivel: quinta.disponivel,
                        inicio: quinta.disponivel
                          ? quinta.inicio.getHours() * 60 +
                            quinta.inicio.getMinutes()
                          : null,
                        fim: quinta.disponivel
                          ? quinta.fim.getHours() * 60 + quinta.fim.getMinutes()
                          : null,
                      },
                  sexta: padrao
                    ? null
                    : {
                        disponivel: sexta.disponivel,
                        inicio: sexta.disponivel
                          ? sexta.inicio.getHours() * 60 +
                            sexta.inicio.getMinutes()
                          : null,
                        fim: sexta.disponivel
                          ? sexta.fim.getHours() * 60 + sexta.fim.getMinutes()
                          : null,
                      },
                  sabado: padrao
                    ? null
                    : {
                        disponivel: sabado.disponivel,
                        inicio: sabado.disponivel
                          ? sabado.inicio.getHours() * 60 +
                            sabado.inicio.getMinutes()
                          : null,
                        fim: sabado.disponivel
                          ? sabado.fim.getHours() * 60 + sabado.fim.getMinutes()
                          : null,
                      },
                },
              };

              Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: "Espaço cadastrado com sucesso",
              });

              if (permanecer) {
                limpar();
              } else {
                navigation.navigate("Espacos_Detalhes", {
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

  const limpar = () => {
    setImagens([]);
    setNome("");
    setLocalizacao("");
    setCapacidade(0);
    setPadrao(true);
    setDomingo(tempTime);
    setSegunda(tempTime);
    setTerca(tempTime);
    setQuarta(tempTime);
    setQuinta(tempTime);
    setSexta(tempTime);
    setSabado(tempTime);

  }

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
              <Switch value={permanecer} onValueChange={setPermanecer} />
            </View>
          </Card>
          <Card
            style={{
              gap: 10,
            }}
          >
            <Button title="Adicionar" onPress={cadastrar} />
            <Button title="Limpar" type="secundary" onPress={limpar} />
          </Card>
        </View>
      </ScrollView>
    </>
  );
}
