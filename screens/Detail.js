import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Dimensions, StyleSheet } from "react-native";
import { makeImgPath } from "./../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "./../colors";
import Poster from "../components/Poster";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Data = styled.View`
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;
const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  useEffect(() => {
    setOptions({ title: "original_title" in params ? "Movie" : "TV Show" });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
      </Data>
    </Container>
  );
};
export default Detail;
