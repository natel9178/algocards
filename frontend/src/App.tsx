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

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Layout>
            <Switch>
              <Redirect path="/" to="/browse" exact={true} />
              <Route path="/browse">
                <Browse />
              </Route>
              <Route path="/presenter">
                <Presenter />
              </Route>
              <Route path="/wizard">
                <CardWizard />
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
