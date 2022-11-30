import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, View } from "react-native";

const Container = styled.ScrollView``;

const Movies = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  return (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 40,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        <View></View>
      </Swiper>
    </Container>
  );
};
export default Movies;
