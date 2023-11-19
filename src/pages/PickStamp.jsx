import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Text = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 30px;
  font-weight: bolder;
  padding-top: 5vh;
  padding-left: 5vw;
  margin-bottom: 3vh;
`;
const Background = styled.div`
  width: 100vw;
  height: auto;
  background-color: #ffffff;
`;

const Count = styled.h2`
  /* padding-top: 5vh; */
  padding-left: 75vw;
`;
const Box = styled.img`
  width: 70vw;
  height: 20vh;
  margin-left: 15vw;
  margin-top: 5%;
  /* background-color: rgba(217, 217, 217, 1); */
  border-radius: 7px;
  text-align: center;
  border: ${({ isSelected }) => (isSelected ? "5px solid red" : "none")};
  cursor: pointer;
  opacity: ${({ isSelected }) =>
    isSelected ? 0.7 : 1}; // 선택된 이미지는 투명도를 조정
  transition: opacity 0.3s; // 투명도 전환에 애니메이션 추가
`;

const Next = styled.button`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  width: 80vw;
  height: 7vh;
  margin-left: 10vw;
  margin-top: 5%;
  background-color: rgba(97, 129, 179, 1);
  border-radius: 7px;
  text-align: center;
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5%;
  border: none;
`;
const Highlight = styled.span`
  background: linear-gradient(
    180deg,
    rgba(97, 129, 179, 0.4) 68%,
    rgba(97, 129, 179, 1) 50%
  );
  border-radius: 3px;
  background: rgba(97, 129, 179, 0.4);
`;

const PickStamp = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (index) => {
    setSelectedImage((prev) => (prev === index ? null : index));
  };
  const [hotplaceName, setHotplaceName] = useState("");
  useEffect(() => {
    axios
      .get(`http://43.200.76.188:8000/places/get_hot_place_name/${id}`)
      .then((res) => {
        setHotplaceName(res.data.name);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://43.200.76.188:8000/places/stamps_by_hotplace/${id}`)
      .then((res) => {
        setPlaces(res.data);
      });
  }, [id]);
  console.log(places);
  console.log(places.id);

  const ImgSrc = places.image;

  const handleNextClick = () => {
    if (selectedImage !== null) {
      const selectedStampId = places[selectedImage].id;
      // 선택된 이미지의 ID를 가져옴
      axios.post(`http://43.200.76.188:8000/benefit/get_stamp/`, {
        stamp_id: selectedStampId,
      });
      navigate(`/OwnStampPage`);
    } else {
      alert("이미지를 선택하세요.");
    }
  };
  return (
    <Background>
      <Text>
        <Highlight>'{hotplaceName}'</Highlight>
        <br />
        스탬프 종류입니다
      </Text>

      {places.map((place, index) => (
        <Box
          key={index}
          src={place.image}
          isSelected={selectedImage !== null && selectedImage === index} // 선택된 이미지에 표시를 추가
          onClick={() => handleImageClick(index)} // 클릭 시 해당 이미지의 인덱스를 전달
        />
      ))}
      <Next onClick={handleNextClick}>NFT 발급</Next>
    </Background>
  );
};

export default PickStamp;
