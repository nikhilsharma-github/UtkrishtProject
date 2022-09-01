import Banner from "../banner/Banner";
import Categories from "./Categories";
import { Grid,Box,styled } from "@mui/material";
import Posts from "./post/Posts";

import { useLocation } from "react-router-dom";

const CategoryBox=styled(Box)`
/* background-color: #89b7f3; */
text-align: center;
font-weight: 700;
font-size: 2rem;
/* margin:1rem 0 1rem ; */
/* border-radius: 1rem; */
margin-bottom: 1rem;
padding:0.5rem 0rem 0.5rem 0rem;
font-family: "Ubuntu", sans-serif;
`

const Home = () => {

  const categoryColor = {
    All_Categories: "#004683",
    Coding: "#013e2a",
    Interview_Experiences: "#1a5b03",
  General_Discussion: "#6c0000",
    Guidance_And_Tips: "#b05301",
    Academics: "#250036",
  };

  const categoryColorBG = {
    All_Categories: "#97ccfb",
    Coding: "#7ff8d7",
    Interview_Experiences: "#a9f7b4",
    Guidance_And_Tips: "#fff2b0",
    General_Discussion: "#fabebe",
    Academics: "#d3b3fd",
  };


  const location=useLocation();
  return (
    <>
      <Banner />
      <CategoryBox style={{
          color: categoryColor[location.search?.split('=')[1]||('All_Categories')],
          backgroundColor: categoryColorBG[location.search?.split('=')[1]||('All_Categories')],
        }}>{location.search?.split('=')[1] || 'All_Categories'}</CategoryBox>
      <Grid container>
        <Grid item lg={2} md={3} sm={4} xs={12}>
          <Categories />
        </Grid>

        <Grid container item xs={12} sm={8} md={9} lg={10}>
          <Posts></Posts>
        </Grid>
      </Grid>
    </>
  );
};
 
export default Home;
