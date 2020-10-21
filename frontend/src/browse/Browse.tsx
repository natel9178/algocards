import {
  makeStyles,
  Typography,
  Box,
  TextField,
  Grid,
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
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { loadedCard } from "../utils/useCardState";
import gql from "graphql-tag";

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
    flexGrow: 1,
    fontSize: 25,
    marginBottom: 3,
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

const appearDistance = 100;

export default function Browse() {
  const history = useHistory();
  const classes = useStyles();
  const { scrollY } = useViewportScroll();
  const opacityAnim = useTransform(
    scrollY,
    [0, appearDistance, appearDistance + 100],
    [0, 0, 1]
  );
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [, setLoadCard] = useRecoilState(loadedCard);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/json",
    maxSize: 1000000,
    noClick: true,
    onDrop: (acceptedFiles) => {
      if (!!acceptedFiles.length) {
        var reader = new FileReader();
        reader.readAsText(acceptedFiles[0]);
        reader.onload = function () {
          localStorage.setItem("loadedCard", String(reader.result));
          setLoadCard(JSON.parse(String(reader.result)));
          history.push("?fromFileUpload=1");
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }
    },
  });

  return (
    <>
      <motion.div
        style={{
          opacity: opacityAnim,
          position: "fixed",
          minHeight: 80,
          backgroundColor: "rgba(255, 255, 255, 1.00)",
          width: "100%",
          zIndex: 1000,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
          borderBottomStyle: "solid",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth={"lg"}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Link to="/">
            <img src={"/logo.svg"} alt="Nice" width="40" />
          </Link>

          <Typography className={classes.toolbarTitle} variant={"h4"}>
            Algo-Card
          </Typography>
          <Button
            style={{ borderRadius: 100 }}
            variant="outlined"
            size="medium"
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => setOpenAboutModal(true)}
          >
            About Algo-Cards
          </Button>
          <Box m={1} />
          <Button
            style={{ borderRadius: 100 }}
            variant="contained"
            size="medium"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push("/wizard")}
          >
            Create New Card
          </Button>
        </Container>
      </motion.div>
      <div className={classes.root} {...getRootProps()}>
        <input
          style={{ position: "absolute", width: "100%", height: "100%" }}
          {...getInputProps()}
        />
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
            <Grid item lg={4} xs={12}>
              <AbstractCard />
            </Grid>
            <Grid item lg={4} xs={12}>
              <AbstractCard />
            </Grid>
            <Grid item lg={4} xs={12}>
              <AbstractCard />
            </Grid>
            <Grid item lg={4} xs={12}>
              <AbstractCard />
            </Grid>
            <Grid item lg={4} xs={12}>
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={openAboutModal}>
          <About />
        </Fade>
      </Modal>
    </>
  );
}

export const GET_SERVER_VERSION = gql`
  query getVersion {
    version
  }
`;
