import { Button, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, provider } from "../../firebase";
import firebase from "firebase";
import Row from "./Row";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function StockTable({ user }) {
  // input state
  const [coverUrl, setCoverUrl] = useState("");
  const coverUrlHandle = e => {
    setCoverUrl(e.target.value);
  };

  const [albumName, setAlbumName] = useState("");
  const albumNameHandle = e => {
    setAlbumName(e.target.value);
  };

  const [albumPrice, setAlbumPrice] = useState("");
  const albumPriceHandle = e => {
    setAlbumPrice(e.target.value);
  };
  const [quantity, setQuantity] = useState("");
  const quantityHandle = e => {
    setQuantity(e.target.value);
  };

  //   입력
  const sendContent = () => {
    db.collection("content").doc().set({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      coverUrl,
      albumName,
      quantity,
      albumPrice,
    });
    setCoverUrl("");
    setAlbumName("");
    setQuantity("");
    setAlbumPrice("");
  };

  //   로그인

  const signIn = e => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch(e => alert(e.message));
  };

  const logout = () => {
    auth.signOut();
  };

  //   앨범 리스트 state
  const [albumLists, setAlbumLists] = useState([]);
  useEffect(() => {
    db.collection("content")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        setAlbumLists(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <>
      {user?.uid === "JMgFWWDDYnWK397zghsOv9ZfEdt1" ? (
        <Container>
          <Header>
            <Cover>커버</Cover>
            <Album>앨범명</Album>
            <Price>가격</Price>
            <Quan>수량</Quan>
            <Acc>버튼</Acc>
          </Header>
          <Input>
            <InputCover
              value={coverUrl}
              onChange={coverUrlHandle}
              placeholder="커버 URL"
            />
            <InputAlbum
              value={albumName}
              onChange={albumNameHandle}
              placeholder="앨범 이름"
            />
            <InputPrice
              value={albumPrice}
              onChange={albumPriceHandle}
              placeholder="가격"
            />
            <InputQuan
              value={quantity}
              onChange={quantityHandle}
              placeholder="수량"
            />
            <InputAcc
              onClick={sendContent}
              onSubmit={sendContent}
              type="submit"
            >
              완료
            </InputAcc>
          </Input>

          {albumLists?.map(
            ({
              id,
              data: { createdAt, coverUrl, albumName, quantity, albumPrice },
            }) => (
              <Row
                key={id}
                id={id}
                createdAt={createdAt}
                coverUrl={coverUrl}
                albumName={albumName}
                quantity={quantity}
                albumPrice={albumPrice}
                user={user}
              />
            )
          )}
        </Container>
      ) : (
        <Container>
          <Header>
            <Cover>커버</Cover>
            <Album>앨범명</Album>
            <Price>가격</Price>
            <Quan>수량</Quan>
          </Header>

          {albumLists?.map(
            ({
              id,
              data: { createdAt, coverUrl, albumName, quantity, albumPrice },
            }) => (
              <Row
                key={id}
                id={id}
                createdAt={createdAt}
                coverUrl={coverUrl}
                albumName={albumName}
                quantity={quantity}
                albumPrice={albumPrice}
              />
            )
          )}
        </Container>
      )}

      <VpnKeyIcon
        style={{
          color: "lightgrey",
          position: "fixed",
          right: "3",
          bottom: "3",
        }}
        onClick={signIn}
      />
      <VpnKeyIcon
        style={{
          color: "lightgrey",
          position: "fixed",
          left: "3",
          bottom: "3",
        }}
        onClick={logout}
      />
    </>
  );
}

export default StockTable;

const Container = styled.div`
  margin: 30px auto;
  width: 75vw;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Cover = styled.div`
  flex: 0.19;
`;
const Album = styled.div`
  flex: 0.49;
`;
const Price = styled.div`
  flex: 0.09;
`;
const Quan = styled.div`
  flex: 0.09;
`;
const Acc = styled.div`
  flex: 0.09;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;

  > div {
    padding: 5px;
    border-radius: 5px;
    background-color: #6060e0;
    color: white;
    font-size: large;
    font-weight: 600;
  }
`;

//
const Input = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 1;
`;

const InputCover = styled(TextField)`
  flex: 0.19;
`;
const InputAlbum = styled(TextField)`
  flex: 0.49;
`;
const InputPrice = styled(TextField)`
  flex: 0.09;
`;
const InputQuan = styled(TextField)`
  flex: 0.09;
`;
const InputAcc = styled(Button)`
  flex: 0.09;
`;

//
