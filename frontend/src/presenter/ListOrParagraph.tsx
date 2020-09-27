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
    const splitContent = content.split("\n");
    return (
      <>
        {splitContent.map((c, idx) => (
          <>
            <p className={classes.text}>{c}</p>
            {idx !== splitContent.length - 1 && <br />}
          </>
        ))}
      </>
    );
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
