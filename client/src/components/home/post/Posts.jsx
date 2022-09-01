import { useEffect } from "react";
import { useState } from "react";

import { Box, Grid } from "@mui/material";

import { API } from "../../../service/api";

import { useSearchParams, Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getAllPosts({ category: category || ''});
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post,i) => (
          <Grid item lg={4} md={4} sm={6}  xs={12} key={i}>
            <Link to={`details/${post._id}`} style={{textDecoration:'none', color:'inherit'}}>
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#000128",
         margin:"2rem 2rem",
          height:'5rem',
          fontSize: "2rem",
        backgroundColor:'#b9b9b9',
        borderRadius:'0.3rem',
        fontFamily:'Lobster',
        padding:"0.5rem 0.5rem 0.5rem 0.5rem",
        lineHeight:'1'
        }}>
          No posts available to display
          <SentimentVeryDissatisfiedIcon 
          style={{
            color:'#280020',
            fontSize:'2rem',
            marginTop:'4px'
      
          }}
          ></SentimentVeryDissatisfiedIcon>
        </Box>
      )}
    </>
  );
};

export default Posts;
