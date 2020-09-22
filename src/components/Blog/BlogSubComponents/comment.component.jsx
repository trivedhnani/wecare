import React from "react";
import { Avatar, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const styles = (theme) => ({
  comment: {
    display: "flex",
    direction: "row",
  },
  avatar: {
    marginRight: 5,
    marginLeft: 5,
  },
  text: {
    marginRight: 10,
    marginLeft: 5,
  },
  paperSurface: {
    backgroundColor: "#B5CDF0",
  },
});
const Comment = ({ classes, comment, ...otherProps }) => (
  <div className={classes.comment}>
    <Avatar className={classes.avatar}>
      <AccountCircleIcon />
    </Avatar>
    <Paper
      variant="elevation"
      elevation={0}
      className={(classes.text, classes.paperSurface)}
    >
      <Typography variant="subtitle1">{comment.user.name}</Typography>
      <Typography variant="body2">{comment.text}</Typography>
    </Paper>
  </div>
);
export default withStyles(styles)(Comment);
