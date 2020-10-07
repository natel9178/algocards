import {
  Grid,
  Typography,
  Card as MuiCard,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import LinkIcon from "@material-ui/icons/Link";
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

const useStyles = makeStyles((theme) => ({
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

interface PerformanceProps {
  datasetPerformance: {
    datasetName?: string;
    description?: string;
    link?: string;
    exampleImageLinks?: string[];

    performanceMetrics?: {
      name?: string;
      value?: string | number;
      description?: string;
    }[];

    performanceGraphs?: {
      name?: string;
      resourceLink?: string;
      description?: string;
    }[];
  }[];
}

export default function Performance({ datasetPerformance }: PerformanceProps) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <BarChartIcon fontSize={"large"} />
      <div className={classes.subContainer}>
        <Typography
          style={{ fontWeight: "bold", lineHeight: 1 }}
          variant={"h4"}
        >
          Dataset Performance
        </Typography>
        <Grid container spacing={3}>
          {datasetPerformance &&
            datasetPerformance.map((dataset) => (
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "stretch",
                  }}
                >
                  <Typography variant={"h6"} style={{ marginTop: 10 }}>
                    {dataset.link ? (
                      <a
                        style={{
                          color: "black",
                          textDecoration: "none",
                        }}
                        href={dataset.link}
                      >
                        {dataset.datasetName} <LinkIcon fontSize={"small"} />
                      </a>
                    ) : (
                      <> {dataset.datasetName}</>
                    )}
                  </Typography>
                  {dataset.description && (
                    <Typography variant={"body2"}>
                      {dataset.description}
                    </Typography>
                  )}
                  {dataset.performanceMetrics && (
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
                          {dataset.performanceMetrics.map((row) => (
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
                  {dataset.performanceGraphs && (
                    <Accordion
                      style={{
                        flexDirection: "column",
                        margin: theme.spacing(1, 0),
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={"body2"}>
                          Performance Graphs
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={3} style={{ width: "100%" }}>
                          {dataset.performanceGraphs.map((graph) => (
                            <Grid
                              item
                              xs={6}
                              style={{ flexDirection: "column" }}
                            >
                              <img
                                src={graph.resourceLink}
                                style={{
                                  width: "100%",
                                  minHeight: 100,
                                  boxShadow: "3px 3px 30px rgba(0, 0, 0, 0.05)",
                                }}
                                alt={`Graph of ${graph.name}`}
                              />
                              <Typography variant={"body2"}>
                                <strong>{graph.name}</strong>{" "}
                                {graph.description}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
