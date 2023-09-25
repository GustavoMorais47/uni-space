import { CorType, Role } from "../types";

function transforma_cor(color: CorType): string {
  return `rgba(${color.vermelho},${color.verde},${color.azul},${color.transparencia})`;
}

function possui_permissao(permissoes: Array<Role>, permissao: Role): boolean {
  return permissoes.includes(permissao);
}
export default {
  transforma_cor,
  possui_permissao,
};
