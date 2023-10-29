import React from "react";
import styled from "styled-components";

export default function LoadingScreen() {
  return (
    <div>
      <Wrapper>
        <Text>Loading...🎈</Text>
      </Wrapper>
    </div>
  );
}

const Text = styled.span`
  font-size: 24px;
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
