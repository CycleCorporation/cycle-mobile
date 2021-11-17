import React, { useState, useEffect } from "react";
import { FlatList, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  PrestadorContainer,
  PrestadorSubtitle,
  PrestadorTitle,
} from "../Search/styles";
import { AirbnbRating } from "react-native-ratings";
import { api } from "../../services/api";

type RouteProps = {
  item: any;
};

export function Categoria() {
  const { params } = useRoute<any>();
  const { item } = params;
  const navigation = useNavigation<any>();
  const [prestadores, setPrestadores] = useState<any[]>([]);

  const imageUrl = "http://localhost:3333/files";

  useEffect(() => {
    const handleSearch = async () => {
      const responseArea = await api.get("/prestadores/area", {
        params: { areaAtuacao: item.nome },
      });

      setPrestadores(responseArea.data);
    };

    handleSearch();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 2,
          borderBottomColor: "#b5b5b5",
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          size={30}
          name="chevron-back-sharp"
          color="#828282"
        />
        <Title>{item.nome}</Title>
      </View>

      <FlatList
        data={prestadores}
        style={{ marginTop: 40 }}
        keyExtractor={(prestador) => prestador.id}
        renderItem={({ item }) => (
          <PrestadorContainer
            onPress={() => navigation.navigate("Profissional", { item })}
            rippleColor="#dddddd"
          >
            <Image
              source={{ uri: `${imageUrl}/${item.user.user_image}` }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <View style={{ paddingLeft: 20 }}>
              <PrestadorTitle>{item.user.name}</PrestadorTitle>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <PrestadorSubtitle>{item.profissao.nome}</PrestadorSubtitle>
                <AirbnbRating
                  defaultRating={3}
                  starContainerStyle={{
                    paddingTop: 4,
                  }}
                  isDisabled
                  selectedColor="#e0b320"
                  size={12}
                  showRating={false}
                />
              </View>
            </View>
          </PrestadorContainer>
        )}
      />
    </SafeAreaView>
  );
}
