import { Box, Typography,styled } from "@mui/material";

import { addElipsis } from "../../../utils/common-utils";

const Container=styled(Box)`
    border: 1px solid #858585;
    background: hsla(195, 75%, 97%, 1);

background: linear-gradient(90deg, hsla(195, 75%, 97%, 1) 0%, hsla(229, 100%, 94%, 1) 100%);

    border-radius:1rem;
    margin:0.8rem;
    height:350px;
    display:flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 10px;
    &>p{
        padding:0 5px 5px 5px;
    }   
`

const Image=styled('img')({
    width:'100%',
    borderRadius:'8px 8px 0 0',
    // objectFit:'cover',
    height:'12rem'
})

const Text=styled(Typography)`
color:#878787;
font-size:0.8rem;
`

const Heading=styled(Typography)`
font-size: 18px;
font-weight: 16px;
background-color: #008996;
border-radius: 1rem;
font-family: Verdana, Geneva, Tahoma, sans-serif;
margin: 1rem auto;

/* padding:auto; */
`

const Details=styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`

const Category=styled(Text)`
  /* background-color: #99d9f5; */
  /* width:97%; */
  text-align: center;
  color: black;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius:5px;
`;

const Post = ({post}) => {


    // const url=post.picture?post.picture:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    const url = post.picture
    ? post.picture
    : "images/UDFbannerjpgimg.jpg";



  return(
      <Container>
        <Image src={url}  alt="postImg"/>
        <Category>{post.categories}</Category>
        <Heading>{addElipsis(post.title,20)}</Heading>
        {/* <Text>{post.username}</Text> */}
        <Details>{addElipsis(post.description,100)}</Details>
      </Container>
  ) 
};

export default Post;
