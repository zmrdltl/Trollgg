import React from "react";
import styled from "styled-components";

const Rank = (props) => {
  const { Rank } = props;
  console.log("난 about이야!");
  console.log("티어 : ", Rank);
  return <div>RNAK!</div>;
};
export default Rank;

const Img = (src, alt, title, height, width) => {
  const Image = styled.Image`
  src= ${(props) => props.src};
  alt= ${(props) => props.alt};
  title= ${(props) => props.title};
  height= ${(props) => props.height};
  width= ${(props) => props.width};
`;
  return (
    <Image src={src} alt={alt} title={title} height={height} width={width} />
  );
};

const Image = styled.img`
  height= 160px
  width= 137px
`;
