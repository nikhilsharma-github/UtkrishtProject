import { Box, Typography, styled } from "@mui/material";

import "./Banner.css";

const Image = styled(Box)`
  /* background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg")  */
  background: url("images/homepageBanner.jpg") center/55% repeat-x #002244;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 5%;
`;

const Heading = styled(Typography)`
  font-size: 6rem;
  color: #110070;
  line-height: 1;
  letter-spacing: 20px;
  /* font-family: 'Oswald', sans-serif; */
   font-family: 'Kaushan Script', cursive;
  font-style: italic;
`;

const SubHeading = styled(Typography)`
  font-size: 2rem;
  border-radius: 0.5rem;
  color: #033e79;
  padding: 0.2rem;
  background: hsla(212, 99%, 69%, 1);
  font-family: 'Lobster',cursive;

  background: linear-gradient(
    45deg,
    hsla(212, 99%, 69%, 1) 0%,
    hsla(172, 100%, 85%, 1) 100%
  );

  background: -moz-linear-gradient(
    45deg,
    hsla(212, 99%, 69%, 1) 0%,
    hsla(172, 100%, 85%, 1) 100%
  );

  background: -webkit-linear-gradient(
    45deg,
    hsla(212, 99%, 69%, 1) 0%,
    hsla(172, 100%, 85%, 1) 100%
  );
`;

const Banner = () => {
  return (
    <Image className="imageClass">
      <Heading>UDF</Heading>
      <SubHeading>USICT Discuss Forum</SubHeading>
    </Image>
  );
};

export default Banner;
