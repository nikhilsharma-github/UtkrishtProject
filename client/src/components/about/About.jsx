import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { grey } from "@mui/material/colors";

const GithubIconColor = grey[600];

const Image = styled(Box)`
  /* background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg")  */
  background: url("images/homepageBanner.jpg") center/55% repeat-x #002244;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 5%;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Heading = styled(Typography)`
  font-family: "Kaushan Script", cursive;
  background-color: #f9f9ff;
  color: #001f72;
  border-radius: 0.2rem;
  padding: 2px;
  text-align: center;
`;

const Text = styled(Typography)`
  color: #292828ad;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const NameText=styled(Text)`
font-family: 'Lobster', cursive;

`;

const About = () => {
  return (
    <Box>
      <Wrapper>
        <Image />
        <Heading variant="h3">USICT Discuss Fourm</Heading>
        <Text variant="h5">
          A simple project where students can post their doubts or share their
          experiences
          <br />
          <Box component="span" style={{ marginLeft: 5 }}></Box>
          <ul>
            <li>
              Students can post their doubts Regarding placements, Academics,
              Extra Curricular Activities, Non-Academics and General Queries.
            </li>
            <li>
              Others can Post their Solutions on Existing posts whhich will be
              useful in the Community Section
            </li>
            <li>
              Choose the category about which you want to see the discussion
              section
            </li>
            <li>
              To raise a query in a specific category, first select that
              particular category and then click on Create Post
            </li>
          </ul>
        </Text>
        <NameText variant="h5">
          Connect with Us on
          <br></br>
          <Box component="span" style={{ marginLeft: 5 }}>
            <span>Nikhil Sharma </span>
            <Link
              href="https://www.linkedin.com/in/nikhil-sharma-7b32601b6/"
              color="inherit"
              target="_blank"
            >
              <LinkedInIcon
                color="primary"
                size="lg"
                style={{ width: 30, height: 30 }}
              />
            </Link>
          </Box>
          <Box component="span" style={{ marginLeft: 5 }}>
            <span>Deepak Singh Rawat </span>

            <Link
              href="https://www.linkedin.com/in/deepak-rawat-1b5328175/"
              color="inherit"
              target="_blank"
            >
              <LinkedInIcon color="primary" style={{ width: 30, height: 30 }} />
            </Link>
          </Box>
        </NameText>
        {/* <GithubBox>
          Github
          <Link
            href="https://github.com/nikhilsharma-github/UtkrishtProject"
            color="inherit"
            target="_blank"
          >
            <GitHub color={GithubIconColor} />
          </Link>
        </GithubBox> */}
      </Wrapper>
    </Box>
  );
};

export default About;
