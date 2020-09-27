import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: 0,
  },
}));

export default function ListOrParagraph({
  content,
}: {
  content: string | string[];
}) {
  const classes = useStyles();
  if (typeof content === "string") {
    return <p className={classes.text}>{content}</p>;
  } else {
    if (content.length === 1) {
      return <p className={classes.text}>{content[0]}</p>;
    }
    return (
      <ul>
        {content.map((sentence) => (
          <li>{sentence}</li>
        ))}
      </ul>
    );
  }
}
