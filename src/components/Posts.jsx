import { Container, Grid } from "@mui/material";
import SinglePost from "./SinglePost";
import img1 from "../images/bg.jpg";
const Posts = () => {
  return (
    <>
      <Container sx={{my:4}}>
        <Grid container columnSpacing={1} rowSpacing={1}>
          <SinglePost img={img1} />
          <SinglePost img={img1} />
        </Grid>
      </Container>
    </>
  );
};

export default Posts;
