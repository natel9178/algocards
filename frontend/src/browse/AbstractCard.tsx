import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import SimCardIcon from "@material-ui/icons/SimCard";
import ListOrParagraph from "../presenter/ListOrParagraph";
import useFetchCard from "../presenter/useFetchCard";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
  },
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "10px 15px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    flexDirection: "column",
    minHeight: 200,
    cursor: "pointer",
  },
  title: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
    flexGrow: 1,
  },
  subHeader: {
    fontFamily: "Roboto Mono",
    fontSize: 16,
  },
  text: {
    fontSize: 13,
  },
  captionText: {
    fontFamily: "Roboto Mono",
    fontWeight: "bold",
    opacity: 0.3,
    fontSize: 13,
    alignSelf: "flex-start",
  },
}));

interface AbstractCardProps {
  link: string;
  fullCardLocation: string;
  layoutId: string;
}

export default function AbstractCard({
  link,
  fullCardLocation,
  layoutId,
}: AbstractCardProps) {
  const classes = useStyles();
  const history = useHistory();
  const spec = useFetchCard(link);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={classes.wrapper}
    >
      <Paper
        className={classes.paper}
        onClick={() => history.push(fullCardLocation)}
      >
        {!spec ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              mb={0.5}
            >
              <SimCardIcon fontSize={"large"} />
              <Typography className={classes.title} variant={"h4"}>
                {spec.title || "Model"}
              </Typography>
              <Typography className={classes.captionText} variant={"body1"}>
                Algo-Card
              </Typography>
            </Box>

            {spec.primaryUsecase && (
              <div style={{ marginBottom: 5 }} className={classes.text}>
                <ListOrParagraph content={spec.primaryUsecase} />
              </div>
            )}

            {spec.antiGoals && (
              <>
                <Typography className={classes.subHeader} variant={"body1"}>
                  Anti-Goals
                </Typography>
                <div style={{ marginBottom: 5 }} className={classes.text}>
                  <ListOrParagraph
                    ulStyle={{ margin: 0, paddingLeft: 15 }}
                    content={spec.antiGoals
                      .map(({ description }) => description || "")
                      .filter((desc) => desc !== "")}
                  />
                </div>
              </>
            )}

            {spec.limitations && (
              <>
                <Typography className={classes.subHeader} variant={"body1"}>
                  Limitations
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexWrap="wrap"
                >
                  {spec.limitations
                    .map(({ type }) => type || "")
                    .filter((desc) => desc !== "")
                    .filter((_, idx) => idx < 6)
                    .map((desc) => (
                      <Chip style={{ margin: 2 }} label={desc} size={"small"} />
                    ))}
                </Box>
              </>
            )}
          </>
        )}
      </Paper>
    </motion.div>
  );
}
