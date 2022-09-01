
import { useContext } from "react";

import { Box, Typography,styled, TextareaAutosize } from "@mui/material";
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import { DataContext } from "../../../context/DataProvider";

import { API } from "../../../service/api";

const Component=styled(Box)`
    margin-top:1rem;
    background-color: #f5f5f5;
    padding:1rem;
    border-radius: 0.5rem;
`

const Container=styled(Box)`
display:flex;
margin-bottom: 0.2rem;
`

const Name=styled(Typography)`
font-weight: 600;
font-size: 1.2rem;
margin-right:20px;
background-color: #ffebd2;
border-radius: 5px;
padding:0 2px 0 2px;
font-family: 'Ubuntu',sans-serif;
letter-spacing: 1px;
`

const StyledDate=styled(Typography)`
color:#020449;
font-size: 0.8rem;
font-family: 'Oswald',sans-serif;
background-color: #eeeeee;
padding:1px 1px 0px 0px;
border-radius: 0.5rem;

`

const CommentText=styled(Typography)`
background-color: #ffffff;
border-radius: 0.2rem;
padding:2px;
font-family: 'Urbanist',sans-serif;
`;

const DeleteIcon=styled(RemoveCircleTwoToneIcon)`
margin-left: auto;
cursor:pointer;
border-radius: 3rem;
&:hover{
    background-color: #ffc2c2;
}
`

const Comment=({comment,setToggle})=>{

    const {account}=useContext(DataContext);

    const removeComment=async()=>{
     let response=await API.deleteComment(comment._id);
     if(response.isSuccess){
        setToggle(prevState=>!prevState);
     }
    }

    return(
        <Component>
            <Container>
            <Name>{comment.name}</Name>
            {/* <StyledDate>{new Date(comment.date).toDateString()}</StyledDate> */}
            <StyledDate>{new Date(comment.date).toLocaleString()}</StyledDate>

            {comment.name===account.username&&<DeleteIcon color="error" onClick={()=>removeComment()}></DeleteIcon>}
            </Container>
            <Box>
            <CommentText>{comment.comments}</CommentText>
            </Box>
        </Component>
    )
}

export default Comment;