
import { useContext } from "react";

import { Box, Typography,styled } from "@mui/material";
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import { DataContext } from "../../../context/DataProvider";

import { API } from "../../../service/api";

const Component=styled(Box)`
    margin-top:30px;
    background-color: #f5f5f5;
    padding:1rem;
`

const Container=styled(Box)`
display:flex;
margin-bottom: 0.8rem;
`

const Name=styled(Typography)`
font-weight: 600;
font-size: 1.2rem;
margin-right:20px;
`

const StyledDate=styled(Typography)`

color:#878787;
font-size: 14px;
`

const DeleteIcon=styled(RemoveCircleTwoToneIcon)`
margin-left: auto;
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
            <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>

            {comment.name===account.username&&<DeleteIcon color="error" onClick={()=>removeComment()}></DeleteIcon>}
            </Container>
            <Box>
            <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    )
}

export default Comment;