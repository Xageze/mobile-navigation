import React from "react";
import { Image } from "react-native";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

type PhotoListProps = {
  photos: Array<PhotoType>;
};

export const PhotoList: React.FC<PhotoListProps> = ({ photos = [] }) => {
  return (
    <>
      {photos.map((photo: PhotoType) => {
        return (
          <Image
            key={photo.uri}
            source={{ uri: photo.uri }}
            style={{ width: 200, height: 300 }}
          />
        );
      })}
    </>
  );
};
