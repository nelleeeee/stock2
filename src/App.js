import React from "react";
import styled from "styled-components";
import StockTable from "./body/tables/StockTable";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  return (
    <Container>
      {/* <Router>
        <Route exact path="/" component={StockTable} user={user} />
      </Router> */}
      <PhoneNumber />
      <StockTable user={user} />
    </Container>
  );
}

export default App;

const Container = styled.div``;
