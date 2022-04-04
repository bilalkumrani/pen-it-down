import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NavBar from "./NavBar";
import { useFormik } from "formik";

const Home = () => {
  return (
    <div>
      <NavBar />

      <Grid container justifyContent="center">
        <Grid item>
          <h1>Image of the day!</h1>
          <Box
            mt={10}
            borderRadius={10}
            component="img"
            alt="The house from the offer."
            src="https://picsum.photos/500/300"
          />
          <Box>
            <textarea />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
