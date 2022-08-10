import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState,useContext } from "react";

import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #fb6418;
  color: #fff;
  height: 48px;
  border-radius: 2rem;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background-color: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2rem;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
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
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

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

      sessionStorage.setItem('accessToken',`Bearer${(response.data.accessToken)}`);
      sessionStorage.setItem('refreshToken',`Bearer${(response.data.refreshToken)}`);

      setAccount({username:response.data.username,name:response.data.name});
      
      isUserAuthenticated(true);
       navigate('/');
    }
    else{
      setError('Something went wrong! Please try again later');
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURL}></Image>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="filled"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="filled"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
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
            />
            <TextField
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="filled"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>SignUp</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already Have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
