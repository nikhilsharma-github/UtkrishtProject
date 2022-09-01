import { Box, Typography, styled } from "@mui/material";
import { borderColor } from "@mui/system";

import { addElipsis } from "../../../utils/common-utils";
import { useState, useEffect } from "react";

const Container = styled(Box)`
  border: 1px solid #858585;
  background: hsla(195, 75%, 97%, 1);

  background: linear-gradient(
    90deg,
    hsla(195, 75%, 97%, 1) 0%,
    hsla(229, 100%, 94%, 1) 100%
  );

  border-radius: 0.7rem;
  margin: 1rem;
  height: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 2px 2px 10px;
  /* &>p{
        padding:0 5px 5px 5px;
    }    */
`;

const Image = styled("img")({
  width: "100.5%",
  borderRadius: "8px 8px 0 0",
  // objectFit:'cover',
  height: "12rem",
  padding:0
});

const Text = styled(Typography)`
  color: #878787;
  font-size: 0.8rem;
`;

const Heading = styled(Typography)`
  font-size: 1.2rem;
  background-color: #ffffff;
  background: hsla(212, 99%, 69%, 1);

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
  width: 100%;
  text-align: center;
  color: #000629;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1;
  padding-top: 4px;
  padding-bottom: 3px;
`;

const Details = styled(Typography)`
  font-size: 0.9rem;
  font-style: italic;
  word-break: break-word;
  padding: 5px 5px 5px 5px;
  font-family: sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Category = styled(Text)`
  /* width:97%; */
  text-align: center;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
  width: 100%;
`;

const Post = ({ post }) => {
  
  // const url = post.picture ? post.picture : "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg";

  const url = post.picture ? post.picture : "images/UDFbannerjpgimg.jpg";
  // const url = post.picture;


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
    General_Discussion: "#fabebe",
    Guidance_And_Tips: "#fff2b0",
    Academics: "#d3b3fd",
  };

  return (
    <Container>
      <Image src={url} alt="postImg" />
      {/* <Category style={{ color: categoryColor }}>{post.categories}</Category> */}
      <Category
        style={{
          color: categoryColor[post?.categories],
          backgroundColor: categoryColorBG[post?.categories],
        }}
      >
        {post.categories}
      </Category>
      {/* <Heading>{addElipsis(post.title, 90)}</Heading> */}
      <Heading>{post.title}</Heading>
      {/* <Text>{post.username}</Text> */}
      {/* <Details>{addElipsis(post.description, 180)}</Details> */}
      <Details>{post.description}</Details>
    </Container>
  );
};

export default Post;
