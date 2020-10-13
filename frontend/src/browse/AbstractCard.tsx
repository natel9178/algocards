import { Box, makeStyles, Paper, Typography, Chip } from "@material-ui/core";
import React from "react";
import SimCardIcon from "@material-ui/icons/SimCard";
import ListOrParagraph from "../presenter/ListOrParagraph";
import { card } from "../utils/useCardState";
import { useRecoilState } from "recoil";
import { Spec } from "../spec/spec";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: "10px 15px",
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    flexDirection: "column",
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

interface AbstractCardProps {}

export default function AbstractCard(props: AbstractCardProps) {
  const classes = useStyles();
  const [spec] = useRecoilState<Spec>(card);

  return (
    <Paper className={classes.paper}>
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
        <Typography
          style={{ marginBottom: 5 }}
          className={classes.text}
          variant={"body2"}
        >
          <ListOrParagraph content={spec.primaryUsecase} />
        </Typography>
      )}

      {spec.antiGoals && (
        <>
          <Typography className={classes.subHeader} variant={"body1"}>
            Anti-Goals
          </Typography>
          <Typography
            style={{ marginBottom: 5 }}
            className={classes.text}
            variant={"body2"}
          >
            <ListOrParagraph
              ulStyle={{ margin: 0, paddingLeft: 15 }}
              content={spec.antiGoals
                .map(({ description }) => description || "")
                .filter((desc) => desc !== "")}
            />
          </Typography>
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
    </Paper>
  );
}
