import React from "react";
import { KeyboardType, TextInput, View, Text } from "react-native";

interface Props {
  valor: string;
  setValor: (valor: string) => void;
  placeholder?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  keyboardType?: KeyboardType;
  title?: string
}

export default function Input({
  iconLeft,
  iconRight,
  valor,
  setValor,
  placeholder,
  keyboardType,
  title
}: Props) {
  return (
    <View style={{
      gap: 10
    }}>
      {title&&(<Text style={{
        fontWeight: "bold",
        fontSize:16
      }}>{title}</Text>)}
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
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 10,
          }}
        />
        {iconRight && iconRight}
      </View>
    </View>
  );
}
