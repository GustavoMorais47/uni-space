import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";
import Conexao from "../../components/conexao";
import Card from "../../components/card";
import { useContext, useEffect, useState } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStack } from "../../types/index.routes";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import QRGenerator from "react-native-qr-code-styling";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import Button from "../../components/button";
import * as Sharing from "expo-sharing";
import { EspacoType, HorarioType, Role } from "../../types";
import Slider from "../../components/slider";
import utils from "../../utils";
import { AuthContext } from "../../contexts/auth";

const { width } = Dimensions.get("window");

function Horario({
  dia,
  stateDia,
}: {
  dia:
    | "Domingo"
    | "Segunda"
    | "Terça"
    | "Quarta"
    | "Quinta"
    | "Sexta"
    | "Sábado";
  stateDia: HorarioType;
}) {
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {dia}
        </Text>
      </View>
      {stateDia.disponivel &&
        stateDia.inicio !== null &&
        stateDia.fim !== null && (
          <Card
            style={{
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="door-open"
                  size={20}
                  color="black"
                />
                <Text>Abre:</Text>
              </View>
              <Text>
                {stateDia.inicio / 60 < 10
                  ? "0" + Math.floor(stateDia.inicio / 60)
                  : Math.floor(stateDia.inicio / 60)}
                :
                {stateDia.inicio % 60 < 10
                  ? "0" + (stateDia.inicio % 60)
                  : stateDia.inicio % 60}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="door-closed"
                  size={20}
                  color="black"
                />
                <Text>Fecha:</Text>
              </View>
              <Text>
                {stateDia.fim / 60 < 10
                  ? "0" + Math.floor(stateDia.fim / 60)
                  : Math.floor(stateDia.fim / 60)}
                :
                {stateDia.fim % 60 < 10
                  ? "0" + (stateDia.fim % 60)
                  : stateDia.fim % 60}
              </Text>
            </View>
          </Card>
        )}
    </View>
  );
}

export default function Espacos_Detalhes() {
  const navigation = useNavigation<NavigationProp<RootStack>>();
  const route = useRoute<RouteProp<RootStack, "Espacos_Detalhes">>();
  const { user } = useContext(AuthContext);
  const [espaco, setEspaco] = useState<EspacoType | null>({
    id: "asdasdkansldjasdjasdasdasd",
    nome: "Espaço de teste",
    localizacao: "São Paulo",
    capacidade: 100,
    imagens: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAQDw8QEA4PFg8QEA8VFQ8VFRUVFRUWGBUVFRUZHSggGBooHRYXITIhJikrLi4uGB8zOD8sQygtLysBCgoKDg0OGxAQGy8mICUtLS0xLS0tLS0rListLS4tLS8tLS0tLS0tLSstLS0rLS0tLS4tKystLS8tLS0tKy0tLf/AABEIAMkA+wMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAQIFBgQDB//EAEsQAAIBAwIDBQQECQkGBwEAAAECAwAEERIhBTFBBhMyUWEUInGBQmKRoQcjJDNScoKx8BVDU2NzkqLB0RY0srPD4UVUdIOTo7Q1/8QAGwEAAQUBAQAAAAAAAAAAAAAAAAEDBAUGAgf/xAA4EQABAwIDBAkDAwIHAAAAAAABAAIDBBEFITESQVFhE3GBkaGxwdHwBiIyFOHxQlIVFjNykqLS/9oADAMBAAIRAxEAPwCpp0hTFX6pUVKiihcop0VMClQgUxRTpUiKdFRMgG2d/LnSoU6dVt1fsX7mAAyYDOzAlYweWRtqY4OBkcsn14bky6+7S6nEgCvLIwh7qNSTj3Au5ODgE9M1ztcPnLrShvE/OPV84X0FFZmKWBZSk917Rr1FZlmcacfRdEbSvoR93XrS8jj3t7pZQOdu8qsSOvdMx1BvQkjptzoD+Xjn3e1+SCy3zLv97K8qQFedvMsiK6HKOAyn0NetOJtFKnTpUIooxTxS2QlRUsUYoshRoqWKMUWQo0VLFGKLIUaKeKWKLIUadPFKkQlUcVKnikQq8VOo1Kmk4inRUhSoQBUqVSpUiBTFAFOlQoSHkBzbr6da8ZpVUaV59cfxzryu5t8L0yCa5orY3EsdupI7zU0rDmsS41keRJIUfrZ6U3NMyGN0j9AL/PJdRRuleGN1Kj2fgnuu9EKLGjSymS6cEgYbSqxr9NgqrvnA+6r3sh2Ygn1yTRieUzXAaWUBvdilaNTp8IOFHIVdcL4eltGIosiNWkZVP0dbs+kegLYFaDgNsscbFVC62djgY3JJJ+JYk/OvO8TxieZpzsNwGXfxO83WqpqKOEXAud5XdbW6RKEjRUUcgAAKjd2MMylZoY5lOxV0Vh9hFdFFZWwvfepiyd92HhwWsXNpJuRH7z27HyaIn3PihGOeDWdGtXeGaMxXEWBJETnGfCyt9JD0b9xBFfTqz/bfhve2/tca5ubEM+3OS35zR+uANQ9VHma2H09j0rJW087rtOQJ1HbwVTiFA17S9gs7zWUxTxTUggEHIO4PmKMV6OsylininijFCEsUYqWKMUJFHFGKlijFCFHFGKlijFCFDFGKnilihKo4oxTxRQhRxSqeKWKRKq8UUCnTKcTFSFAp0qECpCkKkKVIgV5zvpUn7K9a5r/wj40q5XBVv2MizJdynmGigX0CoHP2mT7hVUBVz2MOPal698j/ACaKMD71P2VSfUTiKLL+4X6s/Wys8IANRnwPotJV/wAK/NL+1+81QVZ2d/FDAXmcIqtpyc7lsaVUDdmJ2AGSa87qmlzABxC06t6Kro7m7k3h4ZdGPmHle2gLfCN31j9pVqK8X0MqXdvNZPIQqd8IzG7HkqzRs0ZY9FLAnoKYfh9Uxm26M26vMajtATYmYTYFWdTgxqAO4bII8welVt9xWOJ1hAkmuXGpLaJS8pXlqIGyLnbUxC+tR9pvVAY8JugvPaWwZx66BNv8ASaKakqX2ljjJAzuBrbW3HsQ+RgyJWAsIe7Vof8Ay8k9sPhDK0a/corpxXT2ju7WS5hlt/cuJu/S8tyrRyAxhCkksTAFX3C6se8GHPArwr17D6j9RTNeQQbWNxY3GSx1XH0Uxb296MUsU8VLFTVGUcUYqWKMUJFHFGKnijFCFDFGKnio0IUcU8VLFRoSqOKMVLFLFCW6hijFSxSxSIVcKkK4zegZ22HU4q07IcIjvz3102q3YusMAOFbScFpMeLO+FO2MHrtWV9dHRQmWS54AakqdTUz537Le3kuSadUxnJLbKqhmZj5KqglvlQ0+nHeRzRBiFVpI5FQseShyNOr0zmtZxfsxDbI11YQrDPArExIMJNGN3jK8gxA2YYOQM5G1OLtJwyW3aCe4t2R1IdCcgo4yC2PCd/iMVmHfVcjyHQxXbkCMy7stkOVwRxsrMYSwNIc/Pst4rMCp1yWUyEyxRzLcLA+hZlZW1oQGjYkfS0nB+srV1VsoZGyxtkboQCOoqkkYWOLTqExXleLlPhg17Cm65BHnTqbVRXd2al0XbL0uIv8ULZH3SN/drixXLFxBFuIyD79tLEXG/hl/FsR5jTIagYpEJaORm+1x1t+4eSl0D9ioa7nbvy9V9Gq4/B/wpZl/lGYamkLizU7iKEEqJFH9JJgsW56So884+Ti7C67koO4ysBlycidkMiqRy06cb+bCvovYCRZOF2qf0MQtJRyw8H4mT4boT86xuFRjbLjrYW7flu1aSrd9oAV9a3ccylopEkUFlLIysAynDLkdQelF9ZxzxvDMiyRSAq8bDIYHoRVT2S7K23CoXgtFcJI7StrbUdRAGM+QAA+XWr6r1QFkOwvD1tDe2pBaaGfLXDlmknhkQNAzudyVUmLy/FE9a19YWy7RRLxHiTrFdTHNtaoIYJpFY26uZD3mO7Uh5WQgsN0qxbtJeYLjhM3dAZKtPaicj6sSsyk+hcVwXsZkSAlAJVP+ECC2uYZb22khe64Y2icoylu61DvoZcb7DLgHkyeprJ4q87Qtw6OxkPD41EvHnDSEa9TIGzcOysfcCguunYB3A61S4q7w3a2HX0v/KqcQtti2tkqeKeKKsbKAlinihiAMnkKq7i/IychUGSScch1JpUi77idI1LuwVRjJ+OwAHUk7ADnXgb1gNTW1ykfPvCgwB5lAxdR8VGOtc3DPap5VnFjNPFGoNv70MeWbOqUo7A5xgKSBsW86vLriofRaxpNb3shJm71BqiiUZaSM7o5JIUEEgEknlisliX1G6GfoqcNcBqdb8dDkBpfO53K9pcJa6PamJBOg0t3jVcyMGAZSCpAII3BB5EHqKeKsbbsPatGCIxE+MrKpfvh9Yy51Z+JPrVPbMyvLbyOkk1uwVnXGHUgFJMDkSDgjowarHC8egr5HRMBDhnY53A1sbbv4uodZhr6ZocSCOW4r3xSxU6VXdlXqGKWKniligoUMUsVPFFIhc/YDgsF0809yiyiJu7giYAplQNchU7M2TgZ5Y9a1PF+zKEmaxCW12MHKjTFLjlHMi7EeTj3l6eR+e8PlkW1l7hilxZ3K3AYAsRHIcs+keIYaQEdQpFfSeBceE8KvMqxv1KMJI3GPzkbj6J9QDXlOOCo/WSSkn8iLcANMuBFjpxWzo2s6FgaNwPv23VJFxaXiZWzTXAEBHEG5SKQSvs4YeEnS2ph004xqyNZw/h8UCLHDGqIowAoA2HwrI8D4hi8vruGCWexndIxLBpZw8UaI7iM4LRkrgFcnKNtgirSW7biZmtY45Le0QiK8Mvu3EgZFfuURfzaMrjLk5wSABzECSFrsr7LBYkXzuQCft1JudkZcTong/v+fyuXt7wyLuPbY41FxbtEzSKAGeFnCSI5HiUB9e/Ipms5W67VWZfht9FEhLezShI1G+y7BVHw5CsLFIHAZSCrAMpHIg8iK230hI51G5rjo7LqP8KixhoErXDePnmpioTMRjHPP216CoyLnGOhBrWKnVXL4jjkd6oeIWTSG60bSjSy+oaIKy/4cj1ArS3igNt13PxrysLDv5nCPFDpjElxcy+CONS2nIyNRJ1Y3AwCSdsFiqmihiMkps0anwFrZ3va1k7A17n7LBcn5nyVhZW0l1YTShdE91I13CDgEMpU25J6bRp8jWq4JNc20zyWqo6zAPcWjNpDMoA7yN8HRJgAb+6wUZxjNVnBeHvDDGIru3vbFV7qOVMB1K4AX3WZXHPfYjHWrOK/ittU0zaI0Uknn6AAcyScAAbkkV5g2odGduDnbI9xHPLLXfktiWNez7vnNape2kAH423v4n6x+y3Ev+OBXQ/3q4+IcdurpTHaxSWcR2e8mCCQL17iHJIbGfek06eeGrJNd399kh2src+GOMr3xH9bKQdJ+qgyPM0v9lIW/OM8pPMySTyH7Xc1aieukZZxaw8gXOHja/eoohYDxHd+609i1vBGkMRCxxjCj3j6kknmSSSTzJJNcvFO1NragEuXlP5uGMFpXPkiDc/xms//ALH236O3kDIB9gbFWXCuDQWuTDEiMebKqqT9lVwwiLb23vJPce/M+qkdIbWA+dSyVksWq2mjdWnu4r6S6jEhfuX9oSVYtJ/N6faHUjAycmrarjivBobo62BjuQMJdx6RKPRidpE+q2fTHOqC1hvZC6R2ySGNmQ3BkEMEmOsWoFz5HYgEEZOK3OFV0TIOjkdm2+Z5nks7X0UrpdpgvfhyG9e9OvK1mLg6kaN0Z45I2xqR0OGU42PxGxBBr1q+a4OFwqlwINjqqy9uCSVHhHP1qvkiEslvC26TSqrjzVFaRlPodGD6Guk0uFRNPdRNGMx2jSNLL9HUY2Tu1829/J8setQcVmENHI4mx2SB1nIW5qVQRmSpYAL5g9gX0KwuY4jFE5xJc940e2zd3jKA/pYJbHkG8jXtxzg63cYUEJOh1282MmOTo3qvRl5EEivOewjuLVUkLIF0yJKp0vG6brLG3Qj7OYOQSKr+DcT4pcQK6LZhJM9zeOJlkaI+CY2oGnJGGA1rz5DlXkDWMdIXF2zY8+O63dbfa988ti9x0te6q4bmfi2A6tBbJmN7dWx3sqe7MZHG/cqwZQu2rBJ6CrK57HWrIqjTBKuRBLGsaMjYz7u3vDbdeRAOa5Oz99Dw1Wt76QQSo0mmaT3Y51LMwkSTw6jqyVzkHO3Il8GEtxeNfXEv5LbRThW0NHCNRBZ4w/vtpRWzKcBtQC4AOXnyPY+1MS0DNpG87rG2pNvHgAuPtIs4Xvr6qqsZWdBrAEql45QM4EkbFHA9NSnFe9c/DXLoZSCpuGnudJ5qJ5XlCn1AcCunFeyxFxjaX62F+u2fisTJsh7g3S5t1XSpVKlXa4USKVSpYrmyVZW2untpVuIwWwNMsY5yR5yQPrA7j5jrWpg4VYXKiZIYnSb38gYVj1LJy1Z55Gc86ytenDb42cvejPs7n8pjHIf1wH6Q645j4CsxjGGOlBnhyeBmB/UB6jx0V5h9YGERSfju5H919O4DhWKKAq6RgAAAAcgB05108LsWjkupXILXMocAZwqJGkaD44Qsf1sdKqrS40lXUgjYgjkQfX4Vo4pAwDDcHcV5zVAtdtcfnnYrRkL0RiDkcxWH7VcBNsz3dshNo5L3UCjJgY7tNGOsZO7KOR94bZxt6FYg5HOn8MxSWgl22ZjeOIUeppmTs2XL5ijAgEEEEAgjcEHkQajcsQhI58qve0HZgwlrixQtCctPZKMlDzaS3XqOpj+a+RoonSVAykMjDYjka9WoK+GtiEkR7N4+fM7hZOppnwO2Xd6q6nY3UdvLKZsiC5SNGlxnunjLFGbY4Hv+LoVHnXtPaFRnORXhTtXStqYTE42B3jUEZg9/euaed0MgkbuV1wCSyiKxW80UszpGshi3DGNTmVwpIQnJyxO+wydqldqbi9SI/m7VUlx0M0hIQn9VVJ+Ljyrh7Ke7dXQGwaK1b7GmH+dWnCdr66BO5eBwPqmFVX/EjVhJKXoKx8ZJOyNTvuB5B1uzu1MMvSwNfa193f7LTxoFAA5CpUUU4u0UUUUISZsAnyyay3CO2CTC/ldSIrJkRYwPecksqgNndnfCgY22PXa24xxX2UxGSMvDKTGWTLSB8ZUCIbupAbOnJGOWM4pb66hn7uK1idYu9W4uZWiliX8WCUVRIoLsX0knGAF9al0tM6ZwaGkgkZ7hx8FHqJ2xNLidBpxyy8U7CJwpaUgzys80xHLXIckL9UbKPRRXneXWPdXn1PlXnf34UHDBVAJZycADrvXLw/hj3fvSB4rTou6yTD16pH97eg562qrIKGEOebAZAbzyHzJZqCnlqpCG9p3BedlaveErGxS3UkSXA5tjmkJ8+hfp035bHhfDlASGFAkaDAA5KP8AM/vr04fY6sJGoSNAAMABVA5AAfurQW8CxrpUbfefU15pi+MS1Um07sbub7nn6ZLW0lJHTM2Wa7zvPzh+68b2xWWCS3JZUljeEspAYBlKkg+e9dESBVCqMKoCgegGBU6aKSQBzNZ65OQ+blJ5oVM55ADdmOwA8yaxvaHjS3o9mtjqs8j2i46XGDkRRHrFnxNybGkZBNLtNfi+kNshzYWzESnpczrzX60SHn0LDH0d/DFeifT304yMNqZxd2oHr7cepZ3EsTNzDH2n58HXpCjFSpVtVQXUcUqlQRSJVCjFOlQlWZuYdJ25HlXhVs6Bhg1XSRlTg1GCkKw7McT7hltZD+Jc4tmP0W5mEny6r/d8q3HD7wxnB3Q8x5eor5jNEHUqwyD/AACD0PXNaTs1xlpPyec/lCDKPy75B9L9ccmHz67YvH8IDLzsH2n8hwPEcj4Hw0OGV3SDonnMacx7hfR1YEAg5B5GpVRcPvu7Olt0P3eoq7UgjI3B5GsPLEYzYq3UgccqznaHsz3rNcWeiO6b3pYj7sVwfMkfm5frgYP0s7EaOin6Kvmo5ekhNj4HrTU0LJW7Lxkvlk02pZEZWjmiIWWFxh428mH3gjYjcZriFfSe0XZ+K+UayY50BEVymNaD9E/pp9U7fA718+g7M3o9rMRM7WTxRSRai3fExK7PCxAKPhgTGcj3sA8s+j4X9SU9YNlwLXDXeLcQeHLVZypwuSM3abjdx6lPs1/vkv8AYR/8x6tOMRvDIl5EpbQO7uEG7NEDqDqOrIcnHUM3pWf7N8WhFxM2XbMduiqkU0jZDSlgVRSQRlc5861MV9I/5uxv36D8nkT7O801SYqJf8QfJG0kZbrg/aAeKtqEtbSta42OfXqVd2d0k0ayxMHjcZVgcg17VQPwedSZbSy4jZTPhpQIrSSCRsDLPD3vi+spU+eaUPEOICQQSWsHfsCUEj3NsZAPEUV4mVsdQrsRTHS2aXPa5oH9zSB36W5p7aBNr9y0FcXFOKRWygyEln2jiXeSRvJF6/HkOuKgnDuIy/nJra0Tr3IeeTHo8gVVP7DVmuJRQ2fELqJe+mkAt8SMJJpDmJWILAHAyc6RgDoKk4aYK2bow+wGZP8AOSZqpnQx7Qbc7vgzXuWd3NzckKwBWOIHKwoeYB+k5wNTegA2G9dxHigGlRqJfaONd3kPko/gDrVl2Z4UvFJpHuD+S2rBDanUrSSYDDvUOCIgCMA+IjyG97ddhII3M/DyLOcjBXBeBxnOloycoP1CMc8GtPJWtp4zFTNBsMrmwv6+uumapWUbp3dJObX1yzt6dXwZvhnAWYrNeYLKQ0dsDmND0Ln+cf7h0861dlZGU55IObf5CubhIZ5TBcxm3uFGvuiciRAca4X5OnmeYyAQM1p0UAAAYA5CvOcTrp3zHpiS/nu6uXC3XvWmgjjjYGxDL5rzSijCgKowBU6KKpE8iqDtVxZlzY27FbiRQbmZTvBC3RT0lbfHkMt+jnr7RcY9jRVjCvez5FvEc6VA8UsmOSLn5nCjntmLW37sHLF5HYySyt4pHbxO3r6cgAANhW1+mcBMrv1M4+0aDifntvypcUxDom9Gz8j4fPnNwQLGqoihUQBVUcgByFSxUqK9IsstdQxRUiKiRSISqNTNRpEqiRRTqNIlVSKhNCGHr0NTFSFRlJVSykHB5ioSx6sEMUdCGjkHiRhyI/06jIqyuYNQyPEK4MY2NK5ocC05gpASDcLTdnuNe0gxyAJdRAd4g5MOkkfmp+47fHTcOvu7OlvAfu/7V8xljOVeNjHNGcxyDmD1BHVTyI61q+A8aW5BVgI7mPHexZ+x0P0kPn05GsDjWDfpztNF4z/15H0PYVqKCuE7dl35Dx5+63wOdxyNOqTh19o91vAeR/R/7Vdg1j5YjGbFWK5+IXiW8Uk0pxHCjyOfRRk48ztXb2K4U0Nkvfri4umku7lTzEkx1FP2F0p+wKqFtvb7tYOdraNHcXZ6PKMPBb+uDpkYeQQHx1vK1eAUhjiMztXaf7R7nPmLFV1VJtO2Ru818+41ZfyXcm8TIsrplW9X6KMfdS6A5A5IV/MYb6JrW8LiyS5+jsPj/H766eJWaXETxSKGSRWVlIyCCCCCPIgkfOsl2b7RRWcTWN17S1zZM0JKW17OWj5wSM0UbDUYyucnxBqv1GutxWQsbT+Vbe7a4du7luZvY2XAaFbdu5jliPRi8byZ668bjavfiHbGERSmGG+kmCOYo/YOJrrfSdC5aEAZOBknFW3Zzh3slpbW2cmCKKNj5sqgM3zOT86Ui6RZPhN3KWltboBby1IWTAwsqN+buIx+gwB26MGXpXNJNK3E7izt8pNdLZztNpyIoFRkkk32L+4FUHO7AkEKa0vafgrXHd3FvpW9ttXdFjhZEbHeQSEA+42AQfosFO+CDw2/ZR2geSV1TisjrcrcLkiGSMEQxKdi0SqSjDbWHkO2s1T0eHfpap7mfgQLcjw7N3vdSJJttgB1Cfae3WC7srpRgSluHzY6hwXgJ88SIVH9sfOr20sfpSfJf9f9Kx/aTtZaT8NkMk0EHEItMvsLSx98t3ayK/cqvib8ZHpBA94EEc6+hVb2TF1Vcc4NFeR93JlWQ64ZkwJInHJ426H05EZByCRWZsLmVJGtLsKLuIagyjCTxZwJogeW+Ay/RJxyKk7uqHtXwdrqINCQt5bky2sh5a8YMbn+jce6w9QeYFV2JYeyrj4OGh9DyPhrxBdhlMbuS464+M8VjsohK6mSWQ6La3HilkxkAeSjmW5AAmvAcegS0S8kDASe6ltt3rTAkGAL+mGVgeg0knABNZnMs0rXNyQbhxpVRukMeciKP06lubHfkABV4BgElVJ0kos1p38fe/dqd1+sQxBsDLNzJ0UII5CzzXDiS6mwZXGQoA8McYPhjXOAPiTuTXvTor1KONsbQ1osBosg97nuLnHMpUYp0q7XKVI1I0qRCgaRqRpGkSqNKmaVIugqcVIUhTFRVJQK8ri31bjxfvr1Fei10uFUEY2NeUkRyrxuY5o8mOUc1PUEfSU9QedWt5CCpbqKrxSOY17S1wuDuStcWkOabELRcA44LjMUqiO6QZaP6Lj+kiPVfTmOvmb2HiM7OLK1Ae6lGVLbrAmcGaX6o3wvNjsOpHziZQJUkbCrpaLv8SFrYsyEXCKhBYrpwR1DHORmvsHZjhsFtEHt5O+M2JXu8qzTHGzlhtjGwA2A2FYuswOJtRY/6eoB8r8B32yPFaSCvdLDn+W8rTcE4THZwJBGSQuWeRt3kdjqeRz1ZmJJ+NWNcdneh9m2b7j8K7KsAmiiqVLZk4i8oDd3cWyK5+iHglbT+0RO3yT0q6opUIooooQiiiihCzAX2XivICDikZPwurdRn+/D/wDnPnWnrN9vFK2ZuV8fD3ivl89MLZmA+MRlX9qtCrAgEHIOCD5g0IU6K57y7jhRpJpEijQZaR2VVUeZY7Cvn/Hu2Ml2DDYF4bdtmviCruPK2U7j+1Yfqg7MHI4nyO2WhNyStjG04ql4nBEeJ38kTa0WQIm5KRyNGhuVjHIEuAWI+lkHlXtXja2yRIscahUXYKP43Od89a9hWlp4uijDOHms/PJ0khejFGKKKeTSVKpUjQhRpGnQaRCiaiamaiaRKomig0UiVUopigUCoylKQqa1AVNaVcJkZGDyNcE9qV3G4+8VYUCughU4ro4Zf3Fmxa0m7sMcvAw1wufMx5Gk+qFSeua7ZLdW5jfzFV8oAJC7gVzJG2QWcLrpkjmG7TZa+x/CGoGLu0ljI5yQkTJ8dOzj4aTWm4f2/tGVWBupEYBlYWnECSDyIIiww+FfM+B8IPELjuN/Z48Ndv8AVPKEH9J+vkuT1FfZuGWwJAwBGgACjYbcgB5VR1Uccb9lnb7e6t6Z8j2bT+z55KytLlZo1kUOFcZAdJI2x6o4DL8CBXRRRUdPoooooQiiiihCreOwTSW8iW4haRwVKS69DqRhkLLupIPiwceRr5jYdpeLRxpYyvBZ3FtHHG4MRknZVUIsyszd2wOM5CsM7V9gqk7Tdnob+IJJlJoyWt7lcd5C/mp6g8ip2YbGnInMa67xcJuVrnNs02PFfNJbXvXElzLLdSqcq8zagp80jACIfVVFdFeKCWKWS2uVCXUGNYGdEiHwTRZ5o2D8CCp5V7VpYej2AY9DwWel29siTXmmKdIUxTybTFBpUUiEUjTpGlQlSNOkaEJUjTNRNIlSNRqRqNcpVTCpCoipCoqlJipCoCpCulypimKQqE82gZ6nkKVIvO8nwNI5nn6CuO3gkmljggAM8xIXOdKqPFI/1VH2nA6ivKecKrO5wqgsx9BX0PsDwE20JuJ1xd3QUuD/ADcYyY4h5EA5b6xPkKjVdR0TLDU6cuakU0HSuz0Hjy91dcC4RFZQLBFkgZZ3Pikc+J3PmfuGANgK1VjHpQeZ94/OqiFNTKvmQP8AWr+qJXJRRRRSpEUUUUIRRRRQhFFFFCFlO3nAWuohNAub201SQgbd6uPxlux8mAGPJgp6GsNa3CyokiHKOAy9Nj5jofSvslfJ+PWPsfEJ4QMQ3IN7B5As2LhB8HIf/wB70qyw2ctf0Z0OnX+4VdiEN29INRr1fyvGnSoq9VOpZozUc0UITzSoooQlSNM0qRCRqJqRqJoKVI0qDSrlKqcVIVEUCoqlKVSFRpilC5Xpmqu4l1Nnp0rrvJMLjqdqr66SKx7L8M9svoomGYbfF1P5HS2IUPxf3vhGfOvrtYr8F1oBb3FyR71zM6g/1cH4tR/eEh/ara1QVUm3KT2d3y6vKdmxGB2966uGDMg9AT/l/nVxVNYzJHreR1RFXd2IVQM9SdhVZc/hC4cpKxSvduOltHJMv/yqO7Hzao5cALnIJ4i5WsorAzdvLl/934bgHkbi4ijP9yISfvFeZ45xqTwrYwj+yuJT8maRB91RZMQpmfk8efkuxBIf6V9Cor5+JeMMPev4kPXRbxD/AIi9RNvxQ/8AjEo+EFh/nDUY41Rj+vwK7/SycPFfQqK+V8c4hxCzVWbitzKznCRJa2Tk43ZiFhyFUbk9B9lWUV7xYqrw31rOjAMrNbhgykZBBSRNiK6GMUlrl1usH2Sfp5NPVfQqKwQ7R8Xi8dnZ3HnoeeA/IFZB99dMP4QI12u7O8tsc3CLOn2wlnx8VFSY62nk/B4PauDDI3UFbSsP+FG2AitboeK3nSNj/V3P4ph8NZiP7NaXhHHbS8Ba1uYZ8eIIyll9GXmp9CKq/wAJSA8JviRnu4++H60TLIv3oKmsdsPDuBHmmJG7TC3iCO8LD0UjRWsKzKdFFOkQiilTpUIxSp0jSISxUSKkTXrcW7Jp1jGtVddwcq2cHb4UFKucio4rQdmuDR3TP3khGj+bXGo8veyRsN6qLgKjuq50qzhc88AnGflTbHtc8sGo9V25hawPOhWYMoBxvkDPJv301nU9Tvgcm6/KvWpVGsVIySpigUxXYXJXFftuB5Cuaum98XyrwpQkWm7JdtLK0sYLdjPJdRK5kgjikLBmkcnLEBBueeqlxHttezZW3ijtEP8AOPiabHmFHuIfiXrIj/e1/wDTy/8AMjqyqvFCxp+438F3PiUt9llh4nx9l5vZJcv+WPLdM30ppGOD9QAgJ+yBVmtpIgAiu7mMDkuqOQf/AGKx++uKHxL8V/fVxTppKeQAPjabcQD5hR4audtyHu7ypRcSv4vBLasPJ7c5+bJIv7q6l7T3687ezk8yJZ4/uKN++uM0qr5Pp3DHm5hHYXDyKmNxWrH9feB7KzXtfOB7/DwT9S4jb/iVakO2jdeHXnyezP8A1aqqKiP+lMOdoHDqd7gnxTzcaqhrsns9iu6+7TQXChZ+F3cgU6lBFmcHBGQe+yNiR8Ca907YooCrw++CqAAoFkAAOQA77YVVUVx/lKhtbaf/AMh/5XX+N1PBvcfdW3+2h6cPu/m1kP8Aq15T9qpXHu8PU/2s8Y/4Eeq6inGfSmGtzIcet3tZcuxuqOmyOz3JVdxO2munDsttbOvhkiEzzofNJyVK/ZXZddq7pbefhdwXvY7iKOOO5OgTRmV+7Al3HeKcE6gNQwc55j2rLT//ANu3/sD+6SrNuHU8LBHE2wuN5Op5kppldPI8ueb5HcBu5BbPNANKnV3e6r7J080qKEieaKVFCEUUUUIVt2f4iluzlywVwo91ctsTyYOun78/KrD+XYiVVFOSIky+jDJlg6OxPurhs6h151mDRTDqZjnbR1T7Kl7GhoWz4PxCBZbgiRVihVIoAzKCwXUWYZ8RLb/MVjNZ60Uq6jgEbi6+tvD3SSTGQAEaX8fbRf/Z",
      "data:image/jpeg;base64,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",
    ],
    disponibilidade: {
      padrao: false,
      domingo: {
        disponivel: false,
        inicio: 360,
        fim: 1110,
      },
      segunda: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
      terca: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
      quarta: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
      quinta: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
      sexta: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
      sabado: {
        disponivel: false,
        inicio: 0,
        fim: 0,
      },
    },
    status: true,
  });
  const [base64, setBase64] = useState<string>("");
  const [value, setValue] = useState<string | null>(null);

  const recuperarBase64 = async () => {
    const asset = Asset.fromModule(require("../../../assets/logo.png"));
    try {
      const localUri = asset.localUri || (await asset.downloadAsync()).uri;
      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64(`data:image/png;base64,${base64}`);
    } catch (error) {
      setBase64("");
    }
  };

  const compartilhar = async () => {
    Alert.alert(
      "Compartilhar",
      "Deseja compartilhar o QR Code?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Compartilhar",
          onPress: async () => {},
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: espaco ? espaco.nome : undefined,
      headerRight: () =>
        utils.possui_permissao([Role.ADMIN, Role.LABS], user!.role) && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Espacos_Editar", {
                id: route.params.id,
              })
            }
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="create-outline" size={26} color="black" />
          </TouchableOpacity>
        ),
    });
    recuperarBase64();
    setValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZGFqc2tkYW5zbGRqYXNkamFsc2Rhc2RqYXNkYXNkYXNkIiwidGlwbyI6ImVzcGFjbyJ9.2oI_i_L0WadOEKvyNA3G8y_FdZLrFqO061wj3UTTXkc"
    );
  }, []);
  return (
    <>
      <Conexao />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {espaco ? (
          <View
            style={{
              flex: 1,
              paddingVertical: 20,
              paddingHorizontal: 20,
              gap: 20,
            }}
          >
            {utils.possui_permissao([Role.ADMIN, Role.LABS], user!.role) && (
              <Card
                title="QR Code"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {value ? (
                  <QRGenerator
                    width={(width - 60) * 0.8}
                    height={(width - 60) * 0.8}
                    type={"svg"}
                    value={value}
                    image={base64}
                    backgroundOptions={{
                      color: "transparent",
                    }}
                    cornerSquareOptions={{
                      type: "extra-rounded",
                    }}
                    cornerDotOptions={{
                      type: "dots",
                    }}
                    dotOptions={{
                      type: "dots",
                    }}
                    imageOptions={{
                      hideBackgroundDots: true,
                      imageSize: 0.3,
                      margin: 3,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "300",
                      color: "#aaa",
                      margin: 10,
                    }}
                  >
                    Não foi possível gerar o QR Code.{`\n`}Tente novamente mais
                    tarde.
                  </Text>
                )}
                {value && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <Button onPress={compartilhar}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <Ionicons name="share-social" size={20} color="#fff" />
                        <Text
                          style={{
                            color: "#fff",
                          }}
                        >
                          Compartilhar
                        </Text>
                      </View>
                    </Button>
                  </View>
                )}
              </Card>
            )}
            <Card title="Fotos">
              <Slider images={espaco.imagens} fullImage />
            </Card>
            <Card title="Informações">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Localização</Text>
                <Text>{espaco.localizacao}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Capacidade</Text>
                <Text>{espaco.capacidade}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Status</Text>
                <Text>{espaco.status ? "Ativado" : "Desativado"}</Text>
              </View>
            </Card>
            <Card
              title="Disponibilidade"
              style={{
                gap: 10,
              }}
            >
              {espaco.disponibilidade.padrao && (
                <Text
                  style={{
                    fontWeight: "300",
                    textAlign: "center",
                    fontSize: 12,
                    paddingHorizontal: 20,
                  }}
                >
                  Horário padrão de funcionamento da instituição
                </Text>
              )}
              {!espaco.disponibilidade.padrao &&
                espaco.disponibilidade.domingo !== null &&
                espaco.disponibilidade.segunda !== null &&
                espaco.disponibilidade.terca !== null &&
                espaco.disponibilidade.quarta !== null &&
                espaco.disponibilidade.quinta !== null &&
                espaco.disponibilidade.sexta !== null &&
                espaco.disponibilidade.sabado !== null && (
                  <>
                    {espaco.disponibilidade.domingo.disponivel && (
                      <Horario
                        dia="Domingo"
                        stateDia={espaco.disponibilidade.domingo}
                      />
                    )}
                    {espaco.disponibilidade.segunda.disponivel && (
                      <Horario
                        dia="Segunda"
                        stateDia={espaco.disponibilidade.segunda}
                      />
                    )}
                    {espaco.disponibilidade.terca.disponivel && (
                      <Horario
                        dia="Terça"
                        stateDia={espaco.disponibilidade.terca}
                      />
                    )}
                    {espaco.disponibilidade.quarta.disponivel && (
                      <Horario
                        dia="Quarta"
                        stateDia={espaco.disponibilidade.quarta}
                      />
                    )}
                    {espaco.disponibilidade.quinta.disponivel && (
                      <Horario
                        dia="Quinta"
                        stateDia={espaco.disponibilidade.quinta}
                      />
                    )}
                    {espaco.disponibilidade.sexta.disponivel && (
                      <Horario
                        dia="Sexta"
                        stateDia={espaco.disponibilidade.sexta}
                      />
                    )}
                    {espaco.disponibilidade.sabado.disponivel && (
                      <Horario
                        dia="Sábado"
                        stateDia={espaco.disponibilidade.sabado}
                      />
                    )}
                    {(
                      !espaco.disponibilidade.domingo.disponivel &&
                      !espaco.disponibilidade.segunda.disponivel &&
                      !espaco.disponibilidade.terca.disponivel &&
                      !espaco.disponibilidade.quarta.disponivel &&
                      !espaco.disponibilidade.quinta.disponivel &&
                      !espaco.disponibilidade.sexta.disponivel &&
                      !espaco.disponibilidade.sabado.disponivel
                    )&&(
                      <Text
                        style={{
                          fontWeight: "300",
                          textAlign: "center",
                          fontSize: 12,
                          paddingHorizontal: 20,
                        }}
                      >
                        Não há horários disponíveis
                      </Text>
                    )}
                  </>
                )}
            </Card>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "300",
                color: "#aaa",
                textAlign: "center",
              }}
            >
              Não foi possível carregar os dados do espaço.{`\n`}Tente novamente
              mais tarde.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}
