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
  navegacao: string;
  titulo: string;
  imagem: string;
  cor_fundo: CorType;
  cor_fonte: CorType;
  status: boolean;
}

export interface HorarioType {
  disponivel: boolean;
  inicio: number | null;
  fim: number | null;
}

interface DisponibilidadeType {
  padrao: boolean;
  domingo: HorarioType | null;
  segunda: HorarioType | null;
  terca: HorarioType | null;
  quarta: HorarioType | null;
  quinta: HorarioType | null;
  sexta: HorarioType | null;
  sabado: HorarioType | null;
}

export interface EspacoType {
  id: string;
  nome: string;
  localizacao: string;
  imagens: string[];
  capacidade: number;
  disponibilidade: DisponibilidadeType;
  status: boolean;
}
