import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { ScrollView, View } from "react-native";
import { PhotoContext } from "../../PhotoContext";
import { PhotoList } from "../../components/PhotoList";

export default function TabOneScreen() {
  const { photos, setPhotos } = useContext(PhotoContext);

  const getPhotos = async () => {
    const photoStorage = (await AsyncStorage.getItem("photos")) || "[]";
    const photos = JSON.parse(photoStorage);
    setPhotos(photos);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PhotoList photos={[...photos]} />
      </View>
    </ScrollView>
  );
}
