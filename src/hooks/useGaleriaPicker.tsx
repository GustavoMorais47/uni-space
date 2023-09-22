import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export default async function useGaleriaPicker() {
  const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissao.granted) {
    Toast.show({
      type: "error",
      text1: "Permissão negada",
      text2: "Você precisa permitir o acesso a galeria para adicionar imagens",
    });
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
    base64: true,
  });

  if (result.canceled) return;

  if (!result.assets[0].base64) return;

  return `data:image/png;base64,${result.assets[0].base64}`;
}
