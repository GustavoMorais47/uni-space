import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

export default async function useCameraPicker() {
  let permissao = await ImagePicker.requestCameraPermissionsAsync();

  if (!permissao.granted) {
    Toast.show({
      type: "error",
      text1: "Permissão negada",
      text2: "Você precisa permitir o acesso a camera para adicionar imagens",
    });
    return;
  }

  let result = await ImagePicker.launchCameraAsync({
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
