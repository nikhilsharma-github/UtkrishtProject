import { AppBar, Toolbar, styled } from "@mui/material";
// import { borderRadius } from "@mui/system";

import { Link } from "react-router-dom";

import './Header.css';

const Component = styled(AppBar)`
  /* background: #820e0e; */

  color: #010153;
  padding: 0.2rem;

  background: rgb(220,211,246);
background: linear-gradient(124deg, rgba(220,211,246,1) 0%, rgba(162,185,255,1) 45%, rgba(157,244,219,1) 100%);
`;

const Container = styled(Toolbar)`
  /* justify-content: center; */

  & > a {
    /* padding: 0.6rem 2rem 0.6rem;
    border-radius: 1rem;
    color: #030351;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600; */
  }
  &>a:hover{
    box-shadow: rgba(5, 112, 165, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  
`;

const Image = styled("img")({
  // height: "4rem",
  // width:"12rem",
  // padding: '0.3rem',
  // cursor: "pointer",
  // // backgroundColor: 'rgb(125 211 252)',
  // borderRadius:'1rem'
});

const Header = () => {
  return (
    <Component >
      <Container className='containerClass'>
        <Link to="/">
          <Image
          className="imageResp"
            src="images/UDFlogo1.PNG"
          />
        </Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/contact">Contact</Link> */}
        <Link to="/login">Logout</Link>
      </Container>
    </Component>
  );
};

export default Header;
