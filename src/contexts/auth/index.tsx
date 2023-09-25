import { createContext, useState } from "react";
import { Role, UserType } from "../../types";
import { JWT_SECRET } from "@env";
import jwt from "expo-jwt";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PublicoStack } from "../../types/index.routes";

type AuthContextProps = {
  token: string | null;
  user: UserType | null;
  handleLogin: (cpf: string, senha: string, role?: Role) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export default function AuthProvider({ children }: any) {
  const navigation = useNavigation<NavigationProp<PublicoStack>>();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = async (cpf: string, senha: string, role?: Role) => {
    await api
      .post("/login", { cpf, senha, role })
      .then(async (response) => {
        if (response.data.token) {
          const tkn = response.data.token;
          await AsyncStorage.setItem("@token", tkn);
          setToken(tkn);
          await api
            .get("/me", {
              headers: {
                Authorization: `Bearer ${tkn}`,
              },
            })
            .then(async (response) => {
              const JWTBody = jwt.decode(tkn!, JWT_SECRET);
              if (JWTBody) {
                const user: UserType = {
                  _id: response.data._id,
                  nome: response.data.nome,
                  cpf: response.data.cpf,
                  email: response.data.email,
                  role: JWTBody.role as Role,
                  status: response.data.status,
                };
                return await AsyncStorage.setItem(
                  "@user",
                  JSON.stringify(user)
                ).then(() => setUser(user));
              }
              await AsyncStorage.removeItem("@token");
              setToken(null);
              await AsyncStorage.removeItem("@user");
              setUser(null);
            })
            .catch(async (err) => {
              await AsyncStorage.removeItem("@token");
              setToken(null);
              await AsyncStorage.removeItem("@user");
              setUser(null);
            });
        }
        if (response.data.permissoes) {
          return navigation.navigate("EscolherPerfil", {
            cpf,
            senha,
            nome: response.data.nome,
            roles: response.data.permissoes as Role[],
          });
        }
      })
      .catch((err) => {
        if (
          err.code === "ECONNABORTED" ||
          err.message === "Network Error" ||
          err.message === "timeout"
        )
          return Toast.show({
            type: "error",
            text1: "Erro de conexão",
            text2: "Por favor verifique sua conexão com a internet.",
          });

        if (err.response) {
          if (err.response.status) {
            if (err.response.status === 400)
              return Toast.show({
                type: "error",
                text1: "Erro de autenticação",
                text2:
                  "Verifique se os dados informados estão corretos e tente novamente.",
              });

            if (err.response.status === 401)
              return Toast.show({
                type: "error",
                text1: "Erro de autenticação",
                text2:
                  "O CPF ou senha informados são inválidos, por favor verifique e tente novamente.",
              });

            if (err.response.status === 403)
              return Toast.show({
                type: "error",
                text1: "Erro de autenticação",
                text2:
                  "Acesso negado, entre em contato com o administrador do sistema.",
              });

            if (err.response.status === 500)
              return Toast.show({
                type: "error",
                text1: "Erro interno",
                text2: "Por favor tente novamente mais tarde.",
              });
          }
        }

        return Toast.show({
          type: "error",
          text1: "Erro desconhecido",
          text2: "Por favor tente novamente mais tarde.",
        });
      });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@token");
    setToken(null);
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  const handleAuth = async () => {
    const tkn = await AsyncStorage.getItem("@token");
    const usr = await AsyncStorage.getItem("@user");

    if (!tkn && !usr) {
      setToken(null);
      setUser(null);
      return;
    }

    const JWTBody = jwt.decode(tkn!, JWT_SECRET);

    if (!JWTBody) {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");
      return;
    }

    setUser(JSON.parse(usr!));
    setToken(tkn);
  };
  return (
    <AuthContext.Provider
      value={{ token, user, handleLogin, handleLogout, handleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
