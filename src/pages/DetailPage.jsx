import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;
const Box = styled.button`
  width: 80vw;
  height: 9vh;
  border: none;
  font-weight: 500;
  margin-left: 10vw;
  margin-top: 3%;
  margin-bottom: 5vh;
  padding-bottom: 8vh;
  background-color: rgba(97, 129, 179, 1);
  border-radius: 7px;
  text-align: left;
  color: rgba(255, 255, 255, 0.91);
  padding-left: 2vh;
  font-size: larger;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;
const Arr = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%; //부모 컨테이너에 꽉 차게 저장
`;
const Text = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 25px;
  font-weight: bolder;
  padding-left: 5vw;
  margin-bottom: 3vh;
`;
const SText = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bolder;
  padding-top: 5vh;
  padding-left: 5vw;
  margin-bottom: 2vh;
  font-size: 20px;
`;
const XSText = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bolder;
  margin-left: 5vw;
  margin-top: 3%;
`;
const ColorText = styled.span`
  font-weight: bolder;
  color: rgba(97, 129, 179, 1);
`;
const Bar = styled.div`
  height: 10px;
  width: ${({ percentage }) => (percentage > 100 ? 100 : percentage)}%;
  background-color: #d4e4e4;
  position: absolute; /* 위치를 absolute로 설정 */
  bottom: 0;
  left: 0;
`;
const Percent = styled.span`
  color: white;
  font-size: xx-large;
  margin-left: 5px;
  display: inline;
  padding-top: 1vh;
`;
const Img = styled.img`
  width: 120px;
  height: 170px;
  min-width: 120px;
  min-height: 170px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1vh;
  margin-bottom: 2%;
`;

const DetailPage = () => {
  const [places, setPlaces] = useState([]);
  const [stamps, setStamps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesResponse = await axios.get(
          `http://43.200.76.188:8000/places/hotplaces/${1}`
        );
        setPlaces(placesResponse.data);

        const stampsResponse = await axios.get(
          `http://43.200.76.188:8000/users/stamp/`
        );
        setStamps(stampsResponse.data);

        const stampCount = stampsResponse.data.length;
        const progressPercentage =
          stampCount * 10 > 100 ? 100 : stampCount * 10;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cafePlaces = places.filter(
    (place) => place.category_id && place.category_id.name === "카페"
  );
  const foodPlaces = places.filter(
    (place) => place.category_id && place.category_id.name === "맛집"
  );
  const hotPlaces = places.filter(
    (place) => place.category_id && place.category_id.name === "관광지"
  );
  const hotImageSrc = hotPlaces.length > 0 ? hotPlaces[0].image : "";
  const cafeImageSrc = cafePlaces.length > 0 ? cafePlaces[0].image : "";
  const foodImageSrc = foodPlaces.length > 0 ? foodPlaces[0].image : "";
  console.log(hotImageSrc);
  console.log(cafeImageSrc);
  console.log(foodImageSrc);
  const handleImageClick = (id) => {
    navigate(`/AboutPlace/${id}`);
  };

  const goOwn = () => {
    navigate(`/OwnStampPage`);
  };
  const renderPlaceImages = (places) => {
    return places.map((place, index) => (
      <Img
        key={index}
        src={place.image}
        onClick={() => handleImageClick(place.id)}
      ></Img>
    ));
  };
  const stampCount = stamps.length;

  const progressPercentage = stampCount * 10 > 100 ? 100 : stampCount * 10;
  return (
    <div>
      <Background>
        <SText>옥수수 양말님, 환영해요!</SText>
        <Text>
          <ColorText>강릉</ColorText>은 현재
          <ColorText> {stampCount}곳</ColorText>을 방문 하셨네요!
        </Text>
        <Box onClick={goOwn}>
          미션완료까지
          <br />
          앞으로 {10 - stampCount}곳 남았어요!{" "}
          <Percent>{stampCount * 10}%</Percent>
          <Bar percentage={progressPercentage}></Bar>
        </Box>

        <XSText>HOT PLACE 😎</XSText>
        <Arr>{renderPlaceImages(hotPlaces)}</Arr>
        <XSText>TRENDY CAFE ☕ </XSText>
        <Arr>{renderPlaceImages(cafePlaces)}</Arr>
        <XSText>TRENDY DINING SPOT 🍽️</XSText>
        <Arr>{renderPlaceImages(foodPlaces)}</Arr>
      </Background>
    </div>
  );
};

export default DetailPage;
