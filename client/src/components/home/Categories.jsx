import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  styled,
  Box
} from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
  /* border: 2px solid #0080c5; */
  /* background-color: #002D62; */
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
  padding:1rem;
  margin-left: 10px;
  /* width:14rem;
  height:3rem; */
  /* font-size: 1rem; */
  font-weight: 600;
  width:90%;
  background: #00276e;
  color: #ffffff;
  

  &:hover{
    background-color: #79c4f9;
    color:black;
  }
  box-shadow: rgba(0, 150, 167, 0.4) 5px 5px, rgba(0, 184, 151, 0.3) 10px 10px, rgba(57, 242, 66, 0.2) 15px 15px, rgba(255, 223, 243, 0.1) 20px 20px, rgba(3, 133, 85, 0) 25px 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;


const CategoryBox=styled(Box)`
/* background-color: #9dcffd; */
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <CategoryBox>
      <StyledLink to={`/create?category=${category || ""}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </StyledLink>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/">All Categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/?category=${category.type}`}>
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
