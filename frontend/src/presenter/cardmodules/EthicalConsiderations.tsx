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
    marginLeft: theme.spacing(2),
    marginTop: 3,
  },
  subBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: theme.spacing(2),
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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <AccountBalanceIcon fontSize={"large"} />
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
