import React, { useEffect, useState } from "react";
import { dictionary } from "./Dictionary";
import reactStringReplace from "react-string-replace";
import { makeStyles, Theme, Popover, Typography, Box } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import math from "remark-math";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import clsx from "clsx";

const renderers = {
  inlineMath: ({ value }: { value: any }) => <InlineMath math={value} />,
  math: ({ value }: { value: any }) => <BlockMath math={value} />,
};

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    borderRadius: 18,
    pointerEvents: "auto",
    maxWidth: 400,
    boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(2, 2),
    width: "100%",
    flexGrow: 1,
  },
  blueColor: {
    color: theme.palette.primary.main,
  },
}));

export default function Definer({
  text,
  noHighlight,
}: {
  text: string;
  noHighlight?: boolean;
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [term, setTerm] = React.useState("");
  const [content, setContent] = React.useState("");
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    term: string,
    content: string
  ) => {
    setAnchorEl(event.currentTarget);
    setTerm(term);
    setContent(content);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  const [currentText, setCurrentText] = useState<string | React.ReactNodeArray>(
    text
  );

  useEffect(() => {
    let runningText: string | React.ReactNodeArray = text;
    dictionary.forEach((text, term, _) => {
      const re = new RegExp(`( ${term}\\S*)`, "gi");
      runningText = reactStringReplace(runningText, re, (match, i) => {
        return (
          <span
            onMouseEnter={(event) =>
              handlePopoverOpen(event, capitalizeFirstLetter(term), text)
            }
            onMouseLeave={handlePopoverClose}
            key={match + i}
            className={clsx({ [classes.blueColor]: !noHighlight })}
          >
            {match}
          </span>
        );
      });
    });

    setCurrentText(runningText);
  }, [text]);

  return (
    <>
      {currentText}
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
        }}
      >
        <Typography style={{ fontFamily: "Roboto Mono" }}>{term}</Typography>
        <ReactMarkdown plugins={[math]} renderers={renderers}>
          {content}
        </ReactMarkdown>
      </Popover>
    </>
  );
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
