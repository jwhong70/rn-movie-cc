import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { moviesApi } from "./../api";
import Loader from "./../components/Loader";
import Slide from "../components/Slide";
import HList from "../components/HList";
import HMedia from "../components/HMedia";

const Container = styled.ScrollView``;
const ComingSoonTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

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
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      voteAverage={item.vote_average}
      releaseDate={item.release_date}
      fullData={item}
    />
  );
  return loading ? (
    <Loader />
  ) : (
    <FlatList
      data={upcomingData.results}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      renderItem={renderHMedia}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
                fullData={movie}
              />
            ))}
          </Swiper>
          <HList title="Trending Movies" data={trendingData.results} />
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
    />
  );
};
export default Movies;
