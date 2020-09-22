import React from "react";
import { Typography, Link, Grid } from "@material-ui/core";
import "../blog.styles.css";
const SideBar = ({ social, ...otherProps }) => (
  <Grid item xs={12} md={6}>
    <Typography variant="h4">Social</Typography>
    <Grid container direction="column">
      {Object.keys(social).map((el, index) => (
        <Grid item key={index}>
          <Link href={social[el].link}>{`${social[el].name}`}</Link>
        </Grid>
      ))}
    </Grid>
  </Grid>
);
export default SideBar;
