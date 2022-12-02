import React from "react";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;
const HList = ({ title, data }) => {
  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title ?? item.original_name}
      voteAverage={item.vote_average}
      fullData={item}
    />
  );
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        renderItem={renderVMedia}
      />
    </ListContainer>
  );
};
export default HList;
