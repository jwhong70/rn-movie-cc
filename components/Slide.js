import React from "react";
import styled from "styled-components/native";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
} from "react-native";
import { makeImgPath } from "./../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";

const BgImg = styled.Image``;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          source={{ uri: makeImgPath(backdropPath) }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView
          intensity={85}
          style={StyleSheet.absoluteFill}
          tint={isDark ? "dark" : "light"}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 ? (
                <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
              ) : null}
              <Overview>{overview.slice(0, 100)}...</Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Slide;
