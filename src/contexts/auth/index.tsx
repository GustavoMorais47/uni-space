import { createContext, useState } from "react";
import { UserType } from "../../types";
import api from "../../services/api";
import db from "../../db.json";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
  token: string | null;
  user: UserType | null;
  handleLogin: (cpf: string, senha: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(null!);

export default function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = async (cpf: string, senha: string) => {
    await api
      .post("/login", { cpf, senha })
      .then(async (response) => {
        const { token } = response.data;
        setToken(token);

        await api
          .get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (response) => {
            const { user } = response.data;
            db.user = user;
            setUser(user);
            await AsyncStorage.setItem("@token", token);
          })
          .catch((err) => {
            setToken(null);
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

            return Toast.show({
              type: "error",
              text1: "Erro desconhecido",
              text2: "Por favor tente novamente mais tarde.",
            });
          });
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

        if (err.response.status) {
          if (err.response.status === 401)
            Toast.show({
              type: "error",
              text1: "Usuário ou senha incorretos",
              text2: "Por favor verifique os dados e tente novamente.",
            });

          if (err.response.status === 404)
            Toast.show({
              type: "error",
              text1: "Usuário não encontrado",
              text2: "Por favor verifique os dados e tente novamente.",
            });
        }
      });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@token");
    setToken(null);
    db.user = null;
    setUser(db.user);
  };

  const handleAuth = async () => {
    await AsyncStorage.getItem("@token")
      .then(async (token) => {
        if (token) {
          setToken(token);
          await api
            .get("/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then(async (response) => {
              const { user } = response.data;
              db.user = user;
              setUser(user);
            })
            .catch((err) => {
              setToken(null);
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

              return Toast.show({
                type: "error",
                text1: "Erro desconhecido",
                text2: "Por favor tente novamente mais tarde.",
              });
            });
        }
      })
      .catch((err) => {
        setToken(null);
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

        return Toast.show({
          type: "error",
          text1: "Erro desconhecido",
          text2: "Por favor tente novamente mais tarde.",
        });
      });
  };
  return (
    <AuthContext.Provider
      value={{ token, user, handleLogin, handleLogout, handleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}
