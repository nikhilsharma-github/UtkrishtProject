import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState,useContext } from "react";

import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";


const Component = styled(Box)`
  width: 400px;
  margin: auto;
  /* box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6); */
  box-shadow: rgba(16, 95, 141, 0.4) 5px 5px, rgba(129, 156, 224, 0.3) 10px 10px, rgba(158, 218, 238, 0.2) 15px 15px, rgba(119, 154, 229, 0.1) 20px 20px, rgba(125, 212, 240, 0.05) 25px 25px;
`;

const Image = styled("img")({
  width: "15rem",
  height:"4rem",
  margin: "auto",
  display: "flex",
  padding: "3rem 0 0 0",
  // border: "2px solid black",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 2rem;
  }
  `;

const LoginButton = styled(Button)`
  /* text-transform: none; */
  letter-spacing: 3px;
  background: rgb(0,11,72);
  background: linear-gradient(124deg, #021376 0%, rgba(10,46,158,1) 45%, #6fd9cb 100%);
  font-weight: 500;
  height: 3rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  color:#ffffff;
  margin-top: 200px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
  `;


const SignupButton = styled(Button)`
text-transform: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  height: 3rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color:#05002a;
  margin-top: 200px;
  background-color: #b0daff;
`;



const loginInitialValues={
  username:'',
  password:''
}

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = ({isUserAuthenticated}) => {
  // const imageURL =
  //   "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  // const imageURL={Logo};


  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login,setLogin]=useState(loginInitialValues);
  const [error, setError] = useState("");

  const {setAccount}=useContext(DataContext);

  const navigate=useNavigate();

  const toggleSignup = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong, pls try again later");
    }
  }

  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
  }

  const loginUser= async (e)=>{
    let response=await API.userLogin(login);
    if(response.isSuccess){
      setError('');

      sessionStorage.setItem('accessToken',`Bearer ${(response.data.accessToken)}`);
      sessionStorage.setItem('refreshToken',`Bearer ${(response.data.refreshToken)}`);

      setAccount({username:response.data.username,name:response.data.name});
      
      isUserAuthenticated(true);
       navigate('/');
    }
    else{
     <b> setError('Something went wrong! Please try again later')</b>;
    }
  }

  return (
    <Component>
      <Box>
        {/* <Image src={imageURL}></Image> */}
        <Image src='images/UDFlogo1.PNG'></Image>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="filled"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
              required
            />
            <TextField
              variant="filled"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
              required
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={()=>loginUser()}>Login </LoginButton>
            <SignupButton onClick={() => toggleSignup()}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
              required
            />
            <TextField
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
              required
            />
            <TextField
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
              required
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Register Now</SignupButton>
            <LoginButton variant="contained" style={{letterSpacing:'0', textTransform:'none', fontSize:'1rem'}} onClick={() => toggleSignup()}>
              Already Have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
