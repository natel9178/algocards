import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ListOrParagraph from "../ListOrParagraph";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: { margin: 0, padding: 0, marginLeft: 20 },
  },
  root: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    height: "100%",
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    marginLeft: theme.spacing(1),
    marginTop: 3,
  },
  subBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  icon: {
    margin: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(0, 0, 0, 1),
    },
  },
}));

interface EthicalConsiderationsProps {
  ethicalConsiderations?: { description?: string }[];
}
export default function EthicalConsiderations(
  props: EthicalConsiderationsProps
) {
  const { ethicalConsiderations } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AccountBalanceIcon className={classes.icon} fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography style={{ lineHeight: 1 }} variant={"h4"}>
          Ethical Considerations
        </Typography>
        <Box m={1} />
        {ethicalConsiderations && (
          <div>
            <ListOrParagraph
              content={ethicalConsiderations
                .map(({ description }) => description || "")
                .filter((con) => con !== "")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
