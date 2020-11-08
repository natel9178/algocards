import { Paper, makeStyles, Typography, Box } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "clamp(400px, 75%, 1000px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 18,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(10, 5),
  },
}));

export default function About(props: {}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <img src={"/logo.svg"} alt="Nice" width="70" />
      <Box m={2} />
      <Typography variant="h5" style={{ alignSelf: "flex-start" }}>
        What is the AICards Toolkit?
      </Typography>
      <Box m={1} />

      <Typography variant="body2" style={{ fontFamily: "Roboto Mono" }}>
        Despite the rise of Artificial Intelligence in society, there is still
        both a critical lack of documentation around ethics and usecases of AI.
        The lack of documentation and understanding has contributed to public
        confusion, ineffective policy making, and unaccountable uses of AI by
        companies, states, and individuals alike.
        <br /> <br /> In response to these issues, Mitchell et al. (2019)
        proposed a framework on AI documentation that she calls on practitioners
        to start using called “Model Cards.” To bolster Mitchell et al. (2019)’s
        model cards framework and address the shortcomings in the status quo of
        model documentations, we developed the AI Cards toolkit (AICards), an
        interactive and assistive way to craft effective documentation on AI
        based on Mitchell (2019)’s Model Cards, without any coding, design, or
        engineering time needed. <br /> <br />
        With AICards we aim to use common design principles in user interface
        and user experience design such as process funnels to make it easy and
        simple for AI practitioners to create thoughtful AICards. AICards is
        open sourced and written with well known web frameworks such as
        Typescript and GraphQL to encourage further development as non-technical
        model documentation is normalized in the AI community. We aim to
        contribute to the Model Cards mission to help generate insights and
        feedback on strategies to foster productive conversations on AI impacts.{" "}
      </Typography>
    </Paper>
  );
}
