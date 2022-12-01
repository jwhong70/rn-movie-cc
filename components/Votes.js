import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  margin-bottom: 5px;
`;

const Votes = ({ votes }) => {
  return <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>;
};
export default Votes;
