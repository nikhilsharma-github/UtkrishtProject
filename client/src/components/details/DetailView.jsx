import { Box, Typography, styled } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useEffect, useState, useContext } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";

import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)(({theme})=>({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]:{
    margin:20
  }
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0px;
  word-break:break-word;
`;

const EditIcon = styled(EditTwoToneIcon)`
  margin: 0.5rem;
  padding: 0.2rem;
  border: 2px solid #878787;

  border-radius: 0.5rem;
`;
const DeleteIcon = styled(DeleteTwoToneIcon)`
  margin: 0.5rem;
  padding: 0.2rem;
  border: 2px solid #878787;
  border-radius: 0.5rem;
`;

const Author=styled(Box)`
color:#878787;
margin:20px 0;
display:flex;
`

const Description=styled(Typography)`
word-break:break-word;
`

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();

  const { account } = useContext(DataContext);

  const navigate=useNavigate();

  const url = post.picture
    ? post.picture
    : "https://cdn.pixabay.com/photo/2012/12/27/19/40/chain-link-72864_960_720.jpg";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);


  const deleteBlog=async()=>{
    let response=await API.deletePost(post._id);

    if(response.isSuccess){
      navigate('/');
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
            <DeleteIcon color="error" onClick={()=>deleteBlog()}></DeleteIcon>
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography >Author: <Box component='span' style={{fontWeight:600}}> {post.username}</Box></Typography>
        {/* <Typography>{post.createdDate}</Typography> */}
        <Typography style={{marginLeft:'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
    </Container>
  );
};

export default DetailView;
