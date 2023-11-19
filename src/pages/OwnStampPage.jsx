import React, { useEffect, useState } from "react";
import styled from "styled-components";
import gangneung from "../assets/gangneung.png";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef } from "react";
const Body = styled.div`
  width: 380px;
  height: 840px;
  display: flex;
  align-items: center;
  flex-flow: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  margin-left: 15px;
  margin-top: 55px;
`;

const LocalNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #184386;
  width: 100%;
`;

const LocalImageWrapper = styled.img`
  display: flex;
  justify-content: center;
  width: 360px;
  border-radius: 5px;
  object-fit: fill;
  margin-top: 10px;
`;

const StampWrapper = styled.div`
  width: 360px;
  height: 420px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const EachStamp = styled.div`
  width: 95px;
  height: 95px;
  border-radius: 10px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StampImg = styled.img`
  width: 70px;
  height: 70px;
`;

const OwnStampPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const alertShownRef = useRef(false);
  useEffect(() => {
    axios.get(`http://43.200.76.188:8000/users/stamp/`).then((res) => {
      setPlaces(res.data);

      const updatedStampCount = res.data.length;

      if (updatedStampCount === 10 && !alertShownRef.current) {
        alert("스탬프 미션을 완료하셨습니다. 내 지갑을 확인해보세요!");
        alertShownRef.current = true; // set the ref to true after showing the alert
      }
    });
  }, []);
  console.log(places);
  const ImgSrc = places.image;
  console.log(places.length);

  const onClickMain = () => {
    navigate(`/DetailPage`);
  };

  return (
    <Body>
      <ButtonWrapper>
        <IoChevronBack onClick={onClickMain} />
        &nbsp;&nbsp;보유 스탬프 내역
      </ButtonWrapper>
      <LocalNameWrapper>Gangneung</LocalNameWrapper>
      <LocalImageWrapper src={gangneung} />
      <StampWrapper>
        {places.map((place, index) => (
          <EachStamp key={index}>
            <StampImg src={place.image} />
          </EachStamp>
        ))}
      </StampWrapper>
    </Body>
  );
};

export default OwnStampPage;
