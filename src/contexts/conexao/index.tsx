import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";

type ConnContextProps = {
  status: boolean;
};

export const ConnContext = createContext<ConnContextProps>(null!);

export default function ConnProvider({ children }: any) {
  const [status, setStatus] = useState<boolean>(true);

  const getStatus = useCallback(async () => {
    await api
        .get("/ping")
        .then(() => setStatus(true))
        .catch(() => setStatus(false));
    setInterval(async () => {
      await api
        .get("/ping")
        .then(() => setStatus(true))
        .catch(() => setStatus(false));
    }, 3000);
  }, []);

  useEffect(() => {
    getStatus();
  }, []);
  return (
    <ConnContext.Provider value={{ status }}>{children}</ConnContext.Provider>
  );
}
