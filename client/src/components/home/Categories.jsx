import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  styled,
  Box,
} from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
  background-color: #d2f6f2;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
  padding: 1rem;
  margin-left: 3px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  width: 90%;
  font-size: 1.2rem;
  background: #00276e;
  color: #ffffff;
  &:hover {
    background-color: #79c4f9;
    color: black;
  }
  box-shadow: rgba(0, 150, 167, 0.4) 5px 5px, rgba(0, 184, 151, 0.3) 10px 10px,
    rgba(57, 242, 66, 0.2) 15px 15px, rgba(255, 223, 243, 0.1) 20px 20px,
    rgba(3, 133, 85, 0) 25px 25px;

  font-family: "Kaushan Script", cursive;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 0.5rem;
  width:100%;
  display:block;
  text-align: center;
  font-weight: 800;
  padding:2px 4px 2px 4px;

  font-family: "Ubuntu", sans-serif;
  transition: transform .2s;
  &:hover{
    transform:scale(1.1);
  }
`;

const CategoryBox = styled(Box)``;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const categoryColor = {
    All_Categories: "#004683",
    Coding: "#013e2a",
    Interview_Experiences: "#1a5b03",
    General_Discussion: "#6c0000",
    Guidance_And_Tips: "#b05301",
    Academics: "#250036",
  };

  const categoryColorBG = {
    All_Categories: "#97ccfb",
    Coding: "#7ff8d7",
    Interview_Experiences: "#a9f7b4",
    General_Discussion: "#fabebe",
    Guidance_And_Tips: "#fff2b0",
    Academics: "#d3b3fd",
  };

  
  return (
    <CategoryBox>
      <StyledLink
        to={`/create?category=${category || "All_Categories"}`}
        style={{ backgroundColor: "white"}}
        
      >
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink
                to="/"
                style={{ color: "#004683", backgroundColor: "#97ccfb"}}
              >
                All_Categories
              </StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink
                  style={{
                    color: categoryColor[category.type],
                    backgroundColor: categoryColorBG[category.type],
                  }}
                  to={`/?category=${category.type}`}
                >
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </CategoryBox>
  );
};

export default Categories;
