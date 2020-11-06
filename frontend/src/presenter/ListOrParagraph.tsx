import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Definer from "./definer/Definer";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: 0,
  },
}));

export default function ListOrParagraph({
  content,
  ulStyle,
  liStyle,
}: {
  content: string | string[];
  ulStyle?: React.CSSProperties;
  liStyle?: React.CSSProperties;
}) {
  const classes = useStyles();
  if (typeof content === "string") {
    const splitContent = content.split("\n");
    return (
      <>
        {splitContent.map((c, idx) => (
          <Box mt={0.5} width="100%" key={idx}>
            <p className={classes.text}>
              <Definer text={c} />
            </p>
          </Box>
        ))}
      </>
    );
  } else {
    if (content.length === 1) {
      return <p className={classes.text}>{content[0]}</p>;
    }
    return (
      <ul style={ulStyle}>
        {content.map((sentence, idx) => (
          <li style={liStyle} key={idx}>
            <Definer text={sentence} />
          </li>
        ))}
      </ul>
    );
  }
}
