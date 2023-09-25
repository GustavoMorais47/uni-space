import { Role } from ".";

export type PublicoStack = {
  Login: undefined;
  EscolherPerfil: {
    cpf: string;
    senha: string;
    nome: string;
    roles: Role[]
  }
}

export type RootStack = {
  Home: undefined;
  Suporte: undefined;
  Espacos: undefined;
  Espacos_Adicionar: undefined;
  Espacos_Detalhes: { id: string };
  Espacos_Editar: { id: string };
};
