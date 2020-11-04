import {
  makeStyles,
  Typography,
  Box,
  Grid,
  Button,
  Modal,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import BackupIcon from "@material-ui/icons/Backup";
import SearchIcon from "@material-ui/icons/Search";
import { motion } from "framer-motion";
import React, { createRef, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import About from "../about/About";
import AbstractCard from "./AbstractCard";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import Dropzone, { DropzoneRef, useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { loadedCard } from "../utils/useCardState";
import gql from "graphql-tag";
import { StringParam, useQueryParam } from "use-query-params";
import useGithubCardFetch from "../utils/useGithubCardFetch";
import { values } from "spdx-license-list/simple";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  hero: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "stretch",
    flexDirection: "row",
    alignContent: "center",
  },
  title: {
    fontWeight: "bold",
  },
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
  textField: {
    fontFamily: "Roboto Mono",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 15,
      },
    },
    flex: 1,
  },
}));

export default function Browse() {
  const history = useHistory();
  const classes = useStyles();
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const [, setLoadCard] = useRecoilState(loadedCard);
  const [repo, setRepo] = useQueryParam("repo", StringParam);
  const githubLinkToUse = repo || "github.com/natel9178/algo-cards";
  const { githubFiles, loading, error } = useGithubCardFetch(githubLinkToUse);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dropzoneRef = createRef<DropzoneRef>();
  const [textFieldValue, setTextFieldValue] = useState("");

  return (
    <>
      <motion.div
        style={{
          minHeight: 80,
          backgroundColor: "rgba(255, 255, 255, 1.00)",
          width: "100%",
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
            AI Cards
          </Typography>
          {matches && (
            <>
              <Button
                style={{ borderRadius: 100 }}
                variant="outlined"
                size="medium"
                color="primary"
                startIcon={<InfoIcon />}
                onClick={() => setOpenAboutModal(true)}
              >
                About AI Cards
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
            </>
          )}
        </Container>
      </motion.div>
      <Box m={5} />
      <Dropzone
        accept="application/json"
        maxSize={1000000}
        noClick
        onDrop={(acceptedFiles) => {
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
        }}
        ref={dropzoneRef}
      >
        {({ getRootProps, getInputProps }) => (
          <Container
            maxWidth={"lg"}
            className={classes.root}
            {...getRootProps()}
          >
            <input
              style={{ position: "absolute", width: "100%", height: "100%" }}
              {...getInputProps()}
            />
            <Grid container className={classes.hero} spacing={2}>
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography className={classes.title} variant={"h4"}>
                  Bring the <i>Human</i> back into AI
                </Typography>
                <Box m={1} />
                <Typography
                  variant={"body1"}
                  style={{ fontFamily: "Roboto Mono", fontSize: 19 }}
                >
                  AICards is a conversation starter between Machine Learning
                  devs and general users for a more hopeful AI future. <br />
                  <br />
                  Drop a cardfile or search a Github repo to get started.
                </Typography>

                <Box display="flex" mt={5}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    startIcon={<InfoIcon />}
                    onClick={() => setOpenAboutModal(true)}
                  >
                    About AI Cards
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
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={"/humaaans.png"}
                />
              </Grid>
            </Grid>
            <Box mt={5} mb={6} display="flex">
              <TextField
                // label="Github Link"
                id="standard-start-adornment"
                value={textFieldValue}
                onChange={(e) => setTextFieldValue(e.target.value)}
                className={clsx(classes.textField)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" style={{ marginRight: 0 }}>
                      <SearchIcon style={{ marginRight: 10 }} />
                      github.com/
                    </InputAdornment>
                  ),
                }}
                placeholder="natel9178/algo-cards"
                variant="outlined"
                size="small"
              />
              <Box m={1} />
              <Button
                style={{ borderRadius: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (textFieldValue === "") {
                    setRepo("");
                    setTextFieldValue("");
                  }
                  if (textFieldValue.includes("/")) {
                    setRepo(
                      `github.com/${textFieldValue
                        .replace("http://", "")
                        .replace("https://", "")
                        .replace("github.com/", "")}`
                    );
                    setTextFieldValue(
                      textFieldValue
                        .replace("http://", "")
                        .replace("https://", "")
                        .replace("github.com/", "")
                    );
                  }
                }}
                startIcon={<SearchIcon />}
                disabled={
                  (textFieldValue === "" &&
                    githubLinkToUse === "github.com/natel9178/algo-cards") ||
                  repo === `github.com/${textFieldValue}`
                }
              >
                Search Repo
              </Button>
              <Box m={1} />
              <Button
                startIcon={<BackupIcon />}
                style={{ borderRadius: 10 }}
                variant="outlined"
                onClick={() =>
                  dropzoneRef.current && dropzoneRef.current.open()
                }
              >
                Upload Card
              </Button>
            </Box>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Box
                width="100%"
                minHeight="200px"
                display="flex"
                style={{ placeItems: "center" }}
              >
                <Typography
                  variant="body1"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "Roboto Mono",
                  }}
                >
                  Could not get cards from{" "}
                  <a href={`https://${repo}`}>{repo}</a>
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {/* {repo !== "" && (
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      style={{
                        width: "100%",
                        fontFamily: "Roboto Mono",
                        textAlign: "center",
                      }}
                    >
                      <strong>
                        Showing cards from{" "}
                        <a href={`https://${repo}`}>{repo}</a>
                      </strong>
                    </Typography>
                  </Grid>
                )} */}
                {!!githubFiles.length ? (
                  githubFiles
                    .sort(function (a, b) {
                      const textA = a.name.toUpperCase();
                      const textB = b.name.toUpperCase();
                      return textA < textB ? -1 : textA > textB ? 1 : 0;
                    })
                    .map((file, idx) => {
                      return (
                        <Grid key={idx} item lg={4} sm={6} xs={12}>
                          <AbstractCard
                            fullCardLocation={`/${githubLinkToUse}/${file.path}`}
                            link={file.download_url}
                          />
                        </Grid>
                      );
                    })
                ) : (
                  <Box
                    width="100%"
                    minHeight="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    style={{ placeItems: "center" }}
                  >
                    <Typography
                      variant="body1"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "Roboto Mono",
                      }}
                    >
                      There are no cards in{" "}
                      <a href={`https://${repo}`}>{repo}</a>
                    </Typography>
                    <Button
                      style={{ borderRadius: 100, marginTop: 10 }}
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<AddIcon />}
                      onClick={() => history.push("/wizard")}
                    >
                      Create a new card
                    </Button>
                  </Box>
                )}
              </Grid>
            )}
          </Container>
        )}
      </Dropzone>
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
