import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

import SendIcon from '@mui/icons-material/Send';

//components
import Comment from './Comment';

const Container = styled(Box)`
   margin-top: 2rem;
    display: flex;
`;


const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 1rem;
    background-color: #e8f6f8;
    border-radius: 0.5rem;
    padding:1rem;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>  
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="Mention your comment here"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                   variant="outlined" endIcon={<SendIcon />}
                   style={{ backgroundColor:'#bed5f9',width:'0.5rem',padding:'0' }}
                   size="large"
                    color="primary" 
                    onClick={(e) => addComment(e)}
                ></Button>             
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map((comment,i) => (
                        <Comment comment={comment} setToggle={setToggle} key={i} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;