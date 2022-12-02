import React from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = () => {
  return <Container></Container>;
};
export default Detail;
