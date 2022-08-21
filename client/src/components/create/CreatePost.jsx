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
border-radius: 1rem;
`
const Container = styled(Box)(({theme})=>({
  margin: '8rem 5rem',
  [theme.breakpoints.down('md')]:{
    margin:20
  }
}));

const Image = styled("img")({
  width: "100%",
  height: "70vh",
  objectFit: "cover",
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
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  background-color: #f0efef;
  border-radius: 0.5rem;
  padding-left:5px;

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

  // const url = post.picture
    // ? post.picture
    // : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


  const url = post.picture
    ? post.picture
    : "images/UDFbannerjpgimg.jpg";

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

  return (
    <Container>
      <CategoryBox>{location.search?.split('=')[1] || 'All Categories'}</CategoryBox>
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
