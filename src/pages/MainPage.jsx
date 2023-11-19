import React from "react";
import styled from "styled-components";
import card from "../assets/IoCardOutline.png";
import map from "../assets/map.png";
import gangneung from "../assets/gangneung.png";
import sokcho from "../assets/sokcho.png";
import jeonju from "../assets/jeonju.png";
import seoul from "../assets/seoul.jpg";
import { useNavigate } from "react-router-dom";

const Body = styled.div`
  width: 380px;
  height: 840px;
  display: flex;
  align-items: center;
  flex-flow: column;
`;

const UserTextWrapper = styled.div`
  height: 20px;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 55px;
  box-shadow: inset 0 -5px 0 #6181b3;
  align-self: flex-start;
`;

const WelcomeTextWrapper = styled.div`
  width: 100%;
  height: 35px;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 35px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 10px;
  align-self: flex-start;
  display: flex;
  align-items: center;
`;

const WelcomeText = styled.span`
  margin-right: auto;
`;

const WelcomeImage = styled.img`
  margin-left: auto;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  margin-top: -50px;
`;

const TourMap = styled.img`
  width: 180px;
  height: 310px;
  object-fit: fill;
`;

const MissionWrapper = styled.div`
  height: 20px;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
  margin-top: 10px;
  align-self: flex-start;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 360px;
  min-height: 150px;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 15px;
`;

const LocalImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;

  ${ImageContainer}:hover & {
    filter: brightness(70%);
  }
`;

const ImageText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 0.5;
  }
`;

const MainPage = () => {
  const navigate = useNavigate();

  const onClickCard = () => {
    navigate("/walletPage");
  };
  const onClickMissionArea = () => {
    navigate("/DetailPage"); // 원하는 경로로 변경
  };

  return (
    <Body>
      <UserTextWrapper>옥수수 양말 님</UserTextWrapper>
      <WelcomeTextWrapper>
        {" "}
        <WelcomeText>환영합니다</WelcomeText>
        <WelcomeImage src={card} alt="" onClick={onClickCard} />
      </WelcomeTextWrapper>
      <TourMap src={map} />
      <MissionWrapper>미션 진행중인 지역</MissionWrapper>
      <ImageContainer onClick={onClickMissionArea}>
        <LocalImageWrapper src={gangneung} />
        <ImageText>강 릉</ImageText>
      </ImageContainer>
      <MissionWrapper>
        <span style={{ color: "#6181b3" }}>VIT</span> 추천하는 지역
      </MissionWrapper>
      <ImageContainer>
        <LocalImageWrapper src={sokcho} />
        <ImageText>속 초</ImageText>
      </ImageContainer>
      <ImageContainer>
        <LocalImageWrapper src={jeonju} />
        <ImageText>전 주</ImageText>
      </ImageContainer>
      <ImageContainer>
        <LocalImageWrapper src={seoul} />
        <ImageText>서 울</ImageText>
      </ImageContainer>
    </Body>
  );
};

export default MainPage;
