export enum Role {
  ADMIN = "admin",
  LABS = "labs",
  INFRA = "infra",
  PROFESSOR = "professor",
  ALUNO = "aluno",
}

export interface UserType {
  nome: string;
  role: Role;
  cpf: string;
  email: string;
  status: boolean;
}
