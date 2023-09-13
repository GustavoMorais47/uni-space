import {
  Modal,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
}

export default function ModalCustom({
  active,
  setActive,
  title,
  children,
}: Props) {
  return (
    <Modal transparent visible={active}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 20,
              maxWidth: "90%",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setActive(false);
              }}
              style={{
                marginTop: -10,
                marginLeft: -10,
                padding: 10,
                borderRadius: 10,
                alignSelf: "flex-start",
              }}
            >
              <Ionicons name="close" size={20} color="rgba(0,0,0,0.3)" />
            </TouchableOpacity>
            {title && (
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </Text>
              </View>
            )}
            <View>{children}</View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
