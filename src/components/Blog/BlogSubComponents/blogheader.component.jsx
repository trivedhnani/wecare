import React from "react";
import {
  Grid,
  AppBar,
  Typography,
  Toolbar,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { spacing } from "@material-ui/system";
import { selectUser } from "../../reducers/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./blogheader.styles.css";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    flex: 1,
  },
}));
const BlogHeader = (props) => {
  const { user } = props;
  const classes = useStyles();
  return (
    <div>
      <Toolbar>
        <Link to="#">SUBSCRIBE</Link>
        <Typography
          variant="h4"
          align="center"
          noWrap
          className={classes.title}
        >
          BLOG
        </Typography>
        <Link to="/account">ACCOUNT</Link>
      </Toolbar>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectUser,
});
export default connect(mapStateToProps)(BlogHeader);
