import {
  Box,
  makeStyles,
  Paper,
  AppBar,
  CircularProgress,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import { useClipboard } from "use-clipboard-copy";
import React, { useEffect, useState } from "react";
import Card, {
  hasAuthors,
  hasIntendedUse,
  hasPerformance,
  PAGE_BOOKMARK_PERFORMANCE,
  PAGE_BOOKMARK_AUTHORS,
  PAGE_BOOKMARK_ETHICAL_CONSIDERATIONS,
  PAGE_BOOKMARK_INTENDED_USE,
  PAGE_BOOKMARK_HEADER,
  PAGE_BOOKMARK_LIMITATIONS,
  PAGE_BOOKMARK_GROUP_IMPACTS,
  hasEthicalConsiderations,
  hasLimitations,
  hasGroupImpacts,
} from "./Card";
import BuildIcon from "@material-ui/icons/Build";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BarChartIcon from "@material-ui/icons/BarChart";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import { Link, useHistory, useLocation } from "react-router-dom";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import AddIcon from "@material-ui/icons/Add";
import { useRecoilState } from "recoil";
import { useQueryParam, BooleanParam } from "use-query-params";
import { loadedCard } from "../utils/useCardState";
import useFetchCard from "./useFetchCard";
import gql from "graphql-tag";
import { scroller } from "react-scroll";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import GroupIcon from "@material-ui/icons/Group";
import WarningIcon from "@material-ui/icons/Warning";
import GithubIcon from "@material-ui/icons/GitHub";
import CheckIcon from "@material-ui/icons/Check";
import useGithubCardFetch from "../utils/useGithubCardFetch";
import { Alert } from "@material-ui/lab";

const drawerWidth = 240;
export const CARD_LAYOUT_ID = "CARD_LAYOUT_ID";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  wrapper: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    borderRadius: 18,
    minHeight: 500,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(3, 2),
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      padding: "31px 50px",
    },
    // margin: theme.spacing(0, 8, 0, 6),
  },
  sidebar: {
    height: "100%",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
    alignSelf: "flex-start",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    paddingLeft: theme.spacing(1),
    position: "sticky",
    alignSelf: "flex-start",
    top: 30,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
  },
  drawerListItem: { borderRadius: 10 },
  title: {},
  toolbar: {
    minHeight: 30,
    padding: 0,
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    width: "92%",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "transparent",
    color: theme.palette.text.primary,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "inherit",
    padding: "30px 40px",
    marginBottom: theme.spacing(8),
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
  },
  container: {},
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Presenter() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSnacks, setOpenSnacks] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);
  const { scrollY } = useViewportScroll();
  const opacityAnim = useTransform(scrollY, [0, 40], [1, 0]);
  const [fromFileUpload] = useQueryParam("fromFileUpload", BooleanParam);
  const [loadCard, setLoadCard] = useRecoilState(loadedCard);
  const location = useLocation();
  const { githubFiles, loading, error } = useGithubCardFetch(location.pathname);
  const history = useHistory();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [confirmEditDialogOpen, setConfirmedEditDialogOpen] = useState(false);

  const files = githubFiles;
  const cardLink = files && !!files.length ? files[0].download_url : "";
  const cardData = useFetchCard(cardLink);
  const clipboard = useClipboard();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const finalCard = fromFileUpload ? loadCard : cardData;

  return (
    <Container
      maxWidth={"lg"}
      className={classes.root}
      style={!matchesSm ? { padding: 0 } : undefined}
    >
      {matchesSm && (
        <div
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          // classes={{
          //   paper: clsx({
          //     [classes.drawerPaper]: true,
          //     [classes.drawerOpen]: open,
          //     [classes.drawerClose]: !open,
          //   }),
          // }}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <Link to="/">
            <img
              style={{ objectFit: "contain", marginLeft: 7 }}
              src={"/logo.svg"}
              alt="Nice"
              width="40"
            />
          </Link>
          <Box mt={10} />
          {finalCard && (
            <List>
              <ListItem
                button
                key={"Info"}
                className={classes.drawerListItem}
                onClick={() =>
                  scroller.scrollTo(PAGE_BOOKMARK_HEADER, {
                    duration: 800,
                    smooth: "easeInOutQuint",
                    offset: -140,
                  })
                }
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h6",
                    style: { fontSize: 16 },
                  }}
                  primary={"Info"}
                />
              </ListItem>

              {hasIntendedUse(finalCard) && (
                <ListItem
                  button
                  key={"Intended Use"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_INTENDED_USE, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Intended Use"}
                  />
                </ListItem>
              )}
              {hasGroupImpacts(finalCard) && (
                <ListItem
                  button
                  key={"Groups"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_GROUP_IMPACTS, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Groups"}
                  />
                </ListItem>
              )}
              {hasLimitations(finalCard) && (
                <ListItem
                  button
                  key={"Limitations"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_LIMITATIONS, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <WarningIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Limitations"}
                  />
                </ListItem>
              )}
              {hasEthicalConsiderations(finalCard) && (
                <ListItem
                  button
                  key={"Ethical Considerations"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_ETHICAL_CONSIDERATIONS, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Considerations"}
                  />
                </ListItem>
              )}
              {hasPerformance(finalCard) && (
                <ListItem
                  button
                  key={"Performance"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_PERFORMANCE, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Performance"}
                  />
                </ListItem>
              )}

              {hasAuthors(finalCard) && (
                <ListItem
                  button
                  key={"Authors"}
                  className={classes.drawerListItem}
                  onClick={() =>
                    scroller.scrollTo(PAGE_BOOKMARK_AUTHORS, {
                      duration: 800,
                      smooth: "easeInOutQuint",
                      offset: -100,
                    })
                  }
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      variant: "h6",
                      style: { fontSize: 16 },
                    }}
                    primary={"Authors"}
                  />
                </ListItem>
              )}
            </List>
          )}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={classes.wrapper}
        style={{
          margin: matchesSm ? theme.spacing(0, 8, 0, 6) : 0,
        }}
      >
        <motion.div
          style={{
            minHeight: 100,
            opacity: opacityAnim,
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            padding: matchesSm ? undefined : theme.spacing(0, 2),
          }}
        >
          {matchesSm ? (
            <Typography className={classes.title} variant={"h4"}>
              AI Cards
            </Typography>
          ) : (
            <Box flexGrow={1}>
              <Link to="/">
                <img
                  style={{ objectFit: "contain", marginLeft: 7 }}
                  src={"/logo.svg"}
                  alt="Nice"
                  width="40"
                />
              </Link>
            </Box>
          )}
          <Box flexGrow={1} />
          {finalCard && !fromFileUpload && cardLink !== "" && (
            <Button
              style={{ borderRadius: 100 }}
              variant="contained"
              size="large"
              color="primary"
              startIcon={copied ? <CheckIcon /> : <GithubIcon />}
              onClick={() => {
                const badgeLink = `https://algocards.netlify.app/badge/${cardLink.replace(
                  "https://",
                  ""
                )}`;
                const markdown = `<p align="left"><a href="http://algocards.netlify.app${location.pathname}" alt="Contributors"><img src="${badgeLink}" /></a></p>`;
                clipboard.copy(markdown);
                setOpenSnacks(true);
                setCopied(true);
              }}
            >
              {copied ? "Badge Copied!" : "Copy Badge"}
              <Snackbar
                open={openSnacks}
                autoHideDuration={5000}
                onClose={() => setOpenSnacks(false)}
              >
                <Alert onClose={() => setOpenSnacks(false)} severity="success">
                  Badge Copied! Paste this into your Github README!
                </Alert>
              </Snackbar>
            </Button>
          )}
          <Box m={1} />
          {finalCard && (
            <Button
              style={{ borderRadius: 100 }}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setConfirmedEditDialogOpen(true);
              }}
            >
              Edit Card
            </Button>
          )}
          <Box m={1} />
          <Button
            style={{ borderRadius: 100 }}
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => history.push("/wizard")}
          >
            Create New Card
          </Button>
        </motion.div>
        <Paper className={classes.paper}>
          {loading || !finalCard ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : error && !fromFileUpload ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
            >
              <Typography variant={"h6"}>
                Could not load card from{" "}
                {
                  <a href={`https://${location.pathname.substring(1)}`}>
                    {location.pathname.substring(1)}
                  </a>
                }
              </Typography>
              <Box m={1} />
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => history.push("/")}
              >
                Come browse other cards :)
              </Button>
            </Box>
          ) : (
            <Card spec={finalCard} />
          )}
        </Paper>
      </motion.div>
      {finalCard && (
        <Dialog
          open={confirmEditDialogOpen}
          onClose={() => setConfirmedEditDialogOpen(false)}
        >
          <DialogTitle disableTypography>
            <Typography variant={"h5"} style={{ fontWeight: "bold" }}>
              Confirm Edit
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Editing this card will overwrite any AI Card you are currently
              editing. Do you wish to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => setConfirmedEditDialogOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setConfirmedEditDialogOpen(false);
                localStorage.setItem("card", JSON.stringify(finalCard));
                setLoadCard(finalCard);
                history.push("/wizard");
              }}
              color="primary"
            >
              Continue Editing
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export const GET_CARD_RAW_CONTENT_FROM_LINK = gql`
  query getCardFromLink($input: GetCardFromLinkInput!) {
    getCardFromLink(input: $input) {
      files {
        name
        path
        download_url
      }
    }
  }
`;
