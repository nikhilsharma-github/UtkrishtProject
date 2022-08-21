import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Grid,Box,styled } from "@mui/material";
import Posts from "./post/Posts";

import { useLocation } from "react-router-dom";

const CategoryBox=styled(Box)`
background-color: #89b7f3;
text-align: center;
font-weight: 700;
font-size: 2rem;
margin:1rem 0 1rem ;
border-radius: 1rem;

`

const Home = () => {

  const location=useLocation();
  return (
    <>
      <Banner />
      <CategoryBox>{location.search?.split('=')[1] || 'All Categories'}</CategoryBox>
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>

        <Grid container item xs={12} sm={10} lg={10}>
          <Posts></Posts>
        </Grid>
      </Grid>
    </>
  );
};
 
export default Home;
