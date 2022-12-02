import React from "react";
import styled from "styled-components/native";
import Loader from "./../components/Loader";
import { ScrollView } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

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
  return loading ? <Loader /> : <ScrollView></ScrollView>;
};
export default Tv;
