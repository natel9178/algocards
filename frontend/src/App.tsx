import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { theme } from "./styling/Theme";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { Layout } from "./styling/Layout";
import Presenter from "./presenter/Presenter";
import CardWizard from "./wizard/CardWizard";
import "./animation.css";
import { RecoilRoot } from "recoil";
import Browse from "./browse/Browse";
import { QueryParamProvider } from "use-query-params";
import { AnimatedSwitch } from "react-router-transition";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <CssBaseline />
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-wrapper"
            >
              <Route path="/" exact={true}>
                <Layout>
                  <Browse />
                </Layout>
              </Route>
              <Route path="/presenter">
                <Layout>
                  <Presenter />
                </Layout>
              </Route>
              <Route path="/wizard">
                <Layout>
                  <CardWizard />
                </Layout>
              </Route>
            </AnimatedSwitch>
          </QueryParamProvider>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
