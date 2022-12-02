import React, { useState } from "react";
import styled from "styled-components/native";
import Loader from "./../components/Loader";
import { ScrollView } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tvApi } from "../api";
import HList from "./../components/HList";
import { RefreshControl } from "react-native";

const Tv = () => {
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );
  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );
  const loading = trendingLoading || todayLoading || topLoading;
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 30 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};
export default Tv;
