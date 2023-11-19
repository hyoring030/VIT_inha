import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import busanCard from "../assets/busanCard.png";
import jejuCard from "../assets/jejuCard.png";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Body = styled.div`
  width: 380px;
  height: 840px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  font-size: 25px;
  font-weight: bold;
  width: 100vh;
  height: 50px;
  margin-left: 15px;
  margin-top: 55px;
`;

const StyledSlider = styled(Slider)`
  padding-left: 45px;
  .slick-dots {
    left: 5px;
  }
`;

const CardCover = styled.img`
  width: 280px;
  height: 600px;
  object-fit: contain;
`;

const WalletPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`http://43.200.76.188:8000/users/card/`).then((res) => {
      setCards(res.data);
    });
  }, []);
  console.log(cards);
  const onClickMain = () => {
    navigate("/mainPage");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "5px",
            height: "5px",
            background: "#C0C0C0",
          }}
        />
      );
    },
  };
  return (
    <Body>
      <ButtonWrapper>
        <IoChevronBack onClick={onClickMain} />
        &nbsp;&nbsp;지역 발급 카드 관리
      </ButtonWrapper>
      <StyledSlider {...settings}>
        {cards.map((card) => (
          <div key={card.id}>
            <CardCover src={card.image} />
          </div>
        ))}
      </StyledSlider>
    </Body>
  );
};

export default WalletPage;
