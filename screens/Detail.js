import React, { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  useEffect(() => {
    setOptions({ title: "original_title" in params ? "Movie" : "TV Show" });
  }, []);
  return <Container></Container>;
};
export default Detail;
