
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { grey } from '@mui/material/colors';

const GithubIconColor = grey[600];


const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    /* background-image: url('images/UDFbannerjpgimg.jpg'); */
    /* /* width: 100%; */
    height: 70vh; 
    /* background-position: left 0px bottom 0px; */
    /* background-size: cover; */
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">USICT Discuss Fourm</Typography>
                <Text variant="h5">A simple project where students can post their doubts or share their experiences<br />
                    A cool project
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/nikhilsharma-github/UtkrishtProject" color="inherit" target="_blank"><GitHub  color={GithubIconColor}/></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Connect with Us on
                    <br></br>
                    
                    <Box component="span" style={{ marginLeft: 5 }}>
                        Nikhil Sharma  <Link href="https://www.linkedin.com/in/nikhil-sharma-7b32601b6/" color="inherit" target="_blank">
                            <LinkedInIcon color="primary" 
                            size="lg" />
                        </Link>
                    </Box>  

                    <Box component="span" style={{ marginLeft: 5 }}>
                    Deepak Singh Rawat
                        <Link href="https://www.linkedin.com/in/deepak-rawat-1b5328175/" color="inherit" target="_blank">
                            <LinkedInIcon color="primary" />
                        </Link>
                    </Box>  
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
