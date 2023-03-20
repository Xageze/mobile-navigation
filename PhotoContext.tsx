import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type ChildrenType = {
  children: React.ReactNode;
};

type Photo = {
  uri: string;
  latitude: number;
  longitude: number;
};

type PhotoContextType = {
  photos: Photo[];
  setPhotos: Dispatch<SetStateAction<Photo[]>>;
};

export const PhotoContext = createContext<PhotoContextType>({
  photos: [],
  setPhotos: () => {},
});

export const PhotoProvider: React.FC<ChildrenType> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};
