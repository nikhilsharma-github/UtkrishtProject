import { useState, useEffect, useContext } from "react";

import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../service/api";

const Container = styled(Box)(({theme})=>({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]:{
    margin:20
  }
}));

const Image = styled("img")({
  width: "100%",
  height: "70%",
  // objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  background-color: #e5f5ff;
  padding-left: 5px;
  border-radius: 0.5rem;
  font-family: 'Urbanist', sans-serif; 
  color: #000058;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  background-color: #f0efef;
  border-radius: 0.5rem;
  padding-left:5px;
  letter-spacing: 2px;

  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const ImageUploadIcon=styled(AddAPhotoTwoToneIcon)`
  cursor:pointer;
  /* transition:transform .5s; */
  border-radius:0.5rem;
  &:hover{
    /* transform:scale(1.05); */
    background-color: pink;
  }
`;

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const { id } = useParams();

  const url = post.picture ? post.picture : "https://thumbs.dreamstime.com/b/horizontal-banner-hands-typing-laptop-keyboard-various-electronic-devices-symbols-programming-software-horizontal-125917922.jpg";


  // const url = post.picture
  // ? post.picture
  // : "images/UDFbannerjpgimg.jpg";

  // const url = post.picture;

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);

      if(response.isSuccess){
        setPost(response.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    let response = await API.updatePost(post);
    if (response.isSuccess) {
      navigate(`/details/${id}`);
    }
  };

  const PublishButton=styled(Button)`
background-color: #fcd8b1;
font-weight: 600;
color:#765300;
`;

  return (
    <Container>
      <Image src={url} alt="post"></Image>

      <StyledFormControl>
        <label htmlFor="fileInput">
          {/* <AddAPhotoIcon fontSize="large" color="action"/> */}
          <ImageUploadIcon fontSize="large" color="secondary"/>
        </label>
        <input
          type="file"
          id="fileInput"
          // name="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <InputTextField
          placeholder="Title of Your Post" value={post.title}
          onChange={(e) => handleChange(e)}
          name="title"
        ></InputTextField>
        <PublishButton variant="outlined" color="warning" onClick={() => updateBlogPost()}>
          Update
        </PublishButton>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Share your experience or doubt"
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      ></Textarea>
    </Container>
  );
};

export default Update;
