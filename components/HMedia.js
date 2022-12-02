import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
  opacity: 0.6;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;
const HMedia = ({
  posterPath,
  originalTitle,
  overview,
  voteAverage,
  releaseDate,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>
            {originalTitle.length > 30
              ? `${originalTitle.slice(0, 30)}...`
              : originalTitle}
          </Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>
            {overview !== "" && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};
export default HMedia;
