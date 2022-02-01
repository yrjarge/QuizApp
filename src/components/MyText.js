import React from "react";
import { Text } from "react-native";
import { FiraSans_400Regular, useFonts } from "@expo-google-fonts/fira-sans";

const MyText = (props) => {
  let [fontsLoaded] = useFonts({ FiraSans_400Regular });
  if (fontsLoaded) {
    return (
      <Text style={{ fontFamily: FiraSans_400Regular, ...props.style }}>
        {props.children}
      </Text>
    );
  } else {
    return null;
  }
};

export default MyText;
