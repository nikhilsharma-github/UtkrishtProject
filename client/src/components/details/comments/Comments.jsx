import { useState, useContext,useEffect } from "react";

import { Box, TextareaAutosize, Button, styled } from "@mui/material";

import { DataContext } from "../../../context/DataProvider";

import { API } from "../../../service/api";

import Comment from "./Comment";

export const Comments = ({ post }) => {
  const Container = styled(Box)`
    margin-top: 2rem;
    display: flex;
  `;

  const Image = styled("img")({
    width: 50,
    height: 50,
  });

  const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
  `;

  const InitialValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date(),
  };

  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(InitialValues);
  const [comments,setComments]=useState([]);

  const [toggle,setToggle]=useState(false);

  const { account } = useContext(DataContext);

  useEffect(()=>{
    const getData=async()=>{
      const response=  await API.getAllComments(post._id);
        if(response.isSuccess){
            setComments(response.data);
        }
    }
    getData();
  },[post,toggle])

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    let response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment(InitialValues);
    }
    setToggle(prevState => !prevState);
  };

  return (
    <>
      <Container>
        <Image src={url} alt="userDP" />
        <StyledTextArea
        key="inputComment"
          minRows={3}
          placeholder="Mention your comment here"
          value={comment.comments}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: "2rem" }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments&&comments.length>0&&comments.map((comment,i)=>(

            <Comment comment={comment} setToggle={setToggle} key={i}/>
        ))}

      </Box>
    </>
  );
};

export default Comments;
