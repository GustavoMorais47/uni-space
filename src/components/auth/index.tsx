import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Publico_Router from "../../routes/publico.routes";
import Privado_Router from "../../routes/privado.routes";

export default function Auth() {
  const { token, user } = useContext(AuthContext);
  return !token || !user ? <Publico_Router /> : <Privado_Router />;
}
