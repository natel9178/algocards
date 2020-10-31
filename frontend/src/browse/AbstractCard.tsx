import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SimCardIcon from "@material-ui/icons/SimCard";
import ListOrParagraph from "../presenter/ListOrParagraph";
import useFetchCard from "../presenter/useFetchCard";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Textfit } from "react-textfit";
import { Spec } from "../spec/spec";
import { hasLimitations } from "../presenter/Card";

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
    flexShrink: 1,
    fontFamily: "Roboto Mono",
    fontSize: 15,
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
  link?: string;
  fullCardLocation?: string;
  layoutId?: string;
  spec?: Spec;
  paperStyle?: React.CSSProperties;
}

export default function AbstractCard({
  link,
  fullCardLocation,
  layoutId,
  spec: providedSpec,
  paperStyle,
}: AbstractCardProps) {
  const classes = useStyles();
  const history = useHistory();
  const [spec, setSpec] = useState<Spec | null | undefined>(providedSpec);
  const linkSpec = useFetchCard(link || "");

  useEffect(() => {
    if (linkSpec) {
      setSpec(linkSpec);
    } else {
      setSpec(providedSpec);
    }
  }, [linkSpec, providedSpec]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={classes.wrapper}
    >
      <Paper
        className={classes.paper}
        onClick={() => fullCardLocation && history.push(fullCardLocation)}
        style={paperStyle}
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
              <Textfit max={25} className={classes.title} mode="single">
                {spec.title || "Model"}
              </Textfit>
              <Typography className={classes.captionText} variant={"body1"}>
                AI Card
              </Typography>
            </Box>

            {spec.primaryGoal && !!spec.primaryGoal.length && (
              <div style={{ marginBottom: 5 }} className={classes.text}>
                <ListOrParagraph content={spec.primaryGoal} />
              </div>
            )}

            {spec.antiGoals && !!spec.antiGoals.length && (
              <>
                <Typography className={classes.subHeader} variant={"body1"}>
                  Out of Scope
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

            {hasLimitations(spec) && (
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
                  {spec
                    .limitations!.map(({ type }) => type || "")
                    .filter((desc) => desc !== "")
                    .filter((_, idx) => idx < 6)
                    .map((desc, idx) => (
                      <Chip
                        style={{ margin: 2 }}
                        label={desc}
                        size={"small"}
                        key={idx}
                      />
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
