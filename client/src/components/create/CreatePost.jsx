import { useState, useEffect, useContext } from "react";

import { 
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";

// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';

import { useLocation, useNavigate } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../service/api";

const CategoryBox=styled(Box)`
background-color: #89b7f3;
text-align: center;
font-weight: 700;
font-size: 2rem;
margin:1rem 0 1rem ;
border-radius: 0.6rem;
font-family: "Ubuntu", sans-serif;

`
const Container = styled(Box)(({theme})=>({
  margin: '8rem 5rem',
  [theme.breakpoints.down('md')]:{
    margin:20
  }
}));

const Image = styled("img")({
  width: "100%",
  height: "70%",
  // objectFit: "cover",
  // boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
  boxShadow:"rgba(19, 118, 255, 0.4) 5px 5px, rgba(110, 198, 246, 0.3) 10px 10px"
});

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
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

const PublishButton=styled(Button)`
background-color: #cbf8c7;
font-weight: 600;
`;

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);



const url = post.picture ? post.picture : "https://thumbs.dreamstime.com/b/horizontal-banner-hands-typing-laptop-keyboard-various-electronic-devices-symbols-programming-software-horizontal-125917922.jpg";


  // const url = post.picture
  //   ? post.picture
  //   : "images/UDFbannerjpgimg.jpg";

  // const url = post.picture;

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    }
    getImage();
    post.categories = location.search?.split('=')[1] || 'All Categories';
    post.username = account.username;
  }, [file]);

  
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
   let response= await API.createPost(post);
    if(response.isSuccess){
      navigate("/");
    }
  };

  

  const categoryColor = {
    All: "#004683",
    Coding: "#013e2a",
    Interview_Experiences: "#1a5b03",
  General_Discussion: "#6c0000",
    GuidanceAndTips: "#b05301",
    Academics: "#250036",
  };

  const categoryColorBG = {
    All: "#97ccfb",
    Coding: "#7ff8d7",
    Interview_Experiences: "#a9f7b4",
    General_Discussion: "#fabebe",
    GuidanceAndTips: "#fff2b0",
    Academics: "#d3b3fd",
  };


  return (
    <Container>
      <CategoryBox 
       style={{
        color: categoryColor[location.search?.split('=')[1]||('All')],
        backgroundColor: categoryColorBG[location.search?.split('=')[1]||('All')],
      }} 
      >{location.search?.split('=')[1] || 'All Categories'}</CategoryBox>
      <Image src={url} alt="post"></Image>

      <StyledFormControl>
        <label htmlFor="fileInput">
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
          placeholder="Title of Your Post"
          onChange={(e) => handleChange(e)}
          name="title"
        ></InputTextField>
        <PublishButton variant="outlined" color="success" onClick={() => savePost()}>
          Publish
        </PublishButton>
      </StyledFormControl>
      <Textarea
        minRows={5}
        placeholder="Share your experience or doubt"
        onChange={(e) => handleChange(e)}
        name="description"
      ></Textarea>
    </Container>
  );
}

export default CreatePost;
