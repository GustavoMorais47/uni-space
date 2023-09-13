import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  VirtualizedList,
  Image,
  Dimensions,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  images: string[];
  fullImage?: boolean;
  onPress?: () => void;
  onLongPress?: (index: number) => void;
  tag?: boolean;
}

const { width } = Dimensions.get("window");

export default function Slider({
  images,
  onPress,
  onLongPress,
  fullImage,
}: Props) {
  const [scroll, setScroll] = useState<number>(0);
  const [mostrar, setMostrar] = useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setMostrar(true);
  }, [scroll]);

  useEffect(() => {
    if (mostrar) setTimeout(() => setMostrar(false), 5000);
  }, [mostrar]);

  return (
    <View>
      <VirtualizedList
        data={images}
        initialNumToRender={4}
        horizontal
        renderItem={({ item, index }: { item: string; index: number }) => (
          <TouchableOpacity
            onPress={
              onPress
                ? onPress
                : fullImage
                ? () => {
                    setIndex(index);
                    setShow(true);
                  }
                : undefined
            }
            onLongPress={() => {
              onLongPress && onLongPress(index);
            }}
            activeOpacity={0.75}
            style={{
              width: width - 60,
              height: 200,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
            {index === 0 && (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  padding: 10,
                  borderBottomRightRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Ionicons name="star" size={12} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  Imagem principal
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: width - 40,
              paddingVertical: 20,
              height: 200,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "rgba(0,0,0,0.3)",
              }}
            >
              Nenhuma imagem selecionada
            </Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: 10,
            }}
          />
        )}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        onScroll={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / (width - 60)
          );
          setScroll(index);
        }}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          gap: 5,
          display: mostrar ? "flex" : "none",
        }}
      >
        {images.map((_, i) => (
          <View
            key={i}
            style={{
              backgroundColor:
                scroll === i ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.1)",
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
        ))}
      </View>
      <Modal visible={show} animationType="fade">
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => setShow(false)}
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                padding: 10,
                zIndex: 1,
              }}
            >
              <Ionicons name="close" size={30} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: images[index] }}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
