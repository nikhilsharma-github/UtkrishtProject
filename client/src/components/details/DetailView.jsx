import { Box, Typography, styled } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  // margin: '50px 100px',
  margin: "8rem 5rem",
  [theme.breakpoints.down("md")]: {
    margin: 20,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "70%",
  // objectFit: "cover",
  borderRadius: "1rem",
});

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0px;
  word-break: break-word;
  border-radius: 0.5rem;
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
  

  /* background-image: linear-gradient(45deg, #aef4ff, #befffe); */

  & text {
    text-shadow: 2px 2px 4px rgba(179, 147, 211, 0.1),
      3px 4px 4px rgba(179, 147, 211, 0.15),
      4px 6px 4px rgba(179, 147, 211, 0.2),
      5px 8px 4px rgab(179, 147, 211, 0.25);
  }

font-family: 'Roboto', sans-serif;







`;

const EditIcon = styled(EditTwoToneIcon)`
  margin: 0.5rem;
  padding: 0.2rem;
  border: 2px solid #878787;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #a5f7ff;
  }
`;
const DeleteIcon = styled(DeleteTwoToneIcon)`
  margin: 0.5rem;
  padding: 0.2rem;
  border: 2px solid #878787;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f7afaf;
  }
`;

const Author = styled(Box)`
  margin: 20px 0;
  display: flex;
  padding: 2px 0 2px 0;
  border-radius: 5px;
`;

const Description = styled(Typography)`
  word-break: break-word;
  background-color: #e9e9ff;
  border-radius: 0.2rem;
  padding:0.2rem;
  font-family: 'Urbanist', sans-serif;
  font-weight: 600;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  
  
  

  const { id } = useParams();

  const { account } = useContext(DataContext);

  const navigate = useNavigate();

  const url = post.picture ? post.picture : "https://thumbs.dreamstime.com/b/horizontal-banner-hands-typing-laptop-keyboard-various-electronic-devices-symbols-programming-software-horizontal-125917922.jpg";

  // const url = post.picture ? post.picture : "images/UDFbannerjpgimg.jpg";
  // const url = post.picture
  // ? post.picture
  // : "images/UDFbannerjpgimg.jpg";

// const url = post.picture;


  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      
      //   const descval=post.description;
      // descval=post.description.replace(/\n/g, "<br />");
      // post.description=descval;
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);

    if (response.isSuccess) {
      navigate("/");
    }
  };


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
      <Image src={url} alt="BlogPostImage" />
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary"></EditIcon>
            </Link>
            <DeleteIcon color="error" onClick={() => deleteBlog()}></DeleteIcon>
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author  style={{
          color: categoryColor[post?.categories],
          backgroundColor: categoryColorBG[post?.categories],

        }} >
        <Typography
          style={{
            borderRadius: "5px",
            padding: "0rem 1rem 0 0.2rem",
            color: "navy",
            fontFamily:"Oswald"
          }}
        >
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600}}>
            {" "}
            {post.username}
          </Box>
        </Typography>
        {/* <Typography>{post.createdDate}</Typography> */}
        <Typography style={{ fontFamily:"Oswald", marginLeft: "auto", color: "black", fontWeight:'600',fontSize:'1.1rem' }}>
          {post.categories}
        </Typography>
        <Typography style={{fontFamily:"Oswald", marginLeft: "auto",marginRight: "2px", color: "black" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>
      
      <Comments post={post} />
    </Container>
    
    
  );
};

export default DetailView;
