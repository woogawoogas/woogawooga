import React from "react";
import styled from "styled-components";

export default function ScreenSize({ children }) {
  return <MainWrap>{children}</MainWrap>;
}

const MainWrap = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  background-color: #fbfcfc;
`;
