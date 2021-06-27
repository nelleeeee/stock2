import React from "react";
import styled from "styled-components";

function PhoneNumber() {
  return <Container>문의 : 010-5788-7679</Container>;
}

export default PhoneNumber;
const Container = styled.div`
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: right;
  width: 75vw;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  padding-right: 30px;
`;
