import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 5px",
  },
  type: {
    fontSize: 14,
    lineHeight: 1,
    marginTop: theme.spacing(0.5),
  },
}));

export default function Icon({
  icon,
  title,
  label,
}: {
  icon: React.ReactNode;
  title?: string;
  label: string;
}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {icon}{" "}
      <Typography className={classes.type} align={"center"} variant={"caption"}>
        {title} {title && <br />} {label}
      </Typography>
    </div>
  );
}
