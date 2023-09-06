import { useContext, useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { AuthContext } from "../../contexts/auth";
import pkg from "../../../package.json";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import Toast from "react-native-toast-message";

export default function Login() {
  const { handleLogin, handleAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const login = async () => {
    if (!cpfValidator.isValid(cpf) && cpf !== "00000000000")
      return Toast.show({
        type: "error",
        text1: "CPF inválido",
        text2:
          "O CPF informado é inválido, por favor verifique e tente novamente.",
      });

    if (senha.length === 0)
      return Toast.show({
        type: "error",
        text1: "Senha inválida",
        text2:
          "A senha informada é inválida, por favor verifique e tente novamente.",
      });

    setLoading(true);
    handleLogin(cpf, senha).finally(() => setLoading(false));
  };

  useEffect(() => {
    setModal(true);
    handleAuth().finally(() => setModal(false));
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Bem vindo(a) ao
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              gap: 20,
            }}
          >
            <View
              style={{
                gap: 20,
              }}
            >
              <View
                style={{
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  CPF
                </Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <FontAwesome
                    name="user-o"
                    size={16}
                    color="rgba(0,0,0,0.25)"
                  />
                  <TextInput
                    placeholder="Insira seu CPF"
                    keyboardType="numeric"
                    value={cpf.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      "$1.$2.$3-$4"
                    )}
                    maxLength={14}
                    onChangeText={(text) => setCpf(text.replace(/\D/g, ""))}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  Senha
                </Text>
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.05)",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons
                    name="md-lock-closed-outline"
                    size={16}
                    color="rgba(0,0,0,0.25)"
                  />
                  <TextInput
                    placeholder="Insira sua senha"
                    secureTextEntry={!mostrarSenha}
                    value={senha}
                    maxLength={14}
                    onChangeText={setSenha}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                  >
                    <Ionicons
                      name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                      size={16}
                      color="rgba(0,0,0,0.25)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                gap: 20,
              }}
            >
              <TouchableOpacity
                onPress={login}
                disabled={loading}
                activeOpacity={0.7}
                style={{
                  backgroundColor: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                >
                  Não possui uma acesso?{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Solicite
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal transparent visible={modal}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 20,
                maxWidth: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large"/>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <View
        style={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
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
    </SafeAreaView>
  );
}
