import { Box, Typography, styled } from "@mui/material";

import './Banner.css';

const Image = styled(Box)`
  /* background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg")  */
   background: url("images/homepageBanner.jpg")
  center/55% repeat-x #002244;
  width:100%;
  height:50vh;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
/* 
  background: url('images/homepageBanner.jpg')
  center/55% repeat-x #002244;
  position:'fixed'; */
`;

const Heading=styled(Typography)`
font-size:6rem;
color:#110070;
line-height: 1;
letter-spacing: 20px;
`;

const SubHeading=styled(Typography)`
    font-size: 1.5rem;
    background: #a4ccf3;
    border-radius: 0.5rem;
    color:'#002244';
    padding:0.2rem;
`;

const Banner = () => {
  return (
    <Image className='imageClass'>
      <Heading>UDF</Heading>
      <SubHeading>USICT Discuss Forum</SubHeading>
    </Image>
  );
};

export default Banner;
