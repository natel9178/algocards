import {
  makeStyles,
  Typography,
  Box,
  useTheme,
  TextField,
  Grid,
  Paper,
  Button,
  Modal,
  Container,
} from "@material-ui/core";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import About from "../about/About";
import AbstractCard from "./AbstractCard";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    width: "100vw",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  title: {},
  toolbarTitle: {
    marginLeft: theme.spacing(3),
  },
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "50px 0px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  mainInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 100,
      },
    },
    width: "clamp(100px, 50%, 700px)",
    borderRadius: 40,
  },
}));

interface BrowseProps {}

const appearDistance = 200;

export default function Browse(props: BrowseProps) {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();
  const { scrollY } = useViewportScroll();
  const opacityAnim = useTransform(
    scrollY,
    [0, appearDistance, appearDistance + 50],
    [0, 0, 1]
  );
  const [openAboutModal, setOpenAboutModal] = useState(false);

  return (
    <>
      <motion.div
        style={{
          opacity: opacityAnim,
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          padding: theme.spacing(4, 8),
          backgroundColor: "rgna(250, 250, 250, 1.00)",
        }}
      >
        <Link to="/">
          <img src={"/logo.svg"} alt="Nice" width="40" />
        </Link>

        <Typography className={classes.toolbarTitle} variant={"h4"}>
          Algo-Card
        </Typography>
      </motion.div>
      <div className={classes.root}>
        <div className={classes.hero}>
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="70" />
          </Link>
          <Typography className={classes.title} variant={"h3"}>
            Algo-Cards
          </Typography>
          <Box m={0.5} />
          <Typography variant={"body1"} style={{ fontFamily: "Roboto Mono" }}>
            Drop a card here to view, or browse below.
          </Typography>

          <Box display="flex" m={1}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              startIcon={<InfoIcon />}
              onClick={() => setOpenAboutModal(true)}
            >
              About Algo-Cards
            </Button>
            <Box m={1} />
            <Button
              variant="outlined"
              size="large"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => history.push("/wizard")}
            >
              Create New Card
            </Button>
          </Box>
          <Box m={4} />

          <TextField
            className={classes.mainInput}
            size="small"
            label="Search / Card Link"
            variant="outlined"
          />
        </div>
        <Box m={5} />
        <Container maxWidth={"lg"}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <AbstractCard />
            </Grid>
            <Grid item xs={4}>
              <AbstractCard />
            </Grid>
            <Grid item xs={4}>
              <AbstractCard />
            </Grid>
            <Grid item xs={4}>
              <AbstractCard />
            </Grid>
            <Grid item xs={4}>
              <AbstractCard />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Modal
        open={openAboutModal}
        onClose={() => setOpenAboutModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAboutModal}>
          <About />
        </Fade>
      </Modal>
    </>
  );
}
