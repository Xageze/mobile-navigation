import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { View } from "react-native";
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
    <View style={tw`items-center min-h-full bg-green-100`}>
      <PhotoList photos={[...photos]} />
    </View>
  );
}
