import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

export default function Suporte() {
  const [mensagens, setMensagens] = useState<IMessage[]>([]);

  useEffect(() => {
    setMensagens([
      {
        _id: 1,
        text: "Olá, seja bem vindo ao suporte! Em que posso ajudar?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
        quickReplies: {
            type: 'radio',
            keepIt: true,
            values: [
              {
                title: 'Como funciona o app?',
                value: 'app',
              },
              {
                title: 'Como funciona a sala virtual?',
                value: 'virtual_room',
              },
              {
                title: 'Quero falar com um atendente',
                value: 'support',
              }
            ],
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
        _id: 1,
      }}
    />
  );
}
