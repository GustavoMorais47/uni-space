import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface Props {
  onPress?: () => void;
  active?: boolean;
  loading?: boolean;
  title?: string;
  type?: "primary" | "secundary";
  children?: React.ReactNode;
}

export default function Button({
  type = "primary",
  children,
  title,
  onPress,
  loading,
  active = true,
}: Props) {
  const disabled = loading !== undefined ? loading : !active;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[
        style.button,
        disabled
          ? style.buttonDisabled
          : type === "primary"
          ? style.buttonPrimary
          : style.buttonSecundary,
      ]}
    >
      {title ? (
        <Text
          style={[
            style.title,
            disabled
              ? style.titleDisabled
              : type === "primary"
              ? style.titlePrimary
              : style.titleSecundary,
          ]}
        >
          {title}
        </Text>
      ) : (
        <>{children}</>
      )}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "rgba(0,0,0,1)",
  },
  buttonSecundary: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  buttonDisabled: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  titlePrimary: {
    color: "rgba(255,255,255,1)",
  },
  titleSecundary: {
    color: "rgba(0,0,0,1)",
  },
  titleDisabled: {
    color: "rgba(0,0,0,0.5)",
  },
});
