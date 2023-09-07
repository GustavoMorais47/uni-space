export interface CorType {
  vermelho: number;
  verde: number;
  azul: number;
  transparencia: number;
}

export enum Role {
  ADMIN = "admin",
  LABS = "labs",
  INFRA = "infra",
  PROFESSOR = "professor",
  ALUNO = "aluno",
}

export interface UserType {
  _id: string;
  nome: string;
  role: Role;
  cpf: string;
  email: string;
  status: boolean;
}

export interface ServicoType {
  id: string;
  titulo: string;
  imagem: string;
  cor_fundo: CorType;
  cor_fonte: CorType;
  necessita_conexao: boolean;
  status: boolean;
}

export interface EspacoType {
  id: string;
  nome: string;
  localizacao: string;
  imgens: string[];
  capacidade: number;
  status: boolean;
}
