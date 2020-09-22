import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flex: "1",
  },
  media: {
    width: "150px",
    height: "150px",
  },
}));
const FeaturedPost = (props) => {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href="/blogPost"
        style={{ textDecoration: "none" }}
      >
        <Card variant="outlined">
          <div className={classes.root}>
            <div className={classes.content}>
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body1" paragraph gutterBottom>
                  {post.content}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
            </div>
            <CardMedia className={classes.media} image={post.image}></CardMedia>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};
export default FeaturedPost;
