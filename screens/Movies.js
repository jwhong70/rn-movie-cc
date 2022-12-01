import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "./../api";
import Loader from "./../components/Loader";
import Slide from "../components/Slide";

const Container = styled.ScrollView``;

const Movies = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  return loading ? (
    <Loader />
  ) : (
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
        {nowPlayingData.results.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};
export default Movies;
