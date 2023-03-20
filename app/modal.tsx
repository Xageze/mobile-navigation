import { Camera, CameraType } from "expo-camera";
import { Text, View, TouchableOpacity } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhotoContext } from "../PhotoContext";
import * as Location from "expo-location";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

export default function ModalsScreen() {
  const cameraRef = useRef<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { photos, setPhotos } = useContext(PhotoContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);

  if (!permission) {
    return <Text>Permission needed to use camera</Text>;
  }
  if (permission && !permission.granted) {
    requestPermission();
    return <Text>Permission needed to use camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.8 };
      const userLocation = await Location.getCurrentPositionAsync();
      const photo: PhotoType = {
        uri: (await cameraRef.current.takePictureAsync(options)).uri,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      setPhotos([photo, ...photos]);
      await AsyncStorage.setItem("photos", JSON.stringify([...photos, photo]));
    }
  };

  return (
    <View>
      <Camera
        type={type}
        ref={(camera) => {
          cameraRef.current = camera;
        }}
        style={{ width: "100%", height: "80%" }}
      />
      <View style={tw`pt-6 flex flex-row justify-around gap-4 py-4`}>
        <TouchableOpacity
          style={tw`px-3 py-2 rounded-lg border border-gray-300`}
          onPress={toggleCameraType}
        >
          <Text style={tw`text-white`}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`px-3 py-2 rounded-lg border border-gray-300`}
          onPress={takePicture}
        >
          <Text style={tw`text-white`}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
