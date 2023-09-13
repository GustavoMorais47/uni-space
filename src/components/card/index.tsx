import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title?: string;
}

export default function Card({
  children,
  style,
  styleContainer,
  onPress,
  title,
}: Props) {
  return (
    <View
      style={[
        {
          gap: 10,
        },
        styleContainer,
      ]}
    >
      {title && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      )}
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.75}
        style={[
          {
            backgroundColor: "#fff",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            elevation: 1,
            padding: 10,
          },
          style,
        ]}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}
