import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";

function Row({
  id,
  user,
  coverUrl,
  albumName,
  quantity,
  albumPrice,
  albumNumber,
}) {
  const [fix, setFix] = useState(false);

  // input state
  const [coverUrlFix, setCoverUrlFix] = useState(coverUrl);
  const coverUrlFixHandle = e => {
    setCoverUrlFix(e.target.value);
  };

  const [albumNameFix, setAlbumNameFix] = useState(albumName);
  const albumNameFixHandle = e => {
    setAlbumNameFix(e.target.value);
  };
  const [quantityFix, setQuantityFix] = useState(quantity);
  const quantityFixHandle = e => {
    setQuantityFix(e.target.value);
  };
  const [albumPriceFix, setAlbumPriceFix] = useState(albumPrice);
  const albumPriceFixHandle = e => {
    setAlbumPriceFix(e.target.value);
  };

  const [albumNumberFix, setAlbumNumberFix] = useState(albumNumber);
  const albumNumberFixHandle = e => {
    setAlbumNumberFix(e.target.value);
  };
  //   입력

  const fixHandle = () => {
    if (fix) {
      setFix(false);
    } else {
      setFix(true);
    }
  };

  const fixUpdate = () => {
    if (
      (albumNumberFix ||
        coverUrlFix ||
        albumNameFix ||
        quantityFix ||
        albumPriceFix) === "삭제"
    ) {
      db.collection("content").doc(id).delete();
    }
    db.collection("content")
      .doc(id)
      .update({
        coverUrl: coverUrlFix,
        albumName: albumNameFix,
        quantity: quantityFix,
        albumPrice: albumPriceFix,
        albumNumber: Number(albumNumberFix),
      });
    setCoverUrlFix(coverUrlFix);
    setAlbumNameFix(albumNameFix);
    setQuantityFix(quantityFix);
    setAlbumPriceFix(albumPriceFix);
    setAlbumNumberFix(albumNumberFix);
    fixHandle();
  };
  return (
    <Container>
      {fix ? (
        <>
          <AlbumNumberFix
            value={albumNumberFix}
            onChange={albumNumberFixHandle}
          />
          <CoverImageFix value={coverUrlFix} onChange={coverUrlFixHandle} />
          <AlbumNameFix value={albumNameFix} onChange={albumNameFixHandle} />
          <PriceFix value={albumPriceFix} onChange={albumPriceFixHandle} />
          <QuantFix value={quantityFix} onChange={quantityFixHandle} />
          {user?.uid === "JMgFWWDDYnWK397zghsOv9ZfEdt1" ||
          user?.uid === "sb8waDqYPrO6iLT1G7yaxtVaBfk2" ? (
            <Accc
              //   style={{ flex: "0.09", width: "10px" }}
              onClick={fixUpdate}
              type="submit"
              onSubmit={fixUpdate}
            >
              완료
            </Accc>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <AlbumNumber>{albumNumber}</AlbumNumber>
          <CoverImage src={coverUrl} />
          <AlbumName>{albumName}</AlbumName>
          <Price>
            {Number(albumPrice) + 1000}
            {"원"}
          </Price>
          <Quant>
            {quantity}
            {"장"}
          </Quant>
          {user?.uid === "JMgFWWDDYnWK397zghsOv9ZfEdt1" ||
          user?.uid === "sb8waDqYPrO6iLT1G7yaxtVaBfk2" ? (
            <Accc
              // style={{ flex: "0.09", width: "10px" }}
              onClick={fixHandle}
            >
              수정
            </Accc>
          ) : (
            ""
          )}
        </>
      )}
    </Container>
  );
}

export default Row;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const AlbumNumber = styled.div`
  flex: 0.09;
  text-align: center;
  font-weight: bold;
`;

const CoverImage = styled.img`
  flex: 0.1;
  object-fit: contain;
  max-height: 70px;
  border-radius: 10%;
`;
const AlbumName = styled.div`
  flex: 0.49;
  /* padding-left: 10px; */
`;

const Price = styled.div`
  flex: 0.09;
  text-align: center;
`;

const Quant = styled.div`
  flex: 0.09;
  text-align: center;
`;
const Accc = styled(Button)`
  flex: 0.09;
`;

// 수정 fix

const AlbumNumberFix = styled(TextField)`
  flex: 0.09;
`;
const CoverImageFix = styled(TextField)`
  flex: 0.1;
`;
const AlbumNameFix = styled(TextField)`
  flex: 0.49;
`;

const PriceFix = styled(TextField)`
  flex: 0.09;
`;

const QuantFix = styled(TextField)`
  flex: 0.09;
`;
