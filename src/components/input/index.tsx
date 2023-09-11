import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  valor: string;
  setValor: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Input({ iconLeft, iconRight, valor, setValor, placeholder }: Props) {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {iconLeft && iconLeft}
      <TextInput
        value={valor}
        onChangeText={setValor}
        placeholder={placeholder}
        placeholderTextColor={"rgba(0,0,0,0.3)"}
        style={{
          flex: 1,
          paddingVertical: 10,

        }}
      />
      {iconRight && iconRight}
    </View>
  );
}
