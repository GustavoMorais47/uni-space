import { useCallback, useContext, useEffect, useState } from "react";
import { GiftedChat, IMessage, Reply } from "react-native-gifted-chat";
import { AuthContext } from "../../contexts/auth";
import { Role } from "../../types";
import pkg from "../../../package.json";
import { Alert } from "react-native";

const opcoes_admin: Reply[] = [
  {
    messageId: 1,
    title: "Onde posso cadastrar um professor?",
    value: "Cadastrar professor",
  },
  {
    messageId: 1,
    title: "Onde posso cadastrar um aluno?",
    value: "Cadastrar aluno",
  }
]
const opcoes_professor: Reply[] = []
export default function Suporte() {
  const {user} = useContext(AuthContext);
  const [mensagens, setMensagens] = useState<IMessage[]>([]);

  useEffect(() => {
    Alert.alert("Aviso", "O suporte ainda está em desenvolvimento.");
    setMensagens([
      {
        _id: 1,
        text: `Olá ${user!.nome}, sou o bot de suporte do ${pkg.name}! Como posso te ajudar? Estarei listando algumas opções abaixo. Mas caso não encontre o que procura, digite sua mensagem e um de nossos atendentes irá te responder o mais rápido possível.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Suporte " + pkg.name,
        },
        quickReplies: {
            type: 'radio',
            keepIt: true,
            values: user!.role === Role.ADMIN ? opcoes_admin : []
          },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMensagens((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <GiftedChat
      messages={mensagens}
      onSend={(messages) => onSend(messages)}
      placeholder="Digite sua mensagem aqui..."
      user={{
        _id: user!._id,
      }}
    />
  );
}
