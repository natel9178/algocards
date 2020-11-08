import {
  Grid,
  Typography,
  Card as MuiCard,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import BarChartIcon from "@material-ui/icons/BarChart";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListOrParagraph from "../ListOrParagraph";

const useStyles = makeStyles((theme) => ({
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

interface PerformanceProps {
  performanceOverview?: string;
  performanceMetrics?: {
    name?: string;
    value?: string | number;
    description?: string;
  }[];

  figures?: string[];
  datasets?: { name?: string; description?: string }[];
}

export default function Performance({
  performanceOverview,
  performanceMetrics,
  figures,
  datasets,
}: PerformanceProps) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.container}>
      <BarChartIcon className={classes.icon} fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography style={{ lineHeight: 1 }} variant={"h4"}>
          Dataset Performance
        </Typography>
        {performanceOverview && (
          <>
            <Typography variant={"h6"} style={{ marginTop: 10 }}>
              Overview
            </Typography>
            <ListOrParagraph content={performanceOverview} />
          </>
        )}
        {datasets && (
          <>
            <Typography variant={"h6"} style={{ marginTop: 10 }}>
              Datasets
            </Typography>
            <Grid container spacing={3}>
              {datasets.map(({ name, description }, idx) => (
                <Grid item xs={12} key={idx}>
                  {description && (
                    <div>
                      {name && <strong>{name}</strong>}
                      <ListOrParagraph content={description} />
                    </div>
                  )}
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {((performanceMetrics && !!performanceMetrics.length) ||
          (figures && !!figures.length)) && (
          <Typography variant={"h6"} style={{ marginTop: 10 }}>
            Performance Metrics
          </Typography>
        )}

        {performanceMetrics && !!performanceMetrics.length && (
          <TableContainer
            component={MuiCard}
            style={{
              margin: theme.spacing(1, 0),
            }}
          >
            <Table size="small" style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell align="right">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {performanceMetrics.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {figures && !!figures.length && (
          <Accordion
            style={{
              flexDirection: "column",
              margin: theme.spacing(1, 0),
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant={"body2"}>Figures</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} style={{ width: "100%" }}>
                {figures.map((graph, idx) => (
                  <Grid
                    item
                    xs={6}
                    style={{ flexDirection: "column" }}
                    key={idx}
                  >
                    <img
                      alt=""
                      src={graph}
                      style={{
                        width: "100%",
                        minHeight: 100,
                        boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.05)",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </div>
  );
}
