import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Body = styled.div`
  /* width: 380px;
  height: 840px; */
  width: 100vw;
  height: 100vh;
  background-color: rgba(97, 129, 179, 1);
`;

const Img = styled.img`
  width: 40%;
  height: 20%;
  margin-left: 28%;
  margin-top: 37vh;
`;

const Intro = () => {
  const navigate = useNavigate();

  const timeOut = () => {
    setTimeout(() => {
      navigate("/mainPage");
    }, 2000);
  };

  useEffect(() => {
    timeOut();
    return () => {
      clearTimeout(timeOut);
    };
  });
  return (
    <div>
      <Body>
        <Img src="Vit.svg"></Img>
      </Body>
    </div>
  );
};

export default Intro;
