import { CorType } from "../types";

function transforma_cor(color: CorType): string {
  return `rgba(${color.vermelho},${color.verde},${color.azul},${color.transparencia})`;
}
export default {
    transforma_cor
};
