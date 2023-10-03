import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import eyeOf from "../img/eyeOfUatu.jpg";
const ErrorPage = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Typography className="errorPage" variant="body2" color="textSecondary" component="p">
        404 Page not found!!
        <br /> Not even the Eye of Uatu sees your request...
      </Typography>
      <CardMedia className="error" component="img" image={eyeOf} />
    </Grid>
  );
};

export default ErrorPage;
