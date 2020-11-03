import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useQueryParam, StringParam } from "use-query-params";
import AbstractCard from "../browse/AbstractCard";

// const useStyles = makeStyles((theme) => ({
//   "@global": {
//     body: {
//       backgroundColor: "white",
//     },
//   },
// }));

export default function Badge() {
  //   useStyles();
  const [cardFile] = useQueryParam("cardFile", StringParam);

  if (!cardFile) {
    return <></>;
  }

  return (
    <Box m={1} minWidth={400} id={"card"}>
      <AbstractCard fullCardLocation={``} link={cardFile} />
    </Box>
  );
}
