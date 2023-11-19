import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Body = styled.div`
  /* width: 380px;
  height: 840px; */
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
`;

const Img = styled.img`
  width: 80vw; /* 추가된 부분 */
  height: 20vh; /* 추가된 부분 */
  margin-left: 10%;
  margin-top: 10vh;
  margin-bottom: 1%;
  border-radius: 10px;
`;

const Text = styled.h1`
  font-weight: bolder;
  margin-left: 7.5%;
  color: #6181b3;
`;

const Address = styled.h3`
  margin-left: 7.5%;
`;

const SImg = styled.img`
  width: 120px;
  height: 170px;
  min-width: 120px;
  min-height: 170px;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1vh;
  margin-bottom: 2%;
`;

const Line = styled.div`
  height: 3px;
  width: 80vw;
  margin-left: 10vw;
  margin-top: 3%;
  margin-bottom: 3%;
`;
const Arr = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
`;

const AboutPlace = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);
  const [stamps, setStamps] = useState("");
  useEffect(() => {
    axios.get(`http://43.200.76.188:8000/places/hotplaces/${1}`).then((res) => {
      setPlaces(res.data[id - 1]);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://43.200.76.188:8000/places/stamps_by_hotplace/${id}`)
      .then((res) => {
        setStamps(res.data);
      });
  }, [id]);

  const Imgsrc = places.image;
  return (
    <div>
      <Body>
        <Img src={Imgsrc}></Img>
        <Text>{places.name}</Text>
        <Address>매장주소: {places.detail_location}</Address>
        <Line />
        <Address>{places.description}</Address>
        <Line />
        <Address>VIT의 STAMP</Address>
        <Arr>
          {stamps &&
            stamps.map((stamp, index) => (
              <SImg key={index} src={stamp.image} />
            ))}
        </Arr>
      </Body>
    </div>
  );
};

export default AboutPlace;
