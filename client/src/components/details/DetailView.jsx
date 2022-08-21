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
  height: "50vh",
  objectFit: "cover",
  borderRadius: "1rem",
});

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0px;
  word-break: break-word;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 0.5rem;

  background-image: linear-gradient(45deg, #aef4ff, #befffe);

  & text {
    text-shadow: 2px 2px 4px rgba(179, 147, 211, 0.1),
      3px 4px 4px rgba(179, 147, 211, 0.15),
      4px 6px 4px rgba(179, 147, 211, 0.2),
      5px 8px 4px rgab(179, 147, 211, 0.25);
  }
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
  color: #878787;
  margin: 20px 0;
  display: flex;
  background-color: #cbf9f0;
  padding: 0 1rem 0 0;
  border-radius: 5px;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();

  const { account } = useContext(DataContext);

  const navigate = useNavigate();

  // const url = post.picture
  //   ? post.picture
  //   : "https://cdn.pixabay.com/photo/2012/12/27/19/40/chain-link-72864_960_720.jpg";

  const url = post.picture ? post.picture : "images/UDFbannerjpgimg.jpg";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
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
      <Author>
        <Typography
          style={{
            backgroundColor: "#A4DDED",
            borderRadius: "5px",
            padding: "0rem 1rem 0 1rem",
            color: "navy",
          }}
        >
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {" "}
            {post.username}
          </Box>
        </Typography>
        {/* <Typography>{post.createdDate}</Typography> */}
        <Typography style={{ marginLeft: "auto", color: "black", fontWeight:'600', textDecoration:'underline' }}>
          {post.categories}
        </Typography>
        <Typography style={{ marginLeft: "auto", color: "black" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
